import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, Mail, MessageCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CartProvider } from "@/hooks/use-cart";
import { submitContactRequest } from "@/lib/customer-requests.functions";
import { openWhatsapp } from "@/lib/site-config";

const TITLE = "Contato — Creative Hair";
const DESCRIPTION = "Envie suas preferências de comprimento, gramatura e objetivo para a Creative Hair.";
const lengths = ["45cm", "55cm", "60cm", "65cm", "70cm", "75cm"] as const;
const weights = ["100g", "500g"] as const;
const goals = ["Alongamento discreto", "Mais volume", "Transformação completa", "Cobertura no topo"] as const;

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://creativehair.lovable.app/contato" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return <CartProvider><Header /><ContactForm /><Footer /></CartProvider>;
}

function ContactForm() {
  const submitRequest = useServerFn(submitContactRequest);
  const [form, setForm] = useState({ name: "", email: "", length: "", weight: "", goal: "" });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.name || !form.email || !form.length || !form.weight || !form.goal) {
      setStatus("Preencha todos os campos para enviar sua solicitação.");
      return;
    }
    setLoading(true);
    setStatus("");
    try {
      const response = await submitRequest({ data: {
        name: form.name,
        email: form.email,
        length: form.length as (typeof lengths)[number],
        weight: form.weight as (typeof weights)[number],
        goal: form.goal as (typeof goals)[number],
      } });
      const message = `Olá! Meu nome é ${form.name}. Enviei uma solicitação pelo site da Creative Hair.\n\nE-mail: ${form.email}\nComprimento: ${form.length}\nGramatura: ${form.weight}\nObjetivo: ${form.goal}\n\nGostaria de receber uma orientação.`;
      setStatus(response.emailSent ? "Solicitação enviada e registrada. Abrindo o WhatsApp..." : `${response.warning} Sua solicitação foi registrada e o WhatsApp será aberto.`);
      openWhatsapp(message);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Não foi possível enviar sua solicitação.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-sky/15 px-6 pb-20 pt-32 lg:pt-40">
      <div className="mx-auto max-w-5xl">
        <Link to="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-foreground/55"><ArrowLeft className="size-4" /> Voltar à vitrine</Link>
        <div className="mt-10 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-accent">Contato personalizado</span>
            <h1 className="mt-4 font-serif text-4xl leading-tight lg:text-6xl">Conte como deseja transformar seus cabelos.</h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-foreground/65">Sua solicitação chega por e-mail, fica registrada para acompanhamento e abre uma conversa no WhatsApp.</p>
            <div className="mt-8 space-y-3 text-sm text-foreground/65"><p className="flex items-center gap-3"><Mail className="size-4 text-accent" /> Retorno no e-mail informado</p><p className="flex items-center gap-3"><MessageCircle className="size-4 text-accent" /> Continuação direta pelo WhatsApp</p></div>
          </div>
          <form onSubmit={handleSubmit} className="border border-border bg-background p-6 sm:p-10" noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Nome"><Input value={form.name} onChange={(e) => setForm((v) => ({ ...v, name: e.target.value }))} autoComplete="name" maxLength={100} /></Field>
              <Field label="E-mail"><Input type="email" value={form.email} onChange={(e) => setForm((v) => ({ ...v, email: e.target.value }))} autoComplete="email" maxLength={254} /></Field>
              <SelectField label="Comprimento" value={form.length} options={lengths} onChange={(value) => setForm((v) => ({ ...v, length: value }))} />
              <SelectField label="Gramatura" value={form.weight} options={weights} onChange={(value) => setForm((v) => ({ ...v, weight: value }))} />
              <div className="sm:col-span-2"><SelectField label="Objetivo" value={form.goal} options={goals} onChange={(value) => setForm((v) => ({ ...v, goal: value }))} /></div>
            </div>
            <Button type="submit" className="mt-7 h-12 w-full rounded-none uppercase tracking-widest" disabled={loading}>{loading ? "Enviando..." : "Enviar e abrir WhatsApp"}</Button>
            {status && <p role="status" className="mt-4 text-sm leading-relaxed text-foreground/65">{status}</p>}
          </form>
        </div>
      </div>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-foreground/65">{label}</span>{children}</label>;
}

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: readonly string[]; onChange: (value: string) => void }) {
  return <label className="block"><span className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-foreground/65">{label}</span><select value={value} onChange={(e) => onChange(e.target.value)} className="h-11 w-full border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><option value="">Selecionar</option>{options.map((option) => <option key={option}>{option}</option>)}</select></label>;
}