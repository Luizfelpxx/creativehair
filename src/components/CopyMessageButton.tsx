import { useEffect, useState } from "react";
import { copyMessage } from "@/lib/site-config";

/** Copia a mensagem do WhatsApp (com tamanho e cor já incluídos) antes de abrir. */
export function CopyMessageButton({
  message,
  className = "",
  label = "Copiar mensagem",
  disabled = false,
}: {
  message: string;
  className?: string;
  label?: string;
  disabled?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return undefined;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={async () => {
        const ok = await copyMessage(message);
        setCopied(ok);
      }}
      className={`flex items-center justify-center gap-2 border border-border py-3 text-[10px] uppercase tracking-widest transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="size-3.5"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 7.5V5.25A1.5 1.5 0 0 1 9.75 3.75h9A1.5 1.5 0 0 1 20.25 5.25v9a1.5 1.5 0 0 1-1.5 1.5H16.5m-11.25-6h9a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5h-9a1.5 1.5 0 0 1-1.5-1.5v-9a1.5 1.5 0 0 1 1.5-1.5Z"
        />
      </svg>
      {copied ? "Copiado!" : label}
    </button>
  );
}
