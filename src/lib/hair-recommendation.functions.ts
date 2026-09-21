import { createServerFn } from "@tanstack/react-start";
import { createOpenAI } from "@ai-sdk/openai";
import { Output, streamText } from "ai";
import { z } from "zod";

const RecommendationInput = z.object({
  length: z.enum(["45cm", "55cm", "60cm", "65cm", "70cm", "75cm"]),
  weight: z.enum(["100g", "500g"]),
  color: z.enum(["Preto Natural", "Castanho Escuro", "Moreno Iluminado", "Moreno Caramelo", "Loiro Iluminado"]),
  goal: z.enum(["Alongamento discreto", "Mais volume", "Transformação completa", "Cobertura no topo"]),
});

const RecommendationOutput = z.object({
  productId: z.enum([
    "preto-ondulado",
    "castanho-cacheado",
    "preto-liso",
    "moreno-iluminado-ondulado",
    "topper-capilar-loiro",
  ]),
  productName: z.string(),
  reason: z.string(),
  tip: z.string(),
});

const CATALOG_CONTEXT = `
- preto-ondulado: Cabelo Brasileiro Preto Ondulado; cor Preto Natural; 45–75cm; 100g ou 500g; ondas naturais, movimento e brilho.
- castanho-cacheado: Cabelo Brasileiro Castanho Cacheado; cor Castanho Escuro; 45–75cm; 100g ou 500g; cachos definidos e volume.
- preto-liso: Cabelo Brasileiro Preto Liso; cor Preto Natural; 45–75cm; 100g ou 500g; fios lisos, alinhados e sedosos.
- moreno-iluminado-ondulado: Cabelo Brasileiro Moreno Iluminado Ondulado; cores Moreno Iluminado e Moreno Caramelo; 45–75cm; 100g ou 500g; base castanha, pontas iluminadas e ondas.
- topper-capilar-loiro: Topper Capilar Loiro; cor Loiro Iluminado; 45–60cm; cobertura e volume na região superior. A gramatura informada não se aplica ao topper.
`;

function safeGatewayMessage(error: unknown): string {
  if (!(error instanceof Error)) return "Não foi possível concluir a recomendação agora.";
  const record = error as Error & { responseBody?: string; statusCode?: number };
  if (record.responseBody) {
    try {
      const body = JSON.parse(record.responseBody) as { message?: string; error?: { message?: string } };
      return body.message ?? body.error?.message ?? "Não foi possível concluir a recomendação agora.";
    } catch {
      return "Não foi possível concluir a recomendação agora.";
    }
  }
  if (record.statusCode === 401) return "A consultoria inteligente ainda não está configurada.";
  return "Não foi possível concluir a recomendação agora. Tente novamente mais tarde.";
}

export const recommendHair = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => RecommendationInput.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) throw new Error("A consultoria inteligente ainda não está configurada.");

    const lovable = createOpenAI({
      baseURL: "https://ai.gateway.lovable.dev/v1",
      apiKey,
      headers: {
        "Lovable-API-Key": apiKey,
        "X-Lovable-AIG-SDK": "vercel-ai-sdk",
      },
    });

    try {
      const result = streamText({
        model: lovable.responses("openai/gpt-6-astra"),
        output: Output.object({ schema: RecommendationOutput }),
        system:
          "Você é consultora da Creative Hair. Recomende somente um produto do catálogo informado. Responda em português do Brasil, com justificativa acolhedora em até 2 frases e uma dica curta. Não invente produtos, cores, medidas, preços ou benefícios médicos.",
        prompt: `Catálogo disponível:\n${CATALOG_CONTEXT}\nPreferências da cliente: comprimento ${data.length}, gramatura ${data.weight}, cor ${data.color}, objetivo ${data.goal}. Escolha o produto mais adequado. Para cobertura no topo, priorize o topper quando a cor e o comprimento forem compatíveis. Para outras finalidades, respeite primeiro a cor e depois o acabamento mais coerente.`,
        providerOptions: {
          openai: {
            forceReasoning: true,
            reasoningEffort: "low",
            reasoningSummary: "auto",
            store: false,
            include: ["reasoning.encrypted_content"],
          },
        },
      });

      return await result.output;
    } catch (error) {
      throw new Error(safeGatewayMessage(error));
    }
  });