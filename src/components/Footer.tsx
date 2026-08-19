import { CONTACT_EMAIL, WHATSAPP_NUMBER } from "@/lib/site-config";

export function Footer() {
  return (
    <footer id="contato" className="bg-primary py-16 text-primary-foreground lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-4 md:gap-12">
        <div className="space-y-6 md:col-span-2">
          {/* Espaço reservado para a logo da marca */}
          <div className="flex flex-col">
            <span className="font-serif text-2xl tracking-tight lg:text-3xl">CREATIVE HAIR</span>
            <span className="text-[8px] uppercase tracking-[0.4em] opacity-40">
              Premium Hair Brand
            </span>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-primary-foreground/60">
            Especialistas em extensões e mega hair 100% humanos, brasileiros, de doadora única e
            qualidade incomparável.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Menu</h2>
          <ul className="space-y-2 text-sm opacity-70">
            <li>
              <a href="#produtos">Produtos</a>
            </li>
            <li>
              <a href="#servicos">Serviços</a>
            </li>
            <li>
              <a href="#atacado">Atacado</a>
            </li>
            <li>
              <a href="#sobre">Sobre</a>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Contato</h2>
          <ul className="space-y-2 text-sm opacity-70">
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </li>
            <li>WhatsApp: {WHATSAPP_NUMBER}</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-7xl flex-col items-center gap-4 border-t border-primary-foreground/10 px-6 pt-8 md:flex-row md:justify-between">
        <span className="grid h-5 w-10 place-items-center rounded-sm bg-primary-foreground/10 text-[8px] italic opacity-60">
          PIX
        </span>
        <span className="text-[9px] uppercase tracking-widest opacity-30">
          © {new Date().getFullYear()} Creative Hair. Todos os direitos reservados.
        </span>
      </div>
    </footer>
  );
}
