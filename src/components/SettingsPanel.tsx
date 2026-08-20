import { useEffect, useState } from "react";
import {
  DEFAULT_SETTINGS,
  getSettings,
  resetSettings,
  saveSettings,
  type SiteSettings,
} from "@/lib/settings";

const FIELDS: {
  key: keyof SiteSettings;
  label: string;
  hint?: string;
  multiline?: boolean;
}[] = [
  { key: "whatsappNumber", label: "Número do WhatsApp", hint: "Formato: +5521999057833" },
  { key: "contactEmail", label: "E-mail comercial" },
  {
    key: "productTemplate",
    label: "Mensagem — Perguntar sobre produto",
    hint: "Use {produto} e {detalhes} (tamanho e cor escolhidos)",
    multiline: true,
  },
  {
    key: "wholesaleTemplate",
    label: "Mensagem — Atacado",
    hint: "Use {detalhes} (produto, tamanho e cor escolhidos)",
    multiline: true,
  },
  {
    key: "serviceTemplate",
    label: "Mensagem — Orçamento de serviço",
    hint: "Use {servico}",
    multiline: true,
  },
  {
    key: "checkoutTemplate",
    label: "Mensagem — Finalizar pedido",
    hint: "Use {itens} e {total}",
    multiline: true,
  },
];

function validate(values: SiteSettings): string {
  const digits = values.whatsappNumber.replace(/\D/g, "");
  if (digits.length < 12 || digits.length > 15) {
    return "Informe o WhatsApp com país e DDD, ex: +55 21 99905-7833.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.contactEmail)) {
    return "Informe um e-mail válido.";
  }
  if (
    !values.checkoutTemplate.includes("{itens}") ||
    !values.checkoutTemplate.includes("{total}")
  ) {
    return "A mensagem de pedido precisa conter {itens} e {total}.";
  }
  if (!values.productTemplate.includes("{produto}")) {
    return "A mensagem de produto precisa conter {produto}.";
  }
  if (!values.serviceTemplate.includes("{servico}")) {
    return "A mensagem de serviço precisa conter {servico}.";
  }
  return "";
}

export function SettingsPanel({ onClose }: { onClose: () => void }) {
  const [values, setValues] = useState<SiteSettings>(getSettings);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!saved) return undefined;
    const timer = setTimeout(() => setSaved(false), 2000);
    return () => clearTimeout(timer);
  }, [saved]);

  function handleSave() {
    const message = validate(values);
    setError(message);
    if (message) return;
    saveSettings(values);
    setSaved(true);
  }

  return (
    <div className="fixed inset-0 z-100 flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label="Fechar configurações"
        onClick={onClose}
        className="absolute inset-0 bg-primary/50 backdrop-blur-sm"
      />
      <div className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto bg-background p-6 shadow-2xl sm:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl">Configurações</h2>
            <p className="mt-1 text-xs text-foreground/50">
              Altere o WhatsApp e os textos padrão sem mexer no código.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-xs uppercase tracking-widest text-foreground/40"
          >
            Fechar
          </button>
        </div>

        <div className="space-y-5">
          {FIELDS.map((field) => (
            <label key={field.key} className="block">
              <span className="mb-2 block text-[9px] font-bold uppercase tracking-widest text-accent">
                {field.label}
              </span>
              {field.multiline ? (
                <textarea
                  rows={4}
                  value={values[field.key]}
                  onChange={(event) =>
                    setValues((v) => ({ ...v, [field.key]: event.target.value }))
                  }
                  className="w-full border border-border bg-transparent px-3 py-2 text-xs leading-relaxed focus:border-accent focus:outline-none"
                />
              ) : (
                <input
                  type="text"
                  value={values[field.key]}
                  onChange={(event) =>
                    setValues((v) => ({ ...v, [field.key]: event.target.value }))
                  }
                  className="w-full border border-border bg-transparent px-3 py-2 text-xs focus:border-accent focus:outline-none"
                />
              )}
              {field.hint && (
                <span className="mt-1 block text-[10px] text-foreground/45">{field.hint}</span>
              )}
            </label>
          ))}
        </div>

        {error && (
          <p className="mt-4 text-[10px] uppercase tracking-widest text-destructive">{error}</p>
        )}

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={handleSave}
            className="bg-primary py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-accent"
          >
            {saved ? "Salvo!" : "Salvar alterações"}
          </button>
          <button
            type="button"
            onClick={() => {
              resetSettings();
              setValues(DEFAULT_SETTINGS);
              setError("");
            }}
            className="border border-border py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors hover:bg-secondary"
          >
            Restaurar padrão
          </button>
        </div>
      </div>
    </div>
  );
}
