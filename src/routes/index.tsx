import { createFileRoute } from "@tanstack/react-router";
import { CartProvider } from "@/hooks/use-cart";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { ProductGrid } from "@/components/ProductGrid";
import { Services } from "@/components/Services";
import { Wholesale } from "@/components/Wholesale";
import { Differentials } from "@/components/Differentials";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";

const TITLE = "Creative Hair — Mega Hair 100% Humano de Doadora Única";
const DESCRIPTION =
  "Extensões e mega hair 100% humanos, brasileiros e de doadora única, sem mistura de origens. Varejo, atacado e confecção sob encomenda.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <CartProvider>
      <Header />
      <main>
        <Hero />
        <About />
        <ProductGrid />
        <Services />
        <Wholesale />
        <Differentials />
      </main>
      <Footer />
      <CartDrawer />
    </CartProvider>
  );
}
