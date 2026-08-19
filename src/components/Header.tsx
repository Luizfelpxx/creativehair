import { useState } from "react";
import { useCart } from "@/hooks/use-cart";

const LINKS = [
  { href: "#inicio", label: "Início" },
  { href: "#produtos", label: "Produtos" },
  { href: "#servicos", label: "Serviços" },
  { href: "#atacado", label: "Atacado" },
  { href: "#sobre", label: "Sobre" },
  { href: "#contato", label: "Contato" },
];

export function Header() {
  const { count, open } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/85 backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 md:px-6 lg:h-20 lg:py-0">
        <div className="hidden lg:flex lg:gap-8 lg:text-[11px] lg:font-medium lg:uppercase lg:tracking-[0.2em]">
          {LINKS.slice(0, 3).map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-accent">
              {link.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          aria-label="Abrir menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="flex shrink-0 flex-col gap-1.5 p-2 lg:hidden"
        >
          <span className="h-px w-5 bg-foreground" />
          <span className="h-px w-5 bg-foreground" />
        </button>

        {/* Espaço reservado para a logo da marca */}
        <a href="#inicio" className="flex min-w-0 flex-col items-center justify-center text-center">
          <span className="font-serif text-lg font-bold tracking-tight sm:text-2xl">
            CREATIVE HAIR
          </span>
          <span className="-mt-0.5 text-[7px] uppercase tracking-[0.35em] opacity-60 sm:text-[8px] sm:tracking-[0.4em]">
            Premium Extensions
          </span>
        </a>

        <div className="flex shrink-0 items-center gap-6">
          <div className="hidden lg:flex lg:gap-6 lg:text-[11px] lg:font-medium lg:uppercase lg:tracking-[0.2em]">
            {LINKS.slice(4).map((link) => (
              <a key={link.href} href={link.href} className="transition-colors hover:text-accent">
                {link.label}
              </a>
            ))}
          </div>
          <button
            type="button"
            onClick={open}
            aria-label={`Abrir carrinho (${count} itens)`}
            className="relative p-2"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="size-6"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5M4.5 8.25h15l-1 12.25H5.5L4.5 8.25Z"
              />
            </svg>
            {count > 0 && (
              <span className="absolute right-0 top-0 grid size-4 place-items-center rounded-full bg-accent text-[9px] font-bold text-accent-foreground">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-border/40 bg-background px-6 py-4 lg:hidden">
          <ul className="flex flex-col gap-4 text-[11px] font-medium uppercase tracking-[0.2em]">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
