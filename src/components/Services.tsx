import { openWhatsapp } from "@/lib/site-config";
import { renderTemplate, useSettings } from "@/lib/settings";
import { CopyMessageButton } from "./CopyMessageButton";
import { useReveal } from "@/hooks/use-reveal";

const SERVICES = [
  {
    name: "Nano Slim",
    description:
      "Confecção de mega hair no método nano slim: fitas ultrafinas e maleáveis, com acabamento discreto, conforto absoluto e durabilidade excepcional.",
    highlights: ["Acabamento invisível", "Conforto 24h", "Método premium"],
  },
  {
    name: "Topo de Cabelo Tic Tac",
    description:
      "Confecção de topo de cabelo no método tic tac: naturalidade e praticidade para volume ou cobertura no topo, com aplicação instantânea.",
    highlights: ["Fácil aplicação", "Personalização total", "Volume instantâneo"],
  },
];

export function Services() {
  const reveal = useReveal<HTMLDivElement>();
  const settings = useSettings();

  return (
    <section id="servicos" className="bg-rose/15 py-20 lg:py-24">
      <div ref={reveal.ref} className={`mx-auto max-w-7xl px-6 ${reveal.className}`}>
        <div className="mb-12 text-center lg:mb-16">
          <h2 className="mb-4 font-serif text-3xl lg:text-4xl">Confecção Personalizada</h2>
          <p className="font-light text-foreground/60">
            Serviços sob encomenda para um acabamento perfeito
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          {SERVICES.map((service) => {
            const mensagem = renderTemplate(settings.serviceTemplate, {
              servico: service.name,
            });
            return (
              <div
                key={service.name}
                className="space-y-6 border border-border/60 bg-background p-8 lg:p-10"
              >
                <h3 className="font-serif text-2xl">{service.name}</h3>
                <p className="text-sm italic leading-relaxed text-foreground/70">
                  {service.description}
                </p>
                <ul className="space-y-2 text-[11px] uppercase tracking-widest opacity-60">
                  {service.highlights.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
                <div className="grid gap-2">
                  <button
                    type="button"
                    onClick={() => openWhatsapp(mensagem)}
                    className="w-full border border-primary py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:bg-primary hover:text-primary-foreground"
                  >
                    Solicitar orçamento
                  </button>
                  <CopyMessageButton message={mensagem} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
