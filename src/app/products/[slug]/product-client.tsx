// src/app/products/[slug]/product-client.tsx
"use client";

import * as React from "react";
import Image from "next/image";
import VariantPicker from "@/components/variant-picker";
import { useCart } from "@/lib/cart";
import { productVariants, type Variant } from "@/data/variants";

export default function ProductClient({
  slug,
  name,
  notes,
}: {
  slug: string;
  name: string;
  notes: string;
}) {
  const { setItems, openCart } = useCart();
  const [variant, setVariant] = React.useState<Variant | null>(null);
  const [qty, setQty] = React.useState<number>(1);

  const heroImg =
    productVariants[slug]?.[0]?.image ?? "/hero-candle.jpg";

  // Show a gentle message if variants aren't configured yet
  const variants = productVariants[slug] ?? [];
  if (variants.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-2xl font-semibold">{name}</h1>
        {notes && <p className="mt-2 text-brand-ink/80">{notes}</p>}
        <p className="mt-6 text-orange-700">
          No variants configured yet for “{slug}”.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-10 md:grid-cols-2">
      {/* IMAGE */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl border">
        <Image src={heroImg} alt={name} fill className="object-cover" priority />
      </div>

      {/* DETAILS */}
      <div>
        <h1 className="text-2xl font-semibold text-brand-ink">{name}</h1>
        {notes && <p className="mt-2 text-brand-ink/80">{notes}</p>}

        <div className="mt-6">
          <VariantPicker slug={slug} onChange={setVariant} />
        </div>

        {/* Qty + Add to cart */}
        <div className="mt-6 flex items-center gap-3">
          <label className="text-sm text-brand-ink/90" htmlFor="qty">
            Qty
          </label>
          <input
            id="qty"
            type="number"
            min={1}
            max={10}
            value={qty}
            onChange={(e) =>
              setQty(Math.max(1, Math.min(10, Number(e.target.value) || 1)))
            }
            className="w-16 rounded-md border px-2 py-1"
          />

          <button
            disabled={!variant}
            onClick={() => {
              if (!variant) return;
              setItems((prev) => {
                const next = [...prev];
                const i = next.findIndex((p) => p.id === variant.id);
                if (i >= 0) {
                  next[i] = { ...next[i], qty: next[i].qty + qty };
                } else {
                  next.push({
                    id: variant.id,
                    name,
                    price: variant.price, // cents
                    qty,
                    image: heroImg,
                  });
                }
                return next;
              });
              openCart();
            }}
            className={[
              "ml-2 rounded-md px-5 py-2 text-sm font-medium transition",
              variant
                ? "bg-brand-brown text-white hover:opacity-90"
                : "bg-gray-300 text-gray-600 cursor-not-allowed",
            ].join(" ")}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
