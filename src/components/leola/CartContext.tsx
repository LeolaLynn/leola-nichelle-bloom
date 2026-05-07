import { createContext, useContext, useMemo, useState, ReactNode } from "react";
import { bundleDiscountPercent } from "./scents";

export type CartItem = {
  id: string;             // unique key per product+scent+size
  productId: string;      // body_oil | scrub | roll_on
  productName: string;    // e.g. "Cloud Whip Body Oil"
  scent: string;
  collection: string;
  sizeLabel: string;
  sizeId: string;
  priceCents: number;
  qty: number;
};

type CartCtx = {
  items: CartItem[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (item: Omit<CartItem, "id" | "qty"> & { qty?: number }) => void;
  remove: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
  subtotalCents: number;
  discountPercent: number;
  discountCents: number;
  totalCents: number;
  count: number;
};

const Ctx = createContext<CartCtx | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const add: CartCtx["add"] = (item) => {
    const qty = item.qty ?? 1;
    const id = `${item.productId}__${item.scent}__${item.sizeId}`;
    setItems((prev) => {
      const existing = prev.find((p) => p.id === id);
      if (existing) {
        return prev.map((p) =>
          p.id === id ? { ...p, qty: p.qty + qty } : p
        );
      }
      return [...prev, { ...item, qty, id }];
    });
    setIsOpen(true);
  };

  const remove = (id: string) =>
    setItems((prev) => prev.filter((p) => p.id !== id));

  const updateQty = (id: string, qty: number) =>
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, qty: Math.max(1, qty) } : p))
    );

  const subtotalCents = useMemo(
    () => items.reduce((s, i) => s + i.priceCents * i.qty, 0),
    [items]
  );
  const count = useMemo(() => items.reduce((s, i) => s + i.qty, 0), [items]);
  const discountPercent = useMemo(() => bundleDiscountPercent(count), [count]);
  const discountCents = Math.round((subtotalCents * discountPercent) / 100);
  const totalCents = subtotalCents - discountCents;

  return (
    <Ctx.Provider
      value={{
        items,
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
        add,
        remove,
        updateQty,
        clear: () => setItems([]),
        subtotalCents,
        discountPercent,
        discountCents,
        totalCents,
        count,
      }}
    >
      {children}
    </Ctx.Provider>
  );
};

export const useCart = () => {
  const c = useContext(Ctx);
  if (!c) {
    if (import.meta.env.DEV) {
      // Friendly dev guard: log the React owner stack so the offending
      // component is easy to find when CartProvider is missing.
      // eslint-disable-next-line no-console
      console.error(
        "[CartContext] useCart() was called outside <CartProvider>.\n" +
          "Make sure the component is rendered inside <RootLayout /> in App.tsx.\n" +
          "Component tree:",
        new Error("useCart call site").stack,
      );
    }
    throw new Error("useCart must be used inside CartProvider");
  }
  return c;
};
