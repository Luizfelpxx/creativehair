import { useReveal } from "@/hooks/use-reveal";

export function About() {
  const reveal = useReveal<HTMLDivElement>();

  return (
    <section id="sobre" className="bg-secondary/30 py-20 lg:py-24">
      <div
        ref={reveal.ref}
        className={`mx-auto max-w-4xl space-y-8 px-6 text-center ${reveal.className}`}
      >
        <h2 className="font-serif text-3xl lg:text-4xl">Sobre a Creative Hair</h2>
        <p className="text-lg font-light italic leading-relaxed text-foreground/80">
          “Trabalhamos exclusivamente com cabelos 100% humanos, de doadora única e 100% brasileiros,
          sem mistura de origens. Cada mecha é selecionada para garantir qualidade premium, brilho e
          textura inigualáveis — atendendo tanto o varejo quanto profissionais no atacado.”
        </p>
      </div>
    </section>
  );
}
