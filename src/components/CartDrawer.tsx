import { PRODUCTS, SIZES, type Size } from "@/data/products";
import { itemPrice, useCart } from "@/hooks/use-cart";
import { formatBRL, openWhatsapp } from "@/lib/site-config";
import { renderTemplate, useSettings } from "@/lib/settings";
import { CopyMessageButton } from "./CopyMessageButton";

export function CartDrawer() {
  const cart = useCart();
  const settings = useSettings();

  if (!cart.isOpen) return null;

  const itens = cart.items
    .map((item) => {
      const product = PRODUCTS.find((p) => p.id === item.productId);
      return `- ${product?.name ?? item.productId}, ${item.size}, ${item.color} x${item.quantity} - ${formatBRL(
        itemPrice(item) * item.quantity,
      )}`;
    })
    .join("\n");

  const mensagem = renderTemplate(settings.checkoutTemplate, {
    itens,
    total: formatBRL(cart.subtotal),
  });

  return (
    <div className="fixed inset-0 z-100 flex justify-end">
      <button
        type="button"
        aria-label="Fechar carrinho"
        onClick={cart.close}
        className="absolute inset-0 bg-primary/40 backdrop-blur-sm"
      />

      <aside className="relative flex h-full w-full max-w-md flex-col bg-background shadow-2xl">
        <div className="flex items-center justify-between border-b border-border/40 p-6">
          <h2 className="font-serif text-2xl italic">Sacola</h2>
          <button
            type="button"
            onClick={cart.close}
            className="text-xs uppercase tracking-widest text-foreground/40"
          >
            Fechar
          </button>
        </div>

        <div className="flex-1 space-y-8 overflow-y-auto p-6">
          {cart.items.length === 0 && (
            <p className="text-sm text-foreground/50">Sua sacola está vazia.</p>
          )}

          {cart.items.map((item, index) => {
            const product = PRODUCTS.find((p) => p.id === item.productId);
            if (!product) return null;
            return (
              <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-4">
                <img
                  src={product.image}
                  alt={product.alt}
                  loading="lazy"
                  width={80}
                  height={96}
                  className="h-24 w-20 shrink-0 object-cover"
                />
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex justify-between gap-2 font-serif text-base">
                    <span className="min-w-0">{product.name}</span>
                    <span className="shrink-0">{formatBRL(itemPrice(item) * item.quantity)}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <select
                      aria-label="Tamanho"
                      value={item.size}
                      onChange={(event) => cart.updateSize(index, event.target.value as Size)}
                      className="border border-border bg-transparent px-2 py-1 text-[11px]"
                    >
                      {SIZES.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                    <select
                      aria-label="Cor"
                      value={item.color}
                      onChange={(event) => cart.updateColor(index, event.target.value)}
                      className="border border-border bg-transparent px-2 py-1 text-[11px]"
                    >
                      {product.colors.map((color) => (
                        <option key={color} value={color}>
                          {color}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex border border-border">
                      <button
                        type="button"
                        aria-label="Diminuir quantidade"
                        onClick={() => cart.updateQuantity(index, item.quantity - 1)}
                        className="px-3 py-1"
                      >
                        −
                      </button>
                      <span className="border-x border-border px-3 py-1 text-xs">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="Aumentar quantidade"
                        onClick={() => cart.updateQuantity(index, item.quantity + 1)}
                        className="px-3 py-1"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => cart.remove(index)}
                      className="text-[9px] uppercase tracking-widest text-destructive"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="space-y-5 border-t border-border/40 p-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-[0.2em]">Subtotal</span>
            <span className="font-serif text-2xl">{formatBRL(cart.subtotal)}</span>
          </div>
          <button
            type="button"
            onClick={() => openWhatsapp(mensagem)}
            disabled={cart.items.length === 0}
            className="w-full bg-primary py-5 text-[11px] font-bold uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-40"
          >
            Finalizar Pedido pelo WhatsApp
          </button>
          <CopyMessageButton
            message={mensagem}
            disabled={cart.items.length === 0}
            label="Copiar mensagem do pedido"
            className="w-full"
          />
          <p className="text-center text-[9px] uppercase tracking-widest text-foreground/40">
            Pagamento facilitado via Pix
          </p>
        </div>
      </aside>
    </div>
  );
}
