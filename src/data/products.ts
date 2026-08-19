import castanho from "@/assets/produto-castanho.jpg";
import loiroMesclado from "@/assets/produto-loiro-mesclado.jpg";
import loiroEscuro from "@/assets/produto-loiro-escuro.jpg";
import morenoIluminado from "@/assets/produto-moreno-iluminado.jpg";
import cacheado from "@/assets/produto-cacheado.jpg";
import corCastanhoNatural from "@/assets/cor-castanho-natural.jpg";
import corCastanhoEscuro from "@/assets/cor-castanho-escuro.jpg";
import corCastanhoMedio from "@/assets/cor-castanho-medio.jpg";
import corLoiroPerola from "@/assets/cor-loiro-perola.jpg";
import corLoiroMel from "@/assets/cor-loiro-mel.jpg";
import corLoiroBege from "@/assets/cor-loiro-bege.jpg";
import corLoiroEscuro from "@/assets/cor-loiro-escuro.jpg";
import corLoiroAcinzentado from "@/assets/cor-loiro-acinzentado.jpg";
import corMorenoIluminado from "@/assets/cor-moreno-iluminado.jpg";
import corMorenoCaramelo from "@/assets/cor-moreno-caramelo.jpg";
import corCacheadoPreto from "@/assets/cor-cacheado-preto.jpg";
import corCacheadoCastanhoEscuro from "@/assets/cor-cacheado-castanho-escuro.jpg";

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

export type Size = (typeof SIZES)[number];

export type Product = {
  id: string;
  name: string;
  description: string;
  image: string;
  alt: string;
  /** Cores/tonalidades disponíveis para este cabelo. */
  colors: string[];
  /**
   * PREÇOS PROVISÓRIOS — substitua pelos valores da tabela oficial.
   * Preço por tamanho (em reais).
   */
  priceBySize: Record<Size, number>;
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
    id: "castanho",
    name: "Cabelo Brasileiro Castanho",
    description: "Fios inteiros, sedosos e com brilho natural preservado.",
    image: castanho,
    alt: "Mecha de cabelo brasileiro castanho liso premium da Creative Hair",
    colors: ["Castanho Natural", "Castanho Escuro", "Castanho Médio"],
    colorImages: {
      "Castanho Natural": corCastanhoNatural,
      "Castanho Escuro": corCastanhoEscuro,
      "Castanho Médio": corCastanhoMedio,
    },
    priceBySize: priceTable(1200, 150),
  },
  {
    id: "loiro-mesclado",
    name: "Cabelo Brasileiro Loiro Mesclado",
    description: "Mescla perfeita de tons para um efeito iluminado natural.",
    image: loiroMesclado,
    alt: "Mecha de cabelo brasileiro loiro mesclado premium da Creative Hair",
    colors: ["Loiro Pérola", "Loiro Mel", "Loiro Bege"],
    colorImages: {
      "Loiro Pérola": corLoiroPerola,
      "Loiro Mel": corLoiroMel,
      "Loiro Bege": corLoiroBege,
    },
    priceBySize: priceTable(1450, 180),
  },
  {
    id: "loiro-escuro",
    name: "Cabelo Brasileiro Loiro Escuro",
    description: "Tonalidade amanteigada e discreta, de acabamento uniforme.",
    image: loiroEscuro,
    alt: "Mecha de cabelo brasileiro loiro escuro premium da Creative Hair",
    colors: ["Loiro Escuro", "Loiro Acinzentado"],
    colorImages: {
      "Loiro Escuro": corLoiroEscuro,
      "Loiro Acinzentado": corLoiroAcinzentado,
    },
    priceBySize: priceTable(1400, 170),
  },
  {
    id: "moreno-iluminado",
    name: "Cabelo Brasileiro Moreno Iluminado",
    description: "Base escura com reflexos caramelo para um brilho vivo.",
    image: morenoIluminado,
    alt: "Mecha de cabelo brasileiro moreno iluminado premium da Creative Hair",
    colors: ["Moreno Iluminado", "Moreno Caramelo"],
    colorImages: {
      "Moreno Iluminado": corMorenoIluminado,
      "Moreno Caramelo": corMorenoCaramelo,
    },
    priceBySize: priceTable(1350, 165),
  },
  {
    id: "cacheado",
    name: "Cabelo Brasileiro Cacheado",
    description: "Cachos definidos e volumosos, 100% natural e sem química.",
    image: cacheado,
    alt: "Mecha de cabelo brasileiro cacheado premium da Creative Hair",
    colors: ["Preto Natural", "Castanho Escuro"],
    colorImages: {
      "Preto Natural": corCacheadoPreto,
      "Castanho Escuro": corCacheadoCastanhoEscuro,
    },
    priceBySize: priceTable(1500, 190),
  },
];

export function getPrice(product: Product, size: Size, color: string): number {
  return product.priceBySize[size] + (product.colorSurcharge?.[color] ?? 0);
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
