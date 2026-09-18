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
        <div className="grid min-h-[420px] grid-cols-2 gap-px overflow-hidden bg-border lg:h-full lg:min-h-[600px]">
          {catalog.map((item, index) => (
            <a
              key={item.label}
              href="#produtos"
              className="group relative min-h-52 overflow-hidden bg-secondary lg:min-h-0"
              aria-label={`Ver ${item.label} na vitrine`}
            >
              <img
                src={item.src}
                alt={`Cabelo brasileiro ${item.label} da Creative Hair`}
                width={700}
                height={900}
                className={`size-full object-cover ${item.position} transition-transform duration-700 group-hover:scale-105`}
                fetchPriority={index === 0 ? "high" : "auto"}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/70 to-transparent px-3 pb-3 pt-10">
                <span className="text-[9px] font-semibold uppercase tracking-widest text-primary-foreground">
                  {item.label}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
