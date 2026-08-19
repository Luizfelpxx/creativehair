/**
 * Configurações gerais da marca.
 * O número de WhatsApp e os textos padrão podem ser alterados direto no site,
 * no painel "Configurações" do rodapé (ver src/lib/settings.ts).
 */
import { getSettings } from "./settings";

export const BRAND_NAME = "Creative Hair";

export function whatsappNumber(): string {
  return getSettings().whatsappNumber;
}

export function contactEmail(): string {
  return getSettings().contactEmail;
}

/** Monta o link do WhatsApp com a mensagem codificada em URL. */
export function whatsappLink(message: string): string {
  const digits = whatsappNumber().replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

/** Abre o WhatsApp em uma nova aba. */
export function openWhatsapp(message: string): void {
  window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
}

/** Copia a mensagem para a área de transferência. */
export async function copyMessage(message: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(message);
    return true;
  } catch {
    return false;
  }
}

export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
}
