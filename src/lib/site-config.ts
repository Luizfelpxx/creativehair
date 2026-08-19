/**
 * Configurações gerais da marca.
 * Altere o número de WhatsApp aqui — é usado em todo o site.
 */
export const WHATSAPP_NUMBER = "+5521999057833";
export const CONTACT_EMAIL = "eloandradede@gmail.com";
export const BRAND_NAME = "Creative Hair";

/** Monta o link do WhatsApp com a mensagem codificada em URL. */
export function whatsappLink(message: string): string {
  const digits = WHATSAPP_NUMBER.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

/** Abre o WhatsApp em uma nova aba. */
export function openWhatsapp(message: string): void {
  window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
}

export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
}
