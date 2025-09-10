// src/data/variants.ts

export type Variant = {
  id: string;                     // unique per variant
  size: "6oz" | "8oz" | "10oz";
  color: "black" | "white";
  price: number;                  // in cents
  image?: string;                 // optional image path
};

// Unified price table (in cents)
const PRICE_6 = 2200;  // $22
const PRICE_8 = 2800;  // $28
const PRICE_10 = 3500; // $35

/**
 * Map: product slug -> array of variants
 * Regular products have 6/8/10 oz in black & white.
 * Special products (iced-mango-lassi, sheer-khurma, iced-coffee-era) still use the same size pricing.
 */
export const productVariants: Record<string, Variant[]> = {
  // Example fully-configured product:
  "gourmet-treat": [
    { id: "gourmet-6-b",  size: "6oz",  color: "black", price: PRICE_6 },
    { id: "gourmet-6-w",  size: "6oz",  color: "white", price: PRICE_6 },
    { id: "gourmet-8-b",  size: "8oz",  color: "black", price: PRICE_8 },
    { id: "gourmet-8-w",  size: "8oz",  color: "white", price: PRICE_8 },
    { id: "gourmet-10-b", size: "10oz", color: "black", price: PRICE_10 },
    { id: "gourmet-10-w", size: "10oz", color: "white", price: PRICE_10 },
  ],
  "first-love": [
    { id: "firstlove-6-b",  size: "6oz",  color: "black", price: 2200 },
    { id: "firstlove-6-w",  size: "6oz",  color: "white", price: 2200 },
    { id: "firstlove-8-b",  size: "8oz",  color: "black", price: 2800 },
    { id: "firstlove-8-w",  size: "8oz",  color: "white", price: 2800 },
    { id: "firstlove-10-b", size: "10oz", color: "black", price: 3500 },
    { id: "firstlove-10-w", size: "10oz", color: "white", price: 3500 },
  ],

  "frazer-fir": [
    { id: "frazerfir-6-b",  size: "6oz",  color: "black", price: 2200 },
    { id: "frazerfir-6-w",  size: "6oz",  color: "white", price: 2200 },
    { id: "frazerfir-8-b",  size: "8oz",  color: "black", price: 2800 },
    { id: "frazerfir-8-w",  size: "8oz",  color: "white", price: 2800 },
    { id: "frazerfir-10-b", size: "10oz", color: "black", price: 3500 },
    { id: "frazerfir-10-w", size: "10oz", color: "white", price: 3500 },
  ],
  "lavender-oasis": [
    { id: "lavender-6-b",  size: "6oz",  color: "black", price: 2200 },
    { id: "lavender-6-w",  size: "6oz",  color: "white", price: 2200 },
    { id: "lavender-8-b",  size: "8oz",  color: "black", price: 2800 },
    { id: "lavender-8-w",  size: "8oz",  color: "white", price: 2800 },
    { id: "lavender-10-b", size: "10oz", color: "black", price: 3500 },
    { id: "lavender-10-w", size: "10oz", color: "white", price: 3500 },
  ],

  "woodzy-spell": [
    { id: "woodzy-6-b",  size: "6oz",  color: "black", price: 2200 },
    { id: "woodzy-6-w",  size: "6oz",  color: "white", price: 2200 },
    { id: "woodzy-8-b",  size: "8oz",  color: "black", price: 2800 },
    { id: "woodzy-8-w",  size: "8oz",  color: "white", price: 2800 },
    { id: "woodzy-10-b", size: "10oz", color: "black", price: 3500 },
    { id: "woodzy-10-w", size: "10oz", color: "white", price: 3500 },
  ],
  "jamaica-me-crazy": [
    { id: "jamaica-6-b",  size: "6oz",  color: "black", price: 2200 },
    { id: "jamaica-6-w",  size: "6oz",  color: "white", price: 2200 },
    { id: "jamaica-8-b",  size: "8oz",  color: "black", price: 2800 },
    { id: "jamaica-8-w",  size: "8oz",  color: "white", price: 2800 },
    { id: "jamaica-10-b", size: "10oz", color: "black", price: 3500 },
    { id: "jamaica-10-w", size: "10oz", color: "white", price: 3500 },
  ],

  "sweet-citrus-medley": [
    { id: "citrus-6-b",  size: "6oz",  color: "black", price: 2200 },
    { id: "citrus-6-w",  size: "6oz",  color: "white", price: 2200 },
    { id: "citrus-8-b",  size: "8oz",  color: "black", price: 2800 },
    { id: "citrus-8-w",  size: "8oz",  color: "white", price: 2800 },
    { id: "citrus-10-b", size: "10oz", color: "black", price: 3500 },
    { id: "citrus-10-w", size: "10oz", color: "white", price: 3500 },
  ],
  "little-mystery-1": [
    { id: "lm1-6-b",  size: "6oz",  color: "black", price: 2200 },
    { id: "lm1-6-w",  size: "6oz",  color: "white", price: 2200 },
    { id: "lm1-8-b",  size: "8oz",  color: "black", price: 2800 },
    { id: "lm1-8-w",  size: "8oz",  color: "white", price: 2800 },
    { id: "lm1-10-b", size: "10oz", color: "black", price: 3500 },
    { id: "lm1-10-w", size: "10oz", color: "white", price: 3500 },
  ],

  "precious-memories": [
    { id: "memories-6-b",  size: "6oz",  color: "black", price: 2200 },
    { id: "memories-6-w",  size: "6oz",  color: "white", price: 2200 },
    { id: "memories-8-b",  size: "8oz",  color: "black", price: 2800 },
    { id: "memories-8-w",  size: "8oz",  color: "white", price: 2800 },
    { id: "memories-10-b", size: "10oz", color: "black", price: 3500 },
    { id: "memories-10-w", size: "10oz", color: "white", price: 3500 },
  ],
"fantasy-bouquet": [
    { id: "fantasy-6-b",  size: "6oz",  color: "black", price: 2200 },
    { id: "fantasy-6-w",  size: "6oz",  color: "white", price: 2200 },
    { id: "fantasy-8-b",  size: "8oz",  color: "black", price: 2800 },
    { id: "fantasy-8-w",  size: "8oz",  color: "white", price: 2800 },
    { id: "fantasy-10-b", size: "10oz", color: "black", price: 3500 },
    { id: "fantasy-10-w", size: "10oz", color: "white", price: 3500 },
  ],

  /// Iced Mango Lassi — one variant only (no size/color choices shown to shopper)
"iced-mango-lassi": [
  { id: "mango-10", size: "10oz", color: "white", price: 3500 },
],

// Sheer Khurma — one variant only
"sheer-khurma": [
  { id: "khurma-10", size: "10oz", color: "white", price: 3500 },
],

// Iced Coffee Era — one variant only
"iced-coffee-era": [
  { id: "coffee-10", size: "10oz", color: "black", price: 3500 },
],
};
