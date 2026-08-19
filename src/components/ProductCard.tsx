import { useState } from "react";
import {
  getPrice,
  getProductImage,
  getSizeScale,
  SIZES,
  type Product,
  type Size,
} from "@/data/products";
import { formatBRL, openWhatsapp } from "@/lib/site-config";
import { useCart } from "@/hooks/use-cart";
import { useReveal } from "@/hooks/use-reveal";
import { WhatsappIcon } from "./WhatsappIcon";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const reveal = useReveal<HTMLElement>();
  const [size, setSize] = useState<Size | "">("");
  const [color, setColor] = useState("");
  const [error, setError] = useState("");

  const price = size && color ? getPrice(product, size, color) : null;
  const image = getProductImage(product, color);
  const scale = getSizeScale(size);

  function handleAdd() {
    if (!size || !color) {
      setError("Selecione tamanho e cor para continuar.");
      return;
    }
    setError("");
    add({ productId: product.id, size, color, quantity: 1 });
  }

  return (
    <article ref={reveal.ref} className={`group ${reveal.className}`}>
      <div className="relative mb-6 aspect-3/4 overflow-hidden bg-secondary">
        <img
          key={image}
          src={image}
          alt={
            color
              ? `${product.name} na cor ${color}${size ? ` com ${size}` : ""}`
              : product.alt
          }
          loading="lazy"
          width={800}
          height={1067}
          style={{ transform: `scale(${scale})` }}
          className="size-full origin-top animate-[fade-in_0.5s_ease-out] object-cover object-top transition-transform duration-700 ease-out"
        />
        {(color || size) && (
          <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-2 bg-gradient-to-t from-primary/45 to-transparent p-3">
            {size && (
              <span className="bg-background/85 px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-foreground/80">
                {size}
              </span>
            )}
            {color && (
              <span className="bg-background/85 px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-foreground/80">
                {color}
              </span>
            )}
          </div>
        )}
      </div>


      <div className="space-y-3">
        <h3 className="font-serif text-xl">{product.name}</h3>
        <p className="text-xs leading-relaxed text-foreground/60">{product.description}</p>

        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-[9px] font-bold uppercase tracking-widest text-accent">
              Tamanho
            </span>
            <select
              value={size}
              onChange={(event) => setSize(event.target.value as Size)}
              className="w-full border border-border bg-transparent px-3 py-2 text-xs transition-colors focus:border-accent focus:outline-none"
            >
              <option value="">Selecionar</option>
              {SIZES.map((option) => (
                <option key={option} value={option}>
                  {option} — {formatBRL(product.priceBySize[option])}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-[9px] font-bold uppercase tracking-widest text-accent">
              Cor
            </span>
            <select
              value={color}
              onChange={(event) => setColor(event.target.value)}
              className="w-full border border-border bg-transparent px-3 py-2 text-xs transition-colors focus:border-accent focus:outline-none"
            >
              <option value="">Selecionar</option>
              {product.colors.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>

        <p className="pt-1 font-serif text-lg">
          {price !== null ? formatBRL(price) : <span className="text-sm text-foreground/50">Selecione tamanho e cor</span>}
        </p>

        {error && <p className="text-[10px] uppercase tracking-widest text-destructive">{error}</p>}

        <div className="grid gap-2 pt-2 sm:grid-cols-2">
          <button
            type="button"
            onClick={handleAdd}
            className="bg-primary py-3 text-[10px] uppercase tracking-widest text-primary-foreground transition-colors hover:bg-accent"
          >
            Adicionar
          </button>
          <button
            type="button"
            onClick={() =>
              openWhatsapp(
                `Olá! Vi o ${product.name} no site da Creative Hair e queria saber mais informações sobre tamanhos e preços. Vocês têm disponível?`,
              )
            }
            className="flex items-center justify-center gap-2 border border-primary/20 py-3 text-[10px] uppercase tracking-widest transition-colors hover:bg-rose/30"
          >
            <WhatsappIcon className="size-4 text-accent" />
            Perguntar
          </button>
        </div>
      </div>
    </article>
  );
}
