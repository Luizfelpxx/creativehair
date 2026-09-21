import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import pretoOndulado from "@/assets/cabelo-preto-ondulado.jpeg.asset.json";
import castanhoCacheado from "@/assets/cabelo-castanho-cacheado.jpeg.asset.json";
import pretoLiso from "@/assets/cabelo-preto-liso.jpeg.asset.json";
import morenoIluminado from "@/assets/cabelo-moreno-iluminado-ondulado.jpeg.asset.json";

const catalog = [
  { src: pretoOndulado.url, label: "Preto ondulado", position: "object-center" },
  { src: castanhoCacheado.url, label: "Castanho cacheado", position: "object-center" },
  { src: pretoLiso.url, label: "Preto liso", position: "object-center" },
  { src: morenoIluminado.url, label: "Moreno iluminado", position: "object-center" },
];

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % catalog.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  const showSlide = (index: number) => {
    setActiveIndex((index + catalog.length) % catalog.length);
  };

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
        <div
          className="group relative min-h-[480px] overflow-hidden bg-secondary sm:min-h-[620px] lg:h-full lg:min-h-[600px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
          }}
          aria-roledescription="carrossel"
          aria-label="Catálogo de cabelos Creative Hair"
        >
          {catalog.map((item, index) => (
            <div
              key={item.label}
              className={`absolute inset-0 transition-[opacity,transform] duration-1000 ease-out motion-reduce:transition-none ${
                activeIndex === index
                  ? "z-10 scale-100 opacity-100"
                  : "pointer-events-none scale-105 opacity-0"
              }`}
              aria-hidden={activeIndex !== index}
            >
              <img
                src={item.src}
                alt={`Cabelo brasileiro ${item.label} da Creative Hair`}
                width={700}
                height={900}
                className={`size-full object-cover ${item.position}`}
                fetchPriority={index === 0 ? "high" : "auto"}
              />
            </div>
          ))}

          <div className="absolute inset-0 z-20 flex flex-col justify-end bg-gradient-to-t from-primary/85 via-primary/10 to-transparent p-6 sm:p-10">
            <span className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-primary-foreground/70">
              Coleção premium · {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <p className="max-w-sm font-serif text-3xl text-primary-foreground sm:text-4xl">
              {catalog[activeIndex]?.label}
            </p>
            <a
              href="#produtos"
              className="mt-5 w-fit border-b border-primary-foreground/60 pb-1 text-xs font-semibold uppercase tracking-widest text-primary-foreground transition-colors hover:border-accent hover:text-accent"
            >
              Explorar catálogo
            </a>
          </div>

          <div className="absolute right-5 top-5 z-30 flex gap-2 sm:right-8 sm:top-8">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="border border-primary-foreground/30 bg-primary/20 text-primary-foreground backdrop-blur-sm hover:bg-primary-foreground hover:text-primary"
              onClick={() => showSlide(activeIndex - 1)}
              aria-label="Foto anterior"
              title="Foto anterior"
            >
              <ChevronLeft aria-hidden="true" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="border border-primary-foreground/30 bg-primary/20 text-primary-foreground backdrop-blur-sm hover:bg-primary-foreground hover:text-primary"
              onClick={() => showSlide(activeIndex + 1)}
              aria-label="Próxima foto"
              title="Próxima foto"
            >
              <ChevronRight aria-hidden="true" />
            </Button>
          </div>

          <div className="absolute right-5 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-3 sm:right-8">
            {catalog.map((item, index) => (
              <Button
                key={item.label}
                type="button"
                variant="ghost"
                size="icon"
                className="h-6 w-6 p-0 hover:bg-transparent"
                onClick={() => showSlide(index)}
                aria-label={`Mostrar ${item.label}`}
                aria-current={activeIndex === index ? "true" : undefined}
              >
                <span
                  className={`block w-1 rounded-full bg-primary-foreground transition-all duration-300 ${
                    activeIndex === index ? "h-6 opacity-100" : "h-2 opacity-40"
                  }`}
                />
              </Button>
            ))}
          </div>

          <div className="absolute inset-x-0 bottom-0 z-30 h-1 bg-primary-foreground/15">
            {!isPaused && <div key={activeIndex} className="catalog-progress h-full bg-accent" />}
          </div>

          <p className="sr-only" aria-live="polite">
            Foto {activeIndex + 1} de {catalog.length}: {catalog[activeIndex]?.label}
          </p>
        </div>
      </div>
    </section>
  );
}
