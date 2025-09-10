// src/lib/cart.tsx
"use client";
import * as React from "react";

type CartItem = {
  id: string;
  name: string;
  price: number;   // cents
  qty: number;
  image?: string;
};

type CartContextValue = {
  open: boolean;
  toggle: () => void;
  openCart: () => void;
  close: () => void;

  items: CartItem[];
  setItems: React.Dispatch<React.SetStateAction<CartItem[]>>;

  remove: (id: string) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;

  count: number;     // total units
  subtotal: number;  // cents
};

const CartContext = React.createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [items, setItems] = React.useState<CartItem[]>([]);
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem("fsblends:cart");
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {}
    // keep closed on initial mount
    setOpen(false);
  }, []);
  React.useEffect(() => {
    try {
      localStorage.setItem("fsblends:cart", JSON.stringify(items));
    } catch {}
  }, [items]);
  

  const toggle   = React.useCallback(() => setOpen(v => !v), []);
  const openCart = React.useCallback(() => setOpen(true), []);
  const close    = React.useCallback(() => setOpen(false), []);

  const remove = React.useCallback((id: string) => {
    setItems(prev => prev.filter(it => it.id !== id));
  }, []);

  const increment = React.useCallback((id: string) => {
    setItems(prev => prev.map(it => it.id === id ? { ...it, qty: it.qty + 1 } : it));
  }, []);

  const decrement = React.useCallback((id: string) => {
    setItems(prev => prev.flatMap(it => {
      if (it.id !== id) return [it];
      const nextQty = it.qty - 1;
      // if it drops to 0, remove the line
      return nextQty > 0 ? [{ ...it, qty: nextQty }] : [];
    }));
  }, []);

  const count    = React.useMemo(() => items.reduce((n, i) => n + i.qty, 0), [items]);
  const subtotal = React.useMemo(() => items.reduce((s, i) => s + i.qty * i.price, 0), [items]);

  React.useEffect(() => setOpen(false), []);

  const value: CartContextValue = {
    open, toggle, openCart, close,
    items, setItems,
    remove, increment, decrement,
    count, subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}
