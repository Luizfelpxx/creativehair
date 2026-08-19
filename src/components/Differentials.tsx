import { useReveal } from "@/hooks/use-reveal";

const ITEMS = [
  { number: "01", label: "Qualidade premium" },
  { number: "02", label: "Doadora única" },
  { number: "03", label: "100% brasileiro" },
  { number: "04", label: "Sem mistura de origens" },
  { number: "05", label: "Pagamento via Pix" },
];

export function Differentials() {
  const reveal = useReveal<HTMLDivElement>();

  return (
    <section className="bg-secondary/40 py-16 lg:py-20">
      <div
        ref={reveal.ref}
        className={`mx-auto grid max-w-7xl grid-cols-2 gap-10 px-6 text-center md:grid-cols-5 ${reveal.className}`}
      >
        {ITEMS.map((item) => (
          <div key={item.number} className="space-y-3">
            <div className="font-serif text-2xl italic text-accent">{item.number}</div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest">{item.label}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
