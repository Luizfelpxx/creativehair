import { PRODUCTS } from "@/data/products";
import { ProductCard } from "./ProductCard";

export function ProductGrid() {
  return (
    <section id="produtos" className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
      <div className="mb-12 lg:mb-16">
        <h2 className="mb-2 font-serif text-3xl lg:text-4xl">Nossa Vitrine</h2>
        <p className="text-sm uppercase tracking-widest text-accent">
          Cabelos Brasileiros Selecionados
        </p>
      </div>

      <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
