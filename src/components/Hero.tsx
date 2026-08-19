import heroHair from "@/assets/hero-hair.jpg";

export function Hero() {
  return (
    <section id="inicio" className="relative pt-16 lg:pt-20">
      <div className="grid items-center lg:min-h-[85vh] lg:grid-cols-2">
        <div className="space-y-6 px-6 py-16 md:p-16 lg:p-24 lg:space-y-8">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
            Qualidade Premium
          </span>
          <h1 className="text-balance font-serif text-4xl leading-[1.1] sm:text-5xl lg:text-7xl">
            Cabelo 100% humano, de <i>doadora única</i>.
          </h1>
          <p className="max-w-md text-base font-light leading-relaxed text-foreground/70 lg:text-lg">
            Exclusividade brasileira sem mistura de origens. A excelência que o seu visual merece,
            do varejo ao atacado.
          </p>
          <div className="pt-2 lg:pt-4">
            <a
              href="#produtos"
              className="inline-block bg-primary px-10 py-5 text-sm uppercase tracking-widest text-primary-foreground transition-colors duration-500 hover:bg-accent"
            >
              Ver Produtos
            </a>
          </div>
        </div>
        <div className="relative min-h-[380px] overflow-hidden bg-secondary lg:h-full lg:min-h-[500px]">
          <img
            src={heroHair}
            alt="Cabelo humano brasileiro premium, liso e brilhante, da Creative Hair"
            width={1000}
            height={1200}
            className="size-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
