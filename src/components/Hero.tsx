import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
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
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const dragStart = useRef<number | null>(null);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isPaused = isHovered || isFocused || isInteracting || reducedMotion;

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(query.matches);
    updatePreference();
    query.addEventListener("change", updatePreference);
    return () => query.removeEventListener("change", updatePreference);
  }, []);

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

  const pauseBriefly = () => {
    setIsInteracting(true);
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => setIsInteracting(false), 3500);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") showSlide(activeIndex - 1);
    else if (event.key === "ArrowRight") showSlide(activeIndex + 1);
    else if (event.key === "Home") showSlide(0);
    else if (event.key === "End") showSlide(catalog.length - 1);
    else return;
    event.preventDefault();
    pauseBriefly();
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    dragStart.current = event.clientX;
    setIsInteracting(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (dragStart.current !== null) {
      const distance = event.clientX - dragStart.current;
      if (Math.abs(distance) > 45) showSlide(activeIndex + (distance < 0 ? 1 : -1));
    }
    dragStart.current = null;
    pauseBriefly();
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
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocusCapture={() => setIsFocused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setIsFocused(false);
          }}
          onKeyDown={handleKeyDown}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => {
            dragStart.current = null;
            pauseBriefly();
          }}
          tabIndex={0}
          className="group relative min-h-[480px] touch-pan-y select-none overflow-hidden bg-secondary outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset sm:min-h-[620px] lg:h-full lg:min-h-[600px]"
          aria-roledescription="carrossel"
          aria-label="Catálogo de cabelos Creative Hair"
        >
          {catalog.map((item, index) => (
            <div
              key={item.label}
              className={`absolute inset-0 transition-[opacity,transform] duration-1000 ease-out motion-reduce:transform-none motion-reduce:transition-none ${
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
              onClick={() => { showSlide(activeIndex - 1); pauseBriefly(); }}
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
              onClick={() => { showSlide(activeIndex + 1); pauseBriefly(); }}
              aria-label="Próxima foto"
              title="Próxima foto"
            >
              <ChevronRight aria-hidden="true" />
            </Button>
          </div>

          <div className="absolute left-5 top-5 z-30 flex gap-2 sm:left-8 sm:top-8" role="tablist" aria-label="Escolher foto do catálogo">
            {catalog.map((item, index) => (
              <Button
                key={item.label}
                type="button"
                variant="ghost"
                size="icon"
                className={`h-12 w-10 overflow-hidden rounded-none border-2 p-0 shadow-md transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:h-16 sm:w-12 ${activeIndex === index ? "border-accent opacity-100" : "border-primary-foreground/50 opacity-65 hover:opacity-100"}`}
                onClick={() => { showSlide(index); pauseBriefly(); }}
                aria-label={`Mostrar ${item.label}`}
                aria-current={activeIndex === index ? "true" : undefined}
                role="tab"
                aria-selected={activeIndex === index}
              >
                <img src={item.src} alt="" className="size-full object-cover" draggable={false} />
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
