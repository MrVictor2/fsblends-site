// src/data/products.ts
export type ProductType =
  | "candle"
  | "wax-melt"
  | "wax-sachet"
  | "wax-melters"
  | "bag"
  | "clutch"
  | "jewelry";

export type CandleCollection = "classic" | "dessert";

export type Product = {
  /** Internal name (should be unique for clean slugs) */
  name: string;
  /** What to show in UI. If omitted, fall back to name */
  displayName?: string;
  notes: string;
  type: ProductType;
  /** Candles only */
  collection?: CandleCollection;
  /** Optional image to use on grids/cards later */
  image?: string;
  /** Optional explicit slug override; if omitted, slug is derived from `name` */
  slug?: string;
};

// --- Candles (tagged into collections) ---
export const products: Product[] = [
  // CLASSIC collection (12 items)
  {
    name: "First Love",
    notes: "Fresh Cut Roses • Sandalwood • Wild Rose",
    type: "candle",
    collection: "classic",
    image: "/images/products/first-love-10oz.jpg",
  },
  { name: "Frazer Fir",          notes: "Cypress • Fir • Lemon Peel • Evergreen",      type: "candle", collection: "classic" },
  { name: "Lavender Oasis",      notes: "Lavender • White Sage • Lemongrass",          type: "candle", collection: "classic" },
  { name: "Woodzy Spell",        notes: "Warm Mahogany • Earthy Wood",                 type: "candle", collection: "classic" },
  { name: "Jamaica Me Crazy",    notes: "Orange • Pineapple • Coconut • Rum",          type: "candle", collection: "classic" },
  { name: "Sweet Citrus Medley", notes: "Mango • Gardenia • Blood Orange",             type: "candle", collection: "classic" },
  { name: "Little Mystery 1",    notes: "Smoke Oud • Amber Noir • Patchouli",          type: "candle", collection: "classic" },
  { name: "Precious Memories",   notes: "Black Violet • Geraniums • Saffron",          type: "candle", collection: "classic" },
  { name: "Fantasy Bouquet",     notes: "White Jasmine • Neroli • Honeysuckle",        type: "candle", collection: "classic" },
  { name: "Gourmet Treat",       notes: "Black Cardamom • Mahogany Shea • Vanilla",    type: "candle", collection: "classic" },
  { name: "Little Mystery 2",    notes: "Oud • Turmeric • Saffron • Patchouli",        type: "candle", collection: "classic" },
  { name: "Little Mystery 3",    notes: "Smoked Oud • Cedar • Sandalwood • Incense",   type: "candle", collection: "classic" },

  // DESSERT collection (3 items)
  { name: "Sheer Khurma",     notes: "Cardamom • Almond • Milk", type: "candle", collection: "dessert" },
  { name: "Iced Mango Lassi", notes: "Mango",                      type: "candle", collection: "dessert" },
  { name: "Iced Coffee Era",  notes: "Coffee",                     type: "candle", collection: "dessert" },

  // --- Wax Melts (12 items mirroring Classic candles) ---
  // NOTE: `name` is unique for slug safety; `displayName` preserves the classic label on cards
  { name: "First Love — Wax Melts",         displayName: "First Love",            notes: "Fresh Cut Roses • Sandalwood • Wild Rose",        type: "wax-melt" },
  { name: "Frazer Fir — Wax Melts",         displayName: "Frazer Fir",            notes: "Cypress • Fir • Lemon Peel • Evergreen",          type: "wax-melt" },
  { name: "Lavender Oasis — Wax Melts",     displayName: "Lavender Oasis",        notes: "Lavender • White Sage • Lemongrass",              type: "wax-melt" },
  { name: "Woodzy Spell — Wax Melts",       displayName: "Woodzy Spell",          notes: "Warm Mahogany • Earthy Wood",                     type: "wax-melt" },
  { name: "Jamaica Me Crazy — Wax Melts",   displayName: "Jamaica Me Crazy",      notes: "Orange • Pineapple • Coconut • Rum",              type: "wax-melt" },
  { name: "Sweet Citrus Medley — Wax Melts",displayName: "Sweet Citrus Medley",   notes: "Mango • Gardenia • Blood Orange",                 type: "wax-melt" },
  { name: "Little Mystery 1 — Wax Melts",   displayName: "Little Mystery 1",      notes: "Smoke Oud • Amber Noir • Patchouli",              type: "wax-melt" },
  { name: "Precious Memories - Wax Melts",  displayName: "Precious Memories",     notes: "Black Violet • Geraniums • Saffron",              type: "wax-melt" },
  { name: "Fantasy Bouquet - Wax Melts",    displayName: "Fantasy Bouquet",       notes: "White Jasmine • Neroli • Honeysuckle",            type: "wax-melt" },
  { name: "Gourmet Treat — Wax Melts",      displayName: "Gourmet Treat",         notes: "Black Cardamom • Mahogany Shea • Vanilla",        type: "wax-melt" },
  { name: "Little Mystery 2 - Wax Melts",   displayName: "Little Mystery 2",      notes: "Oud • Turmeric • Saffron • Patchouli",            type: "wax-melt" },
  { name: "Little Mystery 3 - Wax Melts",   displayName: "Little Mystery 3",      notes: "Smoked Oud • Cedar • Sandalwood • Incense",       type: "wax-melt" },

  // --- Wax Sachets ---
  { name: "Rose Wax Sachet",     notes: "Rose petals • Wardrobe fresh", type: "wax-sachet", },
  { name: "Lavender Wax Sachet", notes: "Lavender • Calm",              type: "wax-sachet", },

  // --- Bags ---
  { name: "Handmade Beaded Tote",  notes: "Intricate beadwork • Durable", type: "bag", },
  { name: "Mini Beaded Crossbody", notes: "Compact • Everyday carry",     type: "bag",},

  // --- Clutches ---
  { name: "Evening Clutch",      notes: "Handcrafted • Elegant",  type: "clutch" },
  { name: "Pearl Accent Clutch", notes: "Statement • Handmade",   type: "clutch", },

  // --- Jewelry ---
  { name: "Gold Hoop Earrings", notes: "14k plated • Light",    type: "jewelry", },
  { name: "Minimal Pendant",    notes: "Everyday • Delicate",   type: "jewelry",},

  // --- Wax Melters ---
  { name: "Ceramic Wax Melter",         notes: "Electric warmer • Even heat",   type: "wax-melters", },
  { name: "Minimal Plug-In Wax Melter", notes: "Compact • Bedroom friendly",    type: "wax-melters", },
];

// Reuse everywhere so slugs are consistent
export const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/** Prefer this for routing, so wax melts get unique URLs */
export const productSlug = (p: Product) => p.slug ?? slugify(p.name);

/** Prefer this for UI so wax melts still show the classic label */
export const productDisplayName = (p: Product) => p.displayName ?? p.name;
