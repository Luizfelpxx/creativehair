import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Clock3, MapPin, MessageCircle, PackageCheck } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CartProvider } from "@/hooks/use-cart";
import { whatsappLink } from "@/lib/site-config";

const TITLE = "Prazos de entrega e frete — Creative Hair";
const DESCRIPTION = "Consulte prazo e valor de entrega da Creative Hair no Rio de Janeiro antes de comprar.";
const freeNeighborhoods = ["Freguesia", "Anil", "Pechincha", "Tanque", "Taquara"];

export const Route = createFileRoute("/frete")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://creativehair.lovable.app/frete" }],
  }),
  component: ShippingPage,
});

function ShippingPage() {
  const quoteMessage = "Olá! Gostaria de confirmar o valor e o prazo do frete da Creative Hair para o meu endereço. Meu bairro é: ";

  return (
    <CartProvider>
      <Header />
      <main className="min-h-screen bg-sky/15 px-6 pb-20 pt-32 lg:pt-40">
        <div className="mx-auto max-w-6xl">
          <Link to="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-foreground/55">
            <ArrowLeft className="size-4" /> Voltar à vitrine
          </Link>

          <section className="mt-10 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-accent">Entrega no Rio de Janeiro</span>
              <h1 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">Seu cabelo chega em até 2 dias.</h1>
              <p className="mt-5 max-w-lg text-sm leading-relaxed text-foreground/65">Confira a faixa correspondente ao bairro de entrega antes de finalizar. O prazo começa após a confirmação do pagamento e da disponibilidade.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <article className="border border-border bg-background p-6 sm:p-8">
                <div className="flex size-10 items-center justify-center bg-blush/45"><MapPin className="size-5 text-accent" /></div>
                <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">Região próxima</p>
                <h2 className="mt-2 font-serif text-3xl">Frete grátis</h2>
                <p className="mt-4 text-sm leading-relaxed text-foreground/60">Para entregas em {freeNeighborhoods.join(", ")}.</p>
                <p className="mt-6 border-t border-border pt-4 text-xs text-foreground/55"><Clock3 className="mr-2 inline size-4" /> Até 2 dias úteis</p>
              </article>

              <article className="border border-border bg-background p-6 sm:p-8">
                <div className="flex size-10 items-center justify-center bg-sky/45"><PackageCheck className="size-5 text-accent" /></div>
                <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">Demais bairros do Rio</p>
                <h2 className="mt-2 font-serif text-3xl">R$ 45,00</h2>
                <p className="mt-4 text-sm leading-relaxed text-foreground/60">Tarifa padrão estimada para entrega urbana. O valor é confirmado conforme o endereço.</p>
                <p className="mt-6 border-t border-border pt-4 text-xs text-foreground/55"><Clock3 className="mr-2 inline size-4" /> Até 2 dias úteis</p>
              </article>
            </div>
          </section>

          <section className="mt-12 flex flex-col items-start justify-between gap-6 border-y border-border py-8 sm:flex-row sm:items-center">
            <div><h2 className="font-serif text-2xl">Seu bairro não está na lista?</h2><p className="mt-2 text-sm text-foreground/60">Envie o bairro e confirme o frete exato antes da compra.</p></div>
            <Button asChild className="h-12 shrink-0 rounded-none px-6 uppercase tracking-widest"><a href={whatsappLink(quoteMessage)} target="_blank" rel="noreferrer"><MessageCircle /> Consultar pelo WhatsApp</a></Button>
          </section>

          <p className="mt-8 max-w-3xl text-xs leading-relaxed text-foreground/45">A tarifa padrão é uma referência para pequenos volumes e pode variar em áreas muito distantes, de acesso restrito ou conforme a disponibilidade do entregador. A confirmação final é feita antes do envio.</p>
        </div>
      </main>
      <Footer />
    </CartProvider>
  );
}