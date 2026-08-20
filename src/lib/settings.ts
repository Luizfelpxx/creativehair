/**
 * Configurações editáveis pelo site (painel "Configurações" no rodapé).
 * Os valores ficam salvos no navegador e sobrescrevem os padrões abaixo.
 */
import { useSyncExternalStore } from "react";

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
    return { ...DEFAULT_SETTINGS, ...(JSON.parse(raw) as Partial<SiteSettings>) };
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
export function selectionDetails(size?: string, color?: string): string {
  if (size && color) return ` na cor ${color} e tamanho ${size}`;
  if (color) return ` na cor ${color}`;
  if (size) return ` no tamanho ${size}`;
  return "";
}
