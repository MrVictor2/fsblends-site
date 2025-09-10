// src/components/cart-drawer.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart";

function formatUSD(cents: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
}

export default function CartDrawer() {
  const { open, toggle, close, items = [], subtotal = 0, remove, increment, decrement } = useCart();

  // Close on ESC
  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && open) close();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden
        onClick={close}
        className={`fixed inset-0 z-[70] bg-black/30 transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-label="Shopping cart"
        className={`fixed right-0 top-0 z-[80] h-screen w-[92vw] max-w-md bg-white shadow-xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h2 className="text-lg font-semibold text-brand-ink">Your Cart</h2>
          <button
            onClick={toggle}
            className="rounded-md border px-2 py-1 text-sm hover:bg-brand-sand/60"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="max-h-[calc(100vh-210px)] overflow-auto px-5 py-4">
          {items.length === 0 ? (
            <p className="text-sm text-brand-ink/70">Your cart is empty.</p>
          ) : (
            <ul className="space-y-4">
              {items.map((it) => (
                <li
                  key={it.id}
                  className="grid grid-cols-[64px_1fr_auto] items-center gap-3 rounded-lg border p-2"
                >
                  {/* Thumb (optional) */}
                  {it.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={it.image}
                      alt=""
                      className="h-16 w-16 rounded bg-neutral-100 object-cover"
                    />
                  ) : (
                    <div className="h-16 w-16 rounded bg-neutral-100" />
                  )}

                  {/* Name + qty controls */}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-brand-ink">{it.name}</p>

                    <div className="mt-1 flex items-center gap-2">
                      <button
                        onClick={() => decrement(it.id)}
                        className="h-7 w-7 rounded-md border text-sm leading-7 hover:bg-brand-brown/10"
                        aria-label={`Decrease ${it.name} quantity`}
                        title="Minus"
                      >
                        –
                      </button>
                      <span className="w-8 text-center text-sm tabular-nums">{it.qty}</span>
                      <button
                        onClick={() => increment(it.id)}
                        className="h-7 w-7 rounded-md border text-sm leading-7 hover:bg-brand-brown/10"
                        aria-label={`Increase ${it.name} quantity`}
                        title="Plus"
                      >
                        +
                      </button>

                      <button
                        onClick={() => remove(it.id)}
                        className="ml-3 rounded-md border px-2 py-1 text-xs text-brand-ink hover:bg-brand-brown/10"
                        aria-label={`Remove ${it.name} from cart`}
                        title="Remove"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Line total */}
                  <p className="text-sm font-medium text-brand-ink">
                    {formatUSD(it.price * it.qty)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 border-t bg-white px-5 py-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-brand-ink/70">Subtotal</span>
            <span className="text-base font-semibold text-brand-ink">
              {formatUSD(subtotal)}
            </span>
          </div>
          <div className="flex gap-2">
            <Link
              href="/cart"
              onClick={close}
              className="flex-1 rounded-md border px-4 py-2 text-center text-sm hover:bg-brand-sand/60"
            >
              View Cart
            </Link>
            <Link
              href="/checkout"
              onClick={close}
              className="flex-1 rounded-md bg-brand-brown px-4 py-2 text-center text-sm text-white hover:opacity-90"
            >
              Checkout
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
