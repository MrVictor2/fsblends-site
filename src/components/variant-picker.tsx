// src/components/variant-picker.tsx
"use client";

import * as React from "react";
import { productVariants, type Variant } from "@/data/variants";

type Props = {
  /** Product slug, e.g. "first-love" */
  slug: string;
  /** Called whenever a fully-resolved variant is selected. null if not yet resolvable. */
  onChange?: (variant: Variant | null) => void;
};

const SIZES: Variant["size"][] = ["6oz", "8oz", "10oz"];
const COLORS: Variant["color"][] = ["black", "white"];

export default function VariantPicker({ slug, onChange }: Props) {
  const variants = productVariants[slug] ?? [];

  if (variants.length === 0) {
    return <p className="text-sm text-orange-700">No variants configured for this product.</p>;
  }

  // Available option sets for this product
  const sizesAvailable = React.useMemo(
    () => Array.from(new Set(variants.map((v) => v.size))),
    [variants]
  );
  const colorsAvailable = React.useMemo(
    () => Array.from(new Set(variants.map((v) => v.color))),
    [variants]
  );

  // If only one concrete variant (or effectively one size and one color), hide pickers entirely.
  const hideAllPickers =
    variants.length === 1 || (sizesAvailable.length === 1 && colorsAvailable.length === 1);

  // Seed selection from first variant (will be coerced below if needed)
  const first = variants[0];
  const [size, setSize] = React.useState<Variant["size"] | "">((first?.size as Variant["size"]) ?? "");
  const [color, setColor] = React.useState<Variant["color"] | "">(
    (first?.color as Variant["color"]) ?? ""
  );

  // Coerce selection to a valid (size, color) whenever variants change
  React.useEffect(() => {
    if (hideAllPickers) {
      // Exactly one choice; lock to it.
      setSize(first?.size ?? "");
      setColor(first?.color ?? "");
      return;
    }

    // Ensure size is valid
    let nextSize: Variant["size"] | "" = size && sizesAvailable.includes(size) ? size : sizesAvailable[0] ?? "";

    // Ensure color is valid for that size
    const colorsForSize = variants.filter((v) => v.size === nextSize).map((v) => v.color);
    let nextColor: Variant["color"] | "" =
      colorsForSize.includes(color) ? color : (colorsForSize[0] ?? "");

    // Apply if changed
    if (nextSize !== size) setSize(nextSize);
    if (nextColor !== color) setColor(nextColor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variants, hideAllPickers]);

  // Compute currently selected variant (or null if unresolved)
  const selected: Variant | null = React.useMemo(() => {
    if (hideAllPickers) return variants[0] ?? null;
    if (!size || !color) return null;
    return variants.find((v) => v.size === size && v.color === color) ?? null;
  }, [variants, hideAllPickers, size, color]);

  // Bubble selection to parent
  React.useEffect(() => {
    onChange?.(selected ?? null);
  }, [selected, onChange]);

  // Formatter
  const formatPrice = (cents: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);

  // Handlers
  const handleSizeClick = (s: Variant["size"]) => {
    // Update size and pick the first valid color for this size
    setSize(s);
    const firstColorForSize =
      variants.find((v) => v.size === s)?.color ?? (colorsAvailable[0] as Variant["color"] | undefined);
    if (firstColorForSize) setColor(firstColorForSize);
  };

  const handleColorClick = (c: Variant["color"]) => {
    // Ensure the (size, color) pair exists; if not, choose the first size that supports this color
    if (!variants.some((v) => v.size === size && v.color === c)) {
      const firstSizeForColor = variants.find((v) => v.color === c)?.size;
      if (firstSizeForColor) setSize(firstSizeForColor);
    }
    setColor(c);
  };

  return (
    <div className="space-y-4">
      {/* Hide controls entirely when there is only one valid option */}
      {!hideAllPickers && (
        <>
          {/* Size selector */}
          <div>
            <div className="mb-1 text-sm font-medium text-brand-ink">Size</div>
            <div className="flex flex-wrap gap-2">
              {SIZES.filter((s) => sizesAvailable.includes(s)).map((s) => {
                const active = s === size;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleSizeClick(s)}
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

          {/* Color selector — only if more than one color exists for the product */}
          {colorsAvailable.length > 1 && (
            <div>
              <div className="mb-1 text-sm font-medium text-brand-ink">Container Color</div>
              <div className="flex flex-wrap gap-2">
                {COLORS.filter((c) => colorsAvailable.includes(c)).map((c) => {
                  // Gray-out colors not available for the chosen size
                  const availableForSize = variants.some((v) => v.size === size && v.color === c);
                  const active = c === color && availableForSize;
                  return (
                    <button
                      key={c}
                      type="button"
                      disabled={!availableForSize}
                      onClick={() => availableForSize && handleColorClick(c)}
                      className={[
                        "rounded-md border px-3 py-1.5 text-sm capitalize transition",
                        !availableForSize
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
        </>
      )}

      {/* Price preview */}
      {selected && (
        <div className="pt-2 text-sm text-brand-ink/90">
          <span className="font-medium">Price: </span>
          {formatPrice(selected.price)}
        </div>
      )}
    </div>
  );
}
