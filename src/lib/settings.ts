/**
 * Configurações editáveis pelo site (painel "Configurações" no rodapé).
 * Os valores ficam salvos no navegador e sobrescrevem os padrões abaixo.
 */
import { useSyncExternalStore } from "react";

export const HAIR_PRICE_SIZES = ["45cm", "55cm", "60cm", "65cm", "70cm", "75cm"] as const;
export type HairPriceSize = (typeof HAIR_PRICE_SIZES)[number];
export type HairPrices = Record<HairPriceSize, number>;
export type HairWeight = "100g" | "500g";

export const REAL_HAIR_PRICES: HairPrices = {
  "45cm": 422,
  "55cm": 624.8,
  "60cm": 716,
  "65cm": 797.2,
  "70cm": 878.4,
  "75cm": 979.8,
};

export const REAL_HAIR_PRICES_500G: HairPrices = {
  "45cm": 2110,
  "55cm": 3124,
  "60cm": 3580,
  "65cm": 3986,
  "70cm": 4392,
  "75cm": 4899,
};

export type SiteSettings = {
  whatsappNumber: string;
  contactEmail: string;
  /** Placeholders: {produto} {detalhes} */
  productTemplate: string;
  /** Placeholders: {produto} {detalhes} */
  wholesaleTemplate: string;
  /** Placeholders: {servico} */
  serviceTemplate: string;
  /** Placeholders: {itens} {total} */
  checkoutTemplate: string;
  /** Preços reais de 100g dos cabelos, por comprimento. */
  hairPrices: HairPrices;
  /** Preços reais de 500g dos cabelos, por comprimento. */
  hairPrices500g: HairPrices;
};

export const DEFAULT_SETTINGS: SiteSettings = {
  whatsappNumber: "+5521999057833",
  contactEmail: "eloandradede@gmail.com",
  productTemplate:
    "Olá! Vi o {produto}{detalhes} no site da Creative Hair e queria saber mais informações. Vocês têm disponível?",
  wholesaleTemplate:
    "Olá! Sou profissional/salão e gostaria de solicitar a tabela de preços de atacado da Creative Hair{detalhes}.",
  serviceTemplate:
    "Olá! Gostaria de solicitar um orçamento para o serviço de {servico} da Creative Hair.",
  checkoutTemplate:
    "Olá! Gostaria de finalizar meu pedido na Creative Hair:\n{itens}\nTotal: {total}\nVocês aceitam Pix? Podem confirmar disponibilidade e prazo de entrega?",
  hairPrices: REAL_HAIR_PRICES,
  hairPrices500g: REAL_HAIR_PRICES_500G,
};

const STORAGE_KEY = "creative-hair:settings";

let current: SiteSettings = DEFAULT_SETTINGS;
let hydrated = false;
const listeners = new Set<() => void>();

function readStorage(): SiteSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const saved = JSON.parse(raw) as Partial<SiteSettings>;
    return {
      ...DEFAULT_SETTINGS,
      ...saved,
      hairPrices: { ...REAL_HAIR_PRICES, ...saved.hairPrices },
      hairPrices500g: { ...REAL_HAIR_PRICES_500G, ...saved.hairPrices500g },
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function hydrate() {
  if (hydrated) return;
  hydrated = true;
  current = readStorage();
}

export function getSettings(): SiteSettings {
  hydrate();
  return current;
}

export function saveSettings(next: SiteSettings): void {
  hydrate();
  current = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* armazenamento indisponível */
  }
  listeners.forEach((listener) => listener());
}

export function resetSettings(): void {
  saveSettings(DEFAULT_SETTINGS);
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useSettings(): SiteSettings {
  return useSyncExternalStore(subscribe, getSettings, () => DEFAULT_SETTINGS);
}

/** Substitui os placeholders {chave} do template. */
export function renderTemplate(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_match, key: string) => vars[key] ?? "");
}

/** Texto " na cor X e tamanho Y" a partir da seleção do cliente. */
export function selectionDetails(size?: string, color?: string, weight?: HairWeight): string {
  if (size && color && weight) return ` na cor ${color}, tamanho ${size} e gramatura ${weight}`;
  if (size && color) return ` na cor ${color} e tamanho ${size}`;
  if (size && weight) return ` no tamanho ${size} e gramatura ${weight}`;
  if (color) return ` na cor ${color}`;
  if (size) return ` no tamanho ${size}`;
  return "";
}
