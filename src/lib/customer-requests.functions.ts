import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const LengthSchema = z.enum(["45cm", "55cm", "60cm", "65cm", "70cm", "75cm"]);
export const WeightSchema = z.enum(["100g", "500g"]);
export const ColorSchema = z.enum([
  "Preto Natural",
  "Castanho Escuro",
  "Moreno Iluminado",
  "Moreno Caramelo",
  "Loiro Iluminado",
]);
export const GoalSchema = z.enum([
  "Alongamento discreto",
  "Mais volume",
  "Transformação completa",
  "Cobertura no topo",
]);

const BaseRequestSchema = z.object({
  length: LengthSchema,
  weight: WeightSchema,
  goal: GoalSchema,
});

export const ConsultationRequestSchema = BaseRequestSchema.extend({
  color: ColorSchema,
  recommendedProductId: z.string().min(2).max(100),
  recommendedProductName: z.string().min(2).max(160),
  recommendationReason: z.string().min(2).max(1000),
  recommendationTip: z.string().min(2).max(500),
});

export const ContactRequestSchema = BaseRequestSchema.extend({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
});

type ContactRequest = z.infer<typeof ContactRequestSchema>;

function encodeBase64Url(value: string): string {
  return Buffer.from(value, "utf8").toString("base64url");
}

function encodeHeader(value: string): string {
  return /^[\x00-\x7F]*$/.test(value)
    ? value
    : `=?UTF-8?B?${Buffer.from(value, "utf8").toString("base64")}?=`;
}

async function sendContactEmail(data: ContactRequest): Promise<void> {
  const lovableKey = process.env["LOVABLE_API_KEY"];
  const gmailKey = process.env["GOOGLE_MAIL_API_KEY"];
  if (!lovableKey || !gmailKey) throw new Error("O envio por e-mail ainda não está configurado.");

  const destination = "eloandradede@gmail.com";
  const subject = `Nova solicitação Creative Hair — ${data.name}`;
  const body = [
    "Nova solicitação recebida pelo site da Creative Hair.",
    "",
    `Nome: ${data.name}`,
    `E-mail: ${data.email}`,
    `Comprimento: ${data.length}`,
    `Gramatura: ${data.weight}`,
    `Objetivo: ${data.goal}`,
  ].join("\r\n");
  const raw = [
    `To: ${destination}`,
    `Reply-To: ${data.email}`,
    `Subject: ${encodeHeader(subject)}`,
    "MIME-Version: 1.0",
    'Content-Type: text/plain; charset="UTF-8"',
    "",
    body,
  ].join("\r\n");

  const response = await fetch(
    "https://connector-gateway.lovable.dev/google_mail/gmail/v1/users/me/messages/send",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": gmailKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ raw: encodeBase64Url(raw) }),
    },
  );

  if (!response.ok) {
    const errorBody = await response.text();
    console.error(`Gmail contact notification failed [${response.status}]: ${errorBody}`);
    throw new Error("A solicitação foi salva, mas o aviso por e-mail não pôde ser enviado.");
  }
}

export const saveConsultationRequest = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ConsultationRequestSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("customer_requests").insert({
      request_type: "consultoria",
      length: data.length,
      weight: data.weight,
      color: data.color,
      goal: data.goal,
      recommended_product_id: data.recommendedProductId,
      recommended_product_name: data.recommendedProductName,
      recommendation_reason: data.recommendationReason,
      recommendation_tip: data.recommendationTip,
    });
    if (error) throw new Error("Não foi possível salvar esta consultoria agora.");
    return { ok: true };
  });

export const submitContactRequest = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ContactRequestSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("customer_requests").insert({
      request_type: "contato",
      name: data.name,
      email: data.email,
      length: data.length,
      weight: data.weight,
      goal: data.goal,
    });
    if (error) throw new Error("Não foi possível salvar sua solicitação agora.");

    try {
      await sendContactEmail(data);
      return { ok: true, emailSent: true };
    } catch (emailError) {
      return {
        ok: true,
        emailSent: false,
        warning: emailError instanceof Error ? emailError.message : "O aviso por e-mail não pôde ser enviado.",
      };
    }
  });

export const listCustomerRequests = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: isAdmin, error: roleError } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (roleError || !isAdmin) throw new Error("Acesso restrito à administração.");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("customer_requests")
      .select("id, request_type, name, email, length, weight, color, goal, recommended_product_name, recommendation_reason, recommendation_tip, created_at")
      .order("created_at", { ascending: false })
      .limit(250);
    if (error) throw new Error("Não foi possível carregar as solicitações.");
    return data;
  });