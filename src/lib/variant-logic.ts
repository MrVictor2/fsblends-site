// src/lib/variant-logic.ts
import { productVariants, type Variant } from "@/data/variants";

/** Keep these EXACTLY in sync with src/data/variants.ts */
export type CandleSize = "6oz" | "8oz" | "10oz";
export type ContainerColor = "black" | "white";

export type Selection = {
  size?: CandleSize;
  container?: ContainerColor;
};

/** Does this product (by slug) have a container option at all? */
export function hasContainer(slug: string): boolean {
  const rows = productVariants[slug] ?? [];
  // If any variant has a color key, we consider container active
  return rows.some(v => typeof v.color !== "undefined");
}

/** First in-stock (or first) variant becomes the default selection */
export function firstValidSelection(slug: string): Selection {
  const rows = productVariants[slug] ?? [];
  if (rows.length === 0) return {};
  const first = rows[0];
  return { size: first.size, container: first.color };
}

/** Find the concrete variant matching a selection (if valid) */
export function findVariant(slug: string, sel: Selection): Variant | undefined {
  const rows = productVariants[slug] ?? [];
  return rows.find(v =>
    (sel.size ? v.size === sel.size : true) &&
    (typeof v.color === "undefined" || typeof sel.container === "undefined"
      ? true
      : v.color === sel.container)
  );
}

/** Which sizes are selectable given the current (partial) selection? */
export function validSizes(slug: string, sel: Selection): Record<CandleSize, boolean> {
  const rows = productVariants[slug] ?? [];
  const map: Record<CandleSize, boolean> = { "6oz": false, "8oz": false, "10oz": false };

  for (const row of rows) {
    // if user picked a container, only allow sizes that exist with that container
    if (sel.container && typeof row.color !== "undefined" && row.color !== sel.container) continue;
    map[row.size] = true;
  }
  return map;
}

/** Which containers are selectable given the current (partial) selection? */
export function validContainers(slug: string, sel: Selection): Record<ContainerColor, boolean> {
  const rows = productVariants[slug] ?? [];
  const map: Record<ContainerColor, boolean> = { black: false, white: false };

  if (!hasContainer(slug)) return map;

  for (const row of rows) {
    if (sel.size && row.size !== sel.size) continue;
    if (typeof row.color !== "undefined") map[row.color] = true;
  }
  return map;
}

/** Keep selection valid; if not valid, coerce to nearest valid combo */
export function coerceSelection(slug: string, sel: Selection): Selection {
  // If current selection yields a valid variant, keep it
  if (findVariant(slug, sel)) return sel;

  const rows = productVariants[slug] ?? [];
  if (rows.length === 0) return {};

  // If size is chosen, try to fix container to any valid one for that size
  if (sel.size) {
    const cands = rows.filter(v => v.size === sel.size);
    if (cands.length) {
      return { size: sel.size, container: cands[0].color };
    }
  }

  // Fallback to first available
  const first = rows[0];
  return { size: first.size, container: first.color };
}
