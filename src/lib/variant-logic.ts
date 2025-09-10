// src/lib/variant-logic.ts
import { productVariants, type Variant, type CandleSize, type ContainerColor } from "@/data/variants";

export type Selection = {
  size?: CandleSize;
  container?: ContainerColor;
};

/** Does this product (by slug) have a container option at all? */
export function hasContainer(slug: string): boolean {
  const rows = productVariants[slug] ?? [];
  return rows.some(v => v.container !== undefined);
}

/** First in-stock variant becomes the default selection */
export function firstValidSelection(slug: string): Selection {
  const rows = productVariants[slug] ?? [];
  if (rows.length === 0) return {};
  const first = rows.find(v => v.inStock) ?? rows[0];
  return { size: first.size, container: first.container };
}

/** Find the concrete variant matching a selection (if valid) */
export function findVariant(slug: string, sel: Selection): Variant | undefined {
  const rows = productVariants[slug] ?? [];
  return rows.find(v =>
    v.inStock &&
    v.size === sel.size &&
    (
      // match container exactly, or both undefined for exception products
      (v.container === sel.container) ||
      (v.container === undefined && sel.container === undefined)
    )
  );
}

/** Which sizes are selectable given the current (partial) selection? */
export function validSizes(slug: string, sel: Selection): Record<CandleSize, boolean> {
  const rows = productVariants[slug] ?? [];
  const map: Record<CandleSize, boolean> = { "6 oz": false, "8 oz": false, "10 oz": false };

  for (const row of rows) {
    if (!row.inStock) continue;
    if (sel.container && row.container && row.container !== sel.container) continue;
    map[row.size] = true;
  }

  return map;
}

/** Which containers are selectable given the current (partial) selection? */
export function validContainers(slug: string, sel: Selection): Record<ContainerColor, boolean> {
  const rows = productVariants[slug] ?? [];
  const map: Record<ContainerColor, boolean> = { Black: false, White: false };

  if (!hasContainer(slug)) return map; // product doesn’t use container

  for (const row of rows) {
    if (!row.inStock) continue;
    if (sel.size && row.size !== sel.size) continue;
    if (row.container) map[row.container] = true;
  }

  return map;
}


/** Which containers are selectable given the current (partial) selection? */
export function validContainers(slug: string, sel: Selection): Record<ContainerColor, boolean> {
  const rows = productVariants[slug] ?? [];
  const map: Record<ContainerColor, boolean> = { Black: false, White: false };

  if (!hasContainer(slug)) {
    // no container dimension for this product (exceptions)
    return map;
  }

  for (const c of ["Black", "White"] as ContainerColor[]) {
    map[c] = rows.some(v =>
      v.inStock &&
      (sel.size ? v.size === sel.size : true) &&
      v.container === c
    );
  }
  return map;
}

/** Keep selection valid; if not valid, coerce to nearest valid combo */
export function coerceSelection(slug: string, sel: Selection): Selection {
  // If current selection yields a valid variant, keep it
  if (findVariant(slug, sel)) return sel;

  // If size is chosen, try to fix container to any valid one for that size
  if (sel.size) {
    const rows = productVariants[slug] ?? [];
    const cands = rows.filter(v => v.inStock && v.size === sel.size);
    if (cands.length) {
      return { size: sel.size, container: cands[0].container };
    }
  }

  // Fallback to first valid default
  return firstValidSelection(slug);
}
