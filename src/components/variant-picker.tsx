// src/components/variant-picker.tsx
"use client";

import * as React from "react";
import { productVariants, type Variant } from "@/data/variants";

type Props = {
  slug: string;
  onChange?: (variant: Variant | null) => void;
};

const SIZES: Variant["size"][] = ["6oz", "8oz", "10oz"];
const COLORS: Variant["color"][] = ["black", "white"];

export default function VariantPicker({ slug, onChange }: Props) {
  const variants = productVariants[slug] ?? [];

  if (variants.length === 0) {
    return <p className="text-sm text-orange-700">No variants configured for this product.</p>;
  }

  // Determine available options
  const sizesAvailable = Array.from(new Set(variants.map(v => v.size)));
  const colorsAvailable = Array.from(new Set(variants.map(v => v.color)));

  // If there is exactly one variant OR effectively one size & one color, hide all pickers.
  const hideAllPickers =
    variants.length === 1 || (sizesAvailable.length === 1 && colorsAvailable.length === 1);

  // local selection state
  const [size, setSize] = React.useState<Variant["size"] | "">(
    (sizesAvailable[0] as Variant["size"]) ?? ""
  );
  const [color, setColor] = React.useState<Variant["color"] | "">(
    (colorsAvailable[0] as Variant["color"]) ?? ""
  );

  // current variant
  const selected: Variant | null = React.useMemo(() => {
    if (hideAllPickers) {
      return variants[0] ?? null;
    }
    if (!size || !color) return null;
    return variants.find(v => v.size === size && v.color === color) ?? null;
  }, [variants, hideAllPickers, size, color]);

  // bubble up
  React.useEffect(() => {
    onChange?.(selected ?? null);
  }, [selected, onChange]);

  // formatter
  const formatPrice = (cents: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);

  return (
    <div className="space-y-4">
      {/* Hide controls entirely when there is only one valid option */}
      {!hideAllPickers && (
        <>
          {/* Size selector */}
          <div>
            <div className="mb-1 text-sm font-medium text-brand-ink">Size</div>
            <div className="flex flex-wrap gap-2">
              {SIZES.filter(s => sizesAvailable.includes(s)).map(s => {
                const active = s === size;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={[
                      "rounded-md border px-3 py-1.5 text-sm transition",
                      active
                        ? "border-brand-brown bg-brand-brown text-white"
                        : "border-gray-300 bg-white hover:bg-gray-50",
                    ].join(" ")}
                  >
                    {s.replace("oz", " oz")}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color selector — only if more than one color */}
          {colorsAvailable.length > 1 && (
            <div>
              <div className="mb-1 text-sm font-medium text-brand-ink">Container Color</div>
              <div className="flex flex-wrap gap-2">
                {COLORS.filter(c => colorsAvailable.includes(c)).map(c => {
                  const active = c === color;
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setColor(c)}
                      className={[
                        "rounded-md border px-3 py-1.5 text-sm capitalize transition",
                        active
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
        </>
      )}

      {/* Price */}
      {selected && (
        <div className="pt-2 text-sm text-brand-ink/90">
          <span className="font-medium">Price: </span>
          {formatPrice(selected.price)}
        </div>
      )}
    </div>
  );
}
