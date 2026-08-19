import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getPrice, PRODUCTS, type Size } from "@/data/products";

export type CartItem = {
  productId: string;
  size: Size;
  color: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (item: CartItem) => void;
  remove: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  updateSize: (index: number, size: Size) => void;
  updateColor: (index: number, color: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const key = (item: CartItem) => `${item.productId}|${item.size}|${item.color}`;

export function itemPrice(item: CartItem): number {
  const product = PRODUCTS.find((p) => p.id === item.productId);
  if (!product) return 0;
  return getPrice(product, item.size, item.color);
}

const STORAGE_KEY = "creative-hair:cart";

function readStoredCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    if (!Array.isArray(parsed)) return [];
    // Mantém apenas itens válidos (produto, tamanho e cor ainda existentes).
    return parsed.filter((item) => {
      const product = PRODUCTS.find((p) => p.id === item.productId);
      return Boolean(
        product &&
          product.colors.includes(item.color) &&
          item.size &&
          item.quantity > 0,
      );
    });
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Restaura a sacola salva no navegador (tamanho e cor incluídos).
  useEffect(() => {
    const stored = readStoredCart();
    if (stored.length > 0) setItems(stored);
  }, []);

  // Persiste a sacola a cada alteração.
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* armazenamento indisponível */
    }
  }, [items]);

  const add = useCallback((item: CartItem) => {
    setItems((current) => {
      const index = current.findIndex((i) => key(i) === key(item));
      const existing = index === -1 ? undefined : current[index];
      if (!existing) return [...current, item];
      const next = [...current];
      next[index] = { ...existing, quantity: existing.quantity + item.quantity };
      return next;
    });
    setIsOpen(true);
  }, []);


  const patch = useCallback((index: number, changes: Partial<CartItem>) => {
    setItems((current) =>
      current.map((item, i) => (i === index ? { ...item, ...changes } : item)),
    );
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const subtotal = items.reduce(
      (total, item) => total + itemPrice(item) * item.quantity,
      0,
    );
    return {
      items,
      count: items.reduce((total, item) => total + item.quantity, 0),
      subtotal,
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      add,
      remove: (index) =>
        setItems((current) => current.filter((_, i) => i !== index)),
      updateQuantity: (index, quantity) =>
        quantity < 1
          ? setItems((current) => current.filter((_, i) => i !== index))
          : patch(index, { quantity }),
      updateSize: (index, size) => patch(index, { size }),
      updateColor: (index, color) => patch(index, { color }),
    };
  }, [items, isOpen, add, patch]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart precisa estar dentro de CartProvider");
  return context;
}
