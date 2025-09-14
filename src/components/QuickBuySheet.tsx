// src/components/QuickBuySheet.tsx
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { slugify } from "@/data/products";
import { useCart } from "@/lib/cart";
import { productVariants, type Variant } from "@/data/variants";
import { AnimatePresence, motion } from "framer-motion";

// Types aligned with variants.ts
type CandleSize = "6oz" | "8oz" | "10oz";
type ContainerColor = "black" | "white";

type Selection = {
  size?: CandleSize;
  color?: ContainerColor;
};

type Props = {
  productName: string;
  trigger: React.ReactNode; // usually the "Buy now" <Button>
  defaultOpen?: boolean;
  onAdded?: () => void;
};

const SIZES: CandleSize[] = ["6oz", "8oz", "10oz"];
const COLORS: ContainerColor[] = ["black", "white"];

export default function QuickBuySheet({ productName, trigger, defaultOpen, onAdded }: Props) {
  const slug = slugify(productName);
  const rows: Variant[] = productVariants[slug] ?? [];

  const { setItems, openCart } = useCart();

  // available options
  const sizeSet = new Set<CandleSize>(rows.map((r) => r.size));
  const hasColor = rows.some((r) => !!r.color);

  // if only a single row exists, we can add instantly (no UI needed)
  const noChoicesRequired = rows.length === 1;

  // state
  const [open, setOpen] = React.useState(!!defaultOpen);
  const [qty, setQty] = React.useState(1);
  const [sel, setSel] = React.useState<Selection>(() => {
    const first = rows[0];
    return first ? { size: first.size as CandleSize, color: first.color as ContainerColor | undefined } : {};
  });

  // keep selection valid on product change
  React.useEffect(() => {
    const first = rows[0];
    if (!first) return;
    setSel((prev) => {
      const size = prev.size && sizeSet.has(prev.size) ? prev.size : (first.size as CandleSize);
      let color: ContainerColor | undefined = hasColor
        ? (rows.find((r) => r.size === size)?.color as ContainerColor | undefined)
        : undefined;

      // keep previous color if still valid for chosen size
      if (hasColor && prev.color && rows.some((r) => r.size === size && r.color === prev.color)) {
        color = prev.color;
      }
      return { size, color };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  // price preview
  const priceCents = React.useMemo(() => {
    if (!rows.length) return 3500;
    if (sel.size && hasColor && sel.color) {
      const found = rows.find((r) => r.size === sel.size && r.color === sel.color);
      if (found) return found.price;
    }
    if (sel.size && !hasColor) {
      const bySize = rows.find((r) => r.size === sel.size);
      if (bySize) return bySize.price;
    }
    return rows[0].price;
  }, [rows, sel.size, sel.color, hasColor]);

  const isReady = !!sel.size && (!hasColor || !!sel.color);

  const fmt = (cents: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format((cents || 0) / 100);

  // add to cart
  const addToCart = (finalSel: Selection, finalQty: number) => {
    const chosen =
      rows.find((r) =>
        hasColor ? r.size === finalSel.size && r.color === finalSel.color : r.size === finalSel.size
      ) ?? rows[0];

    const id = `${slug}-${chosen.size}-${chosen.color ?? "default"}`;

    setItems((prev) => {
      const next = [...prev];
      const i = next.findIndex((p) => p.id === id);
      if (i >= 0) {
        next[i] = { ...next[i], qty: (next[i].qty ?? 0) + finalQty };
      } else {
        next.push({
          id,
          name: productName,
          price: chosen.price,
          qty: finalQty,
          size: chosen.size,
          color: chosen.color,
        } as any);
      }
      return next;
    });

    openCart?.();
    onAdded?.();
  };

  // trigger behavior
  const onTriggerClick = (e: React.MouseEvent) => {
    e.preventDefault?.();
    e.stopPropagation?.();

    if (noChoicesRequired) {
      // instant add (e.g., single-variant products)
      const v = rows[0];
      if (v) addToCart({ size: v.size as CandleSize, color: v.color as ContainerColor | undefined }, 1);
      return;
    }
    setOpen(true);
  };

  const renderedTrigger = React.isValidElement(trigger)
    ? React.cloneElement(trigger as React.ReactElement<any>, {
        onClick: (e: React.MouseEvent) => {
          onTriggerClick(e);
          (trigger as any).props?.onClick?.(e);
        },
      })
    : (
        <button type="button" onClick={onTriggerClick}>
          {trigger}
        </button>
      );

  // click outside / esc to close
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (
        panelRef.current &&
        !panelRef.current.contains(t) &&
        wrapperRef.current &&
        !wrapperRef.current.contains(t)
      ) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={wrapperRef} className="relative block">
      {renderedTrigger}

      {/* compact mini-drawer INSIDE the card with smooth slide */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-label="Quick buy"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute bottom-16 left-3 right-3 z-[200] rounded-xl border bg-white p-3 shadow-xl ring-1 ring-black/5"
          >
            {/* Size (only if there are multiple sizes) */}
            {sizeSet.size > 1 && (
              <div>
                <div className="mb-1 text-xs font-medium text-brand-ink">Size</div>
                <div className="flex flex-wrap gap-1.5">
                  {SIZES.map((s) => {
                    const available = sizeSet.has(s);
                    const active = sel.size === s;

                    return (
                      <button
                        key={s}
                        type="button"
                        disabled={!available}
                        onClick={() =>
                          available &&
                          setSel((prev) => {
                            const nextColor = rows.find((r) => r.size === s)?.color as ContainerColor | undefined;
                            return { ...prev, size: s, color: hasColor ? nextColor : undefined };
                          })
                        }
                        className={[
                          "rounded-md border px-2.5 py-1 text-xs transition",
                          !available
                            ? "cursor-not-allowed border-dashed border-gray-300 bg-gray-50 text-gray-400"
                            : active
                            ? "border-brand-brown bg-brand-brown text-white"
                            : "border-gray-300 bg-white hover:bg-gray-50",
                        ].join(" ")}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Color (only when any color exists) */}
            {hasColor && sel.size && (
              <div className="mt-3">
                <div className="mb-1 text-xs font-medium text-brand-ink">Color</div>
                <div className="flex flex-wrap gap-1.5">
                  {COLORS.map((c) => {
                    const available = rows.some((r) => r.size === sel.size && r.color === c);
                    const active = sel.color === c;

                    return (
                      <button
                        key={c}
                        type="button"
                        disabled={!available}
                        onClick={() => available && setSel((prev) => ({ ...prev, color: c }))}
                        className={[
                          "rounded-md border px-2.5 py-1 text-xs capitalize transition",
                          !available
                            ? "cursor-not-allowed border-dashed border-gray-300 bg-gray-50 text-gray-400"
                            : active
                            ? "border-brand-brown bg-brand-brown text-white"
                            : "border-gray-300 bg-white hover:bg-gray-50",
                        ].join(" ")}
                      >
                        {c}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <Separator className="my-3" />

            {/* Qty + price */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <label htmlFor={`qty-${slug}`} className="text-xs text-brand-ink/90">
                  Qty
                </label>
                <input
                  id={`qty-${slug}`}
                  type="number"
                  min={1}
                  max={10}
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, Math.min(10, Number(e.target.value) || 1)))}
                  className="w-14 rounded-md border px-2 py-1 text-xs"
                />
              </div>

              <div className="text-xs text-brand-ink/90">
                <span className="font-medium">Price: </span>
                {fmt(priceCents)}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-3 flex gap-2">
              <Button
                onClick={() => isReady && addToCart(sel, qty)}
                disabled={!isReady}
                className="flex-1 rounded-md bg-brand-brown text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Add to cart
              </Button>
              <Button variant="outline" onClick={() => setOpen(false)} className="rounded-md px-3">
                Close
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
