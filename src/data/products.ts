import pretoOnduladoAsset from "@/assets/cabelo-preto-ondulado.jpeg";
import castanhoCacheadoAsset from "@/assets/cabelo-castanho-cacheado.jpeg";
import pretoLisoAsset from "@/assets/cabelo-preto-liso.jpeg";
import morenoIluminadoAsset from "@/assets/cabelo-moreno-iluminado-ondulado.jpeg";
import topperLoiroAsset from "@/assets/topper-capilar-loiro.jpg";
import {
  REAL_HAIR_PRICES,
  REAL_HAIR_PRICES_500G,
  type HairPrices,
  type HairWeight,
} from "@/lib/settings";

/** Tamanhos disponíveis (cm). */
export const SIZES = [
  "45cm",
  "50cm",
  "55cm",
  "60cm",
  "65cm",
  "70cm",
  "75cm",
  "80cm",
  "85cm",
  "90cm",
] as const;

export const HAIR_SIZES = ["45cm", "55cm", "60cm", "65cm", "70cm", "75cm"] as const;

export type Size = (typeof SIZES)[number];

/** Categorias da vitrine (a ordem define a exibição na página). */
export const CATEGORIES = ["Mega Hair", "Toppers / Topo de Cabelo"] as const;

export type Category = (typeof CATEGORIES)[number];

export type Product = {
  id: string;
  name: string;
  /** Categoria da vitrine. Padrão: "Mega Hair". */
  category?: Category;
  description: string;
  /** Lista de características exibidas no card (opcional). */
  features?: string[];
  /** Tamanhos disponíveis para este produto (padrão: todos). */
  sizes?: readonly Size[];
  image: string;
  alt: string;
  /** Cores/tonalidades disponíveis para este cabelo. */
  colors: string[];
  /**
   * PREÇOS PROVISÓRIOS — substitua pelos valores da tabela oficial.
   * Preço por tamanho (em reais).
   */
  priceBySize: Partial<Record<Size, number>>;
  /** Usa a tabela editável de 100g no painel. */
  usesHairPriceTable?: boolean;
  /** Foto por cor — exibida no card quando a cliente seleciona a tonalidade. */
  colorImages: Record<string, string>;
  /** Acréscimo opcional por cor (em reais). Deixe 0 quando não houver. */
  colorSurcharge?: Record<string, number>;
};

/** Tabela base provisória de preços por tamanho. */
function priceTable(base: number, step: number): Record<Size, number> {
  return SIZES.reduce(
    (acc, size, index) => {
      acc[size] = base + step * index;
      return acc;
    },
    {} as Record<Size, number>,
  );
}

export const PRODUCTS: Product[] = [
  {
    id: "preto-ondulado",
    name: "Cabelo Brasileiro Preto Ondulado",
    description: "Ondas naturais, fios inteiros e brilho intenso preservado.",
    image: pretoOnduladoAsset,
    alt: "Duas mechas de cabelo brasileiro preto ondulado da Creative Hair",
    sizes: HAIR_SIZES,
    colors: ["Preto Natural"],
    colorImages: {
      "Preto Natural": pretoOnduladoAsset,
    },
    priceBySize: REAL_HAIR_PRICES,
    usesHairPriceTable: true,
  },
  {
    id: "castanho-cacheado",
    name: "Cabelo Brasileiro Castanho Cacheado",
    description: "Cachos definidos, volumosos e com movimento natural.",
    image: castanhoCacheadoAsset,
    alt: "Mecha de cabelo brasileiro castanho cacheado da Creative Hair",
    sizes: HAIR_SIZES,
    colors: ["Castanho Escuro"],
    colorImages: {
      "Castanho Escuro": castanhoCacheadoAsset,
    },
    priceBySize: REAL_HAIR_PRICES,
    usesHairPriceTable: true,
  },
  {
    id: "preto-liso",
    name: "Cabelo Brasileiro Preto Liso",
    description: "Fios lisos, alinhados, sedosos e com aparência natural.",
    image: pretoLisoAsset,
    alt: "Mecha de cabelo brasileiro preto liso da Creative Hair",
    sizes: HAIR_SIZES,
    colors: ["Preto Natural"],
    colorImages: {
      "Preto Natural": pretoLisoAsset,
    },
    priceBySize: REAL_HAIR_PRICES,
    usesHairPriceTable: true,
  },
  {
    id: "moreno-iluminado-ondulado",
    name: "Cabelo Brasileiro Moreno Iluminado Ondulado",
    description: "Base castanha com pontas iluminadas e ondas marcantes.",
    image: morenoIluminadoAsset,
    alt: "Mecha de cabelo brasileiro moreno iluminado ondulado da Creative Hair",
    sizes: HAIR_SIZES,
    colors: ["Moreno Iluminado", "Moreno Caramelo"],
    colorImages: {
      "Moreno Iluminado": morenoIluminadoAsset,
      "Moreno Caramelo": morenoIluminadoAsset,
    },
    priceBySize: REAL_HAIR_PRICES,
    usesHairPriceTable: true,
  },
  {
    id: "topper-capilar-loiro",
    name: "Topper Capilar Loiro",
    category: "Toppers / Topo de Cabelo",
    description:
      "Topper capilar ideal para proporcionar mais volume e cobertura na região superior da cabeça. Acabamento natural, confortável, prático e com resultado discreto e elegante.",
    features: [
      "Ideal para dar volume na parte superior da cabeça",
      "Proporciona cobertura e aparência natural",
      "Confortável e prático de utilizar",
      "Pode ser personalizado conforme a necessidade da cliente",
    ],
    image: topperLoiroAsset,
    alt: "Topper capilar loiro com acabamento natural da Creative Hair",
    sizes: ["45cm", "50cm", "55cm", "60cm"],
    colors: ["Loiro Iluminado"],
    colorImages: {
      "Loiro Iluminado": topperLoiroAsset,
    },
    priceBySize: priceTable(1100, 120),
  },
];

/** Produtos agrupados por categoria, na ordem de CATEGORIES. */
export function productsByCategory() {
  return CATEGORIES.map((category) => ({
    category,
    products: PRODUCTS.filter((product) => (product.category ?? "Mega Hair") === category),
  })).filter((group) => group.products.length > 0);
}

/** Tamanhos disponíveis para o produto. */
export function getSizes(product: Product): readonly Size[] {
  return product.sizes ?? SIZES;
}

export function getPrice(
  product: Product,
  size: Size,
  color: string,
  hairPrices?: HairPrices,
  weight: HairWeight = "100g",
  hairPrices500g?: HairPrices,
): number {
  const table = product.usesHairPriceTable
    ? weight === "500g"
      ? (hairPrices500g ?? REAL_HAIR_PRICES_500G)
      : (hairPrices ?? REAL_HAIR_PRICES)
    : product.priceBySize;
  return (table[size as keyof typeof table] ?? 0) + (product.colorSurcharge?.[color] ?? 0);
}

/** Foto correspondente à cor selecionada (cai na foto principal se não houver). */
export function getProductImage(product: Product, color: string): string {
  return product.colorImages[color] ?? product.image;
}

/**
 * Escala visual da foto conforme o tamanho escolhido, para a cliente
 * ter noção do comprimento (45cm = menor, 90cm = maior).
 */
export function getSizeScale(size: Size | ""): number {
  if (!size) return 1;
  const index = SIZES.indexOf(size);
  return 0.82 + (index / (SIZES.length - 1)) * 0.34;
}
