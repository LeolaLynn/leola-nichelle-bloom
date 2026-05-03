import { createContext, useContext, useMemo, useState, ReactNode } from "react";

export type CartItem = {
  id: string; // unique key per scent+size
  scent: string;
  collection: string;
  sizeLabel: string;
  sizeId: string;
  price: number;
  qty: number;
};

type CartCtx = {
  items: CartItem[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (item: Omit<CartItem, "id" | "qty"> & { qty: number }) => void;
  remove: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  subtotal: number;
  count: number;
};

const Ctx = createContext<CartCtx | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const add: CartCtx["add"] = (item) => {
    const id = `${item.scent}__${item.sizeId}`;
    setItems((prev) => {
      const existing = prev.find((p) => p.id === id);
      if (existing) {
        return prev.map((p) =>
          p.id === id ? { ...p, qty: p.qty + item.qty } : p
        );
      }
      return [...prev, { ...item, id }];
    });
    setIsOpen(true);
  };

  const remove = (id: string) =>
    setItems((prev) => prev.filter((p) => p.id !== id));

  const updateQty = (id: string, qty: number) =>
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, qty: Math.max(1, qty) } : p))
    );

  const subtotal = useMemo(
    () => items.reduce((s, i) => s + i.price * i.qty, 0),
    [items]
  );
  const count = useMemo(() => items.reduce((s, i) => s + i.qty, 0), [items]);

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
        subtotal,
        count,
      }}
    >
      {children}
    </Ctx.Provider>
  );
};

export const useCart = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
};
