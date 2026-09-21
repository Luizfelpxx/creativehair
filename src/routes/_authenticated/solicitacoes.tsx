import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { LogOut, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { listCustomerRequests } from "@/lib/customer-requests.functions";
import { supabase } from "@/integrations/supabase/client";

type CustomerRequest = Awaited<ReturnType<typeof listCustomerRequests>>[number];
const TITLE = "Solicitações — Creative Hair";
const DESCRIPTION = "Lista privada de solicitações recebidas pela Creative Hair.";

export const Route = createFileRoute("/_authenticated/solicitacoes")({
  head: () => ({ meta: [{ title: TITLE }, { name: "description", content: DESCRIPTION }, { property: "og:title", content: TITLE }, { property: "og:description", content: DESCRIPTION }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: RequestsPage,
});

function RequestsPage() {
  const loadRequests = useServerFn(listCustomerRequests);
  const navigate = useNavigate();
  const [items, setItems] = useState<CustomerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function refresh() {
    setLoading(true); setError("");
    try { setItems(await loadRequests()); }
    catch (requestError) { setError(requestError instanceof Error ? requestError.message : "Não foi possível carregar as solicitações."); }
    finally { setLoading(false); }
  }
  useEffect(() => { void refresh(); }, []);

  return (
    <main className="min-h-screen bg-sky/15 px-6 py-12 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-wrap items-start justify-between gap-5 border-b border-border pb-8">
          <div><p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-accent">Creative Hair</p><h1 className="mt-2 font-serif text-4xl lg:text-5xl">Solicitações de clientes</h1><p className="mt-2 text-sm text-foreground/55">Consultorias e contatos mais recentes.</p></div>
          <div className="flex gap-2"><Button variant="outline" onClick={() => void refresh()} disabled={loading}><RefreshCw /> Atualizar</Button><Button variant="outline" onClick={async () => { await supabase.auth.signOut(); await navigate({ to: "/auth" }); }}><LogOut /> Sair</Button></div>
        </header>
        {loading && <p className="py-16 text-sm text-foreground/60">Carregando solicitações...</p>}
        {error && <div className="my-10 border-l-2 border-destructive bg-background p-5"><p className="font-medium">A lista está protegida.</p><p className="mt-2 text-sm text-foreground/60">{error}</p><p className="mt-2 text-xs text-foreground/50">Entre com o e-mail comercial da Creative Hair.</p></div>}
        {!loading && !error && items.length === 0 && <p className="py-16 text-sm text-foreground/60">Nenhuma solicitação recebida ainda.</p>}
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => <article key={item.id} className="border border-border bg-background p-6"><div className="flex items-center justify-between gap-3"><span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-accent">{item.request_type}</span><time className="text-[10px] text-foreground/45">{new Date(item.created_at).toLocaleString("pt-BR")}</time></div><h2 className="mt-4 font-serif text-2xl">{item.name ?? item.recommended_product_name ?? "Consultoria"}</h2>{item.email && <a className="mt-1 block text-xs underline" href={`mailto:${item.email}`}>{item.email}</a>}<dl className="mt-5 grid grid-cols-2 gap-4 text-xs"><Detail label="Comprimento" value={item.length} /><Detail label="Gramatura" value={item.weight} /><Detail label="Cor" value={item.color} /><Detail label="Objetivo" value={item.goal} /></dl>{item.recommendation_reason && <p className="mt-5 border-t border-border pt-4 text-xs leading-relaxed text-foreground/60">{item.recommendation_reason}</p>}</article>)}
        </div>
        <Link to="/" className="mt-10 inline-block text-xs uppercase tracking-widest underline underline-offset-4">Voltar à loja</Link>
      </div>
    </main>
  );
}

function Detail({ label, value }: { label: string; value: string | null }) { return <div><dt className="text-[9px] uppercase tracking-widest text-foreground/40">{label}</dt><dd className="mt-1 text-foreground/75">{value ?? "—"}</dd></div>; }