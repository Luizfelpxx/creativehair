import { useState } from "react";
import { openWhatsapp } from "@/lib/site-config";
import { renderTemplate, selectionDetails, useSettings } from "@/lib/settings";
import { CopyMessageButton } from "./CopyMessageButton";
import { useReveal } from "@/hooks/use-reveal";
import { PRODUCTS, SIZES, type Product, type Size } from "@/data/products";

export function Wholesale() {
  const reveal = useReveal<HTMLDivElement>();
  const settings = useSettings();
  const [productId, setProductId] = useState("");
  const [size, setSize] = useState<Size | "">("");
  const [color, setColor] = useState("");

  const product = productId ? PRODUCTS.find((p) => p.id === productId) : undefined;

  const detalhes = product
    ? ` para o ${product.name}${selectionDetails(size || undefined, color || undefined)}`
    : "";
  const mensagem = renderTemplate(settings.wholesaleTemplate, {
    produto: product?.name ?? "",
    detalhes,
  });

  return (
    <section id="atacado" className="border-t border-border/40 py-20 lg:py-24">
      <div ref={reveal.ref} className={`mx-auto max-w-2xl px-6 text-center ${reveal.className}`}>
        <h2 className="mb-6 font-serif text-3xl lg:text-4xl">Para Profissionais e Salões</h2>
        <p className="mb-10 font-light text-foreground/70">
          Atendemos profissionais de cabelo e salões com condições exclusivas de atacado. Leve a
          excelência do cabelo brasileiro de doadora única para suas clientes.
        </p>

        <div className="mb-8 space-y-4 text-left">
          <label className="block">
            <span className="mb-2 block text-[9px] font-bold uppercase tracking-widest text-accent">
              Produto de interesse
            </span>
            <select
              value={productId}
              onChange={(event) => {
                setProductId(event.target.value);
                setSize("");
                setColor("");
              }}
              className="w-full border border-border bg-transparent px-3 py-2 text-xs transition-colors focus:border-accent focus:outline-none"
            >
              <option value="">Selecionar (opcional)</option>
              {PRODUCTS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-[9px] font-bold uppercase tracking-widest text-accent">
                Tamanho
              </span>
              <select
                value={size}
                onChange={(event) => setSize(event.target.value as Size)}
                disabled={!productId}
                className="w-full border border-border bg-transparent px-3 py-2 text-xs transition-colors focus:border-accent focus:outline-none disabled:cursor-not-allowed disabled:opacity-40"
              >
                <option value="">Selecionar (opcional)</option>
                {SIZES.map((option) => (
                  <option key={option} value={option}>
                    {option}
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
                disabled={!productId}
                className="w-full border border-border bg-transparent px-3 py-2 text-xs transition-colors focus:border-accent focus:outline-none disabled:cursor-not-allowed disabled:opacity-40"
              >
                <option value="">Selecionar (opcional)</option>
                {product?.colors.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="mx-auto flex max-w-sm flex-col gap-3">
          <button
            type="button"
            onClick={() => openWhatsapp(mensagem)}
            className="bg-accent px-10 py-5 text-[11px] font-bold uppercase tracking-[0.25em] text-accent-foreground transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            Solicitar tabela de atacado
          </button>
          <CopyMessageButton message={mensagem} />
        </div>
      </div>
    </section>
  );
}
