import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { lovable } from "@/integrations/lovable";
import { supabase } from "@/integrations/supabase/client";

const TITLE = "Acesso às solicitações — Creative Hair";
const DESCRIPTION = "Área de acesso restrito para solicitações da Creative Hair.";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: TITLE }, { name: "description", content: DESCRIPTION }, { property: "og:title", content: TITLE }, { property: "og:description", content: DESCRIPTION }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setMessage("");
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/solicitacoes` } });
        if (error) throw error;
        setMessage("Confira seu e-mail para confirmar o acesso. Depois, solicite a liberação administrativa.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        await navigate({ to: "/solicitacoes" });
      }
    } catch (error) { setMessage(error instanceof Error ? error.message : "Não foi possível entrar."); }
    finally { setLoading(false); }
  }

  async function handleGoogle() {
    setLoading(true); setMessage("");
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (result.error) { setMessage(result.error.message); setLoading(false); return; }
    if (!result.redirected) await navigate({ to: "/solicitacoes" });
  }

  return (
    <main className="grid min-h-screen place-items-center bg-blush/20 px-6 py-16">
      <section className="w-full max-w-md border border-border bg-background p-7 sm:p-10">
        <Link to="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-foreground/55"><ArrowLeft className="size-4" /> Voltar</Link>
        <p className="mt-10 text-[10px] font-semibold uppercase tracking-[0.3em] text-accent">Área administrativa</p>
        <h1 className="mt-3 font-serif text-4xl">Solicitações de clientes</h1>
        <p className="mt-3 text-sm leading-relaxed text-foreground/60">Entre com a conta autorizada para visualizar a lista.</p>
        <Button type="button" variant="outline" className="mt-7 h-11 w-full rounded-none" onClick={handleGoogle} disabled={loading}>Continuar com Google</Button>
        <div className="my-6 flex items-center gap-3"><span className="h-px flex-1 bg-border" /><span className="text-[9px] uppercase tracking-widest text-foreground/40">ou</span><span className="h-px flex-1 bg-border" /></div>
        <form onSubmit={handleEmail} className="space-y-4">
          <Field label="E-mail"><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></Field>
          <Field label="Senha"><Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} minLength={8} required /></Field>
          <Button className="h-11 w-full rounded-none" disabled={loading}>{loading ? "Aguarde..." : mode === "login" ? "Entrar" : "Criar acesso"}</Button>
        </form>
        <button type="button" onClick={() => { setMode((v) => v === "login" ? "signup" : "login"); setMessage(""); }} className="mt-5 w-full text-xs underline underline-offset-4">{mode === "login" ? "Primeiro acesso? Criar conta" : "Já tenho conta"}</button>
        {message && <p role="status" className="mt-5 text-sm leading-relaxed text-foreground/65">{message}</p>}
      </section>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="block"><span className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-foreground/65">{label}</span>{children}</label>; }