"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";
import { getProduct, type Product } from "./data";

export type CartLine = { slug: string; qty: number };

type CartContextValue = {
  lines: CartLine[];
  ready: boolean;
  count: number;
  subtotal: number;
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  items: { product: Product; qty: number }[];
};

const CartContext = createContext<CartContextValue | null>(null);
const KEY = "usagi-cart";
const EVENT = "usagi-cart";
const EMPTY: CartLine[] = [];

let cachedRaw: string | null = null;
let cachedLines: CartLine[] = EMPTY;

function parse(raw: string | null): CartLine[] {
  if (!raw) return EMPTY;
  try {
    const parsed = JSON.parse(raw) as CartLine[];
    if (!Array.isArray(parsed)) return EMPTY;
    const lines = parsed.filter((l) => l.slug && l.qty > 0);
    return lines.length === 0 ? EMPTY : lines;
  } catch {
    return EMPTY;
  }
}

function read(): CartLine[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw === cachedRaw) return cachedLines;
    cachedRaw = raw;
    cachedLines = parse(raw);
    return cachedLines;
  } catch {
    return EMPTY;
  }
}

function getServerSnapshot(): CartLine[] {
  return EMPTY;
}

function write(lines: CartLine[]) {
  const next = lines.filter((l) => l.qty > 0);
  cachedLines = next.length === 0 ? EMPTY : next;
  cachedRaw = JSON.stringify(cachedLines);
  localStorage.setItem(KEY, cachedRaw);
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

function clientTrue() {
  return true;
}

function serverFalse() {
  return false;
}

function subscribeReady() {
  return () => {};
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const ready = useSyncExternalStore(subscribeReady, clientTrue, serverFalse);
  const lines = useSyncExternalStore(subscribe, read, getServerSnapshot);

  const add = useCallback((slug: string, qty = 1) => {
    const prev = read();
    const found = prev.find((l) => l.slug === slug);
    write(
      found
        ? prev.map((l) => (l.slug === slug ? { ...l, qty: l.qty + qty } : l))
        : [...prev, { slug, qty }],
    );
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    const prev = read();
    write(qty <= 0 ? prev.filter((l) => l.slug !== slug) : prev.map((l) => (l.slug === slug ? { ...l, qty } : l)));
  }, []);

  const remove = useCallback((slug: string) => {
    write(read().filter((l) => l.slug !== slug));
  }, []);

  const clear = useCallback(() => write([]), []);

  const value = useMemo(() => {
    const items = lines
      .map((l) => {
        const product = getProduct(l.slug);
        return product ? { product, qty: l.qty } : null;
      })
      .filter((x): x is { product: Product; qty: number } => x !== null);
    const count = items.reduce((n, i) => n + i.qty, 0);
    const subtotal = items.reduce((n, i) => n + i.product.price * i.qty, 0);
    return { lines, ready, count, subtotal, add, setQty, remove, clear, items };
  }, [lines, ready, add, setQty, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart needs CartProvider");
  return ctx;
}
