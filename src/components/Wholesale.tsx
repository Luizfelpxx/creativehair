import { openWhatsapp } from "@/lib/site-config";
import { useReveal } from "@/hooks/use-reveal";

export function Wholesale() {
  const reveal = useReveal<HTMLDivElement>();

  return (
    <section id="atacado" className="border-t border-border/40 py-20 text-center lg:py-24">
      <div ref={reveal.ref} className={`mx-auto max-w-2xl px-6 ${reveal.className}`}>
        <h2 className="mb-6 font-serif text-3xl lg:text-4xl">Para Profissionais e Salões</h2>
        <p className="mb-10 font-light text-foreground/70">
          Atendemos profissionais de cabelo e salões com condições exclusivas de atacado. Leve a
          excelência do cabelo brasileiro de doadora única para suas clientes.
        </p>
        <button
          type="button"
          onClick={() =>
            openWhatsapp(
              "Olá! Sou profissional/salão e gostaria de solicitar a tabela de preços de atacado da Creative Hair.",
            )
          }
          className="bg-accent px-10 py-5 text-[11px] font-bold uppercase tracking-[0.25em] text-accent-foreground transition-all hover:-translate-y-1 hover:shadow-xl"
        >
          Solicitar tabela de atacado
        </button>
      </div>
    </section>
  );
}
