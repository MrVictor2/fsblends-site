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
  { name: "Frazer Fir",          notes: "Cypress • Fir • Lemon Peel • Evergreen",      type: "candle", collection: "classic",image: "/images/products/first-love-10oz.jpg", },
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
  { name: "Iced Mango Lassi", notes: "Mango",                    type: "candle", collection: "dessert" },
  { name: "Iced Coffee Era",  notes: "Coffee",                   type: "candle", collection: "dessert" },

  // --- Wax Melts (12 items mirroring Classic candles) ---
  // NOTE: `name` unique for slug safety; `displayName` preserves the classic label on cards
  { name: "First Love — Wax Melts",          displayName: "First Love",          notes: "Fresh Cut Roses • Sandalwood • Wild Rose",        type: "wax-melt" },
  { name: "Frazer Fir — Wax Melts",          displayName: "Frazer Fir",          notes: "Cypress • Fir • Lemon Peel • Evergreen",          type: "wax-melt" },
  { name: "Lavender Oasis — Wax Melts",      displayName: "Lavender Oasis",      notes: "Lavender • White Sage • Lemongrass",              type: "wax-melt" },
  { name: "Woodzy Spell — Wax Melts",        displayName: "Woodzy Spell",        notes: "Warm Mahogany • Earthy Wood",                     type: "wax-melt" },
  { name: "Jamaica Me Crazy — Wax Melts",    displayName: "Jamaica Me Crazy",    notes: "Orange • Pineapple • Coconut • Rum",              type: "wax-melt" },
  { name: "Sweet Citrus Medley — Wax Melts", displayName: "Sweet Citrus Medley", notes: "Mango • Gardenia • Blood Orange",                 type: "wax-melt" },
  { name: "Little Mystery 1 — Wax Melts",    displayName: "Little Mystery 1",    notes: "Smoke Oud • Amber Noir • Patchouli",              type: "wax-melt" },
  { name: "Precious Memories — Wax Melts",   displayName: "Precious Memories",   notes: "Black Violet • Geraniums • Saffron",              type: "wax-melt" },
  { name: "Fantasy Bouquet — Wax Melts",     displayName: "Fantasy Bouquet",     notes: "White Jasmine • Neroli • Honeysuckle",            type: "wax-melt" },
  { name: "Gourmet Treat — Wax Melts",       displayName: "Gourmet Treat",       notes: "Black Cardamom • Mahogany Shea • Vanilla",        type: "wax-melt" },
  { name: "Little Mystery 2 — Wax Melts",    displayName: "Little Mystery 2",    notes: "Oud • Turmeric • Saffron • Patchouli",            type: "wax-melt" },
  { name: "Little Mystery 3 — Wax Melts",    displayName: "Little Mystery 3",    notes: "Smoked Oud • Cedar • Sandalwood • Incense",       type: "wax-melt" },

  // --- Wax Sachets (12 items) ---
  { name: "Wax Sachet 01 Rose Garden",       notes: "Rose petals • Wardrobe fresh",      type: "wax-sachet" },
  { name: "Wax Sachet 02 Lavender Calm",     notes: "Lavender • Calm",                   type: "wax-sachet" },
  { name: "Wax Sachet 03 Citrus Breeze",     notes: "Lemon • Orange • Bright",           type: "wax-sachet" },
  { name: "Wax Sachet 04 Jasmine Night",     notes: "Jasmine • Soft florals",            type: "wax-sachet" },
  { name: "Wax Sachet 05 Ocean Linen",       notes: "Fresh linen • Sea salt",            type: "wax-sachet" },
  { name: "Wax Sachet 06 Cedarwood",         notes: "Cedar • Warm wood",                 type: "wax-sachet" },
  { name: "Wax Sachet 07 Garden Herb",       notes: "Basil • Mint • Green",              type: "wax-sachet" },
  { name: "Wax Sachet 08 Peony Bloom",       notes: "Peony • Spring bouquet",            type: "wax-sachet" },
  { name: "Wax Sachet 09 Vanilla Bean",      notes: "Vanilla • Cozy • Warm",             type: "wax-sachet" },
  { name: "Wax Sachet 10 Sandal Musk",       notes: "Sandalwood • Musk",                 type: "wax-sachet" },
  { name: "Wax Sachet 11 Golden Amber",      notes: "Amber • Smooth • Soft",             type: "wax-sachet" },
  { name: "Wax Sachet 12 Neroli Petals",     notes: "Neroli • Citrus blossom",           type: "wax-sachet" },

  // --- Handmade Beaded Bags (12 items) ---
  { name: "Beaded Bag 01 Meadow Tote",       notes: "Intricate beadwork • Durable",      type: "bag" },
  { name: "Beaded Bag 02 Pearl Mini",        notes: "Compact • Everyday carry",          type: "bag" },
  { name: "Beaded Bag 03 Coral Crossbody",   notes: "Statement bead pattern",             type: "bag" },
  { name: "Beaded Bag 04 Noir Evening",      notes: "Elegant • Night out",               type: "bag" },
  { name: "Beaded Bag 05 Terra Satchel",     notes: "Warm earth tones",                   type: "bag" },
  { name: "Beaded Bag 06 Azure Strand",      notes: "Ocean hues • Handwoven",            type: "bag" },
  { name: "Beaded Bag 07 Blossom Pouch",     notes: "Floral bead motif",                  type: "bag" },
  { name: "Beaded Bag 08 Sunburst Mini",     notes: "Bright • Travel friendly",          type: "bag" },
  { name: "Beaded Bag 09 Mosaic Tote",       notes: "Geometric pattern",                  type: "bag" },
  { name: "Beaded Bag 10 Honeycomb Sling",   notes: "Textured beadwork",                  type: "bag" },
  { name: "Beaded Bag 11 Orchid Carryall",   notes: "Roomy • Soft handles",               type: "bag" },
  { name: "Beaded Bag 12 Dune Micro",        notes: "Micro size • Delicate",              type: "bag" },

  // --- Handcrafted Clutches (12 items) ---
  { name: "Clutch 01 Evening Silk",          notes: "Handcrafted • Elegant",             type: "clutch" },
  { name: "Clutch 02 Pearl Accent",          notes: "Statement • Handmade",              type: "clutch" },
  { name: "Clutch 03 Woven Rattan",          notes: "Natural weave • Summer",            type: "clutch" },
  { name: "Clutch 04 Velvet Noir",           notes: "Soft velvet • Formal",              type: "clutch" },
  { name: "Clutch 05 Beaded Aurora",         notes: "Iridescent beads",                  type: "clutch" },
  { name: "Clutch 06 Metallic Gleam",        notes: "Gold-tone finish",                  type: "clutch" },
  { name: "Clutch 07 Minimal Fold",          notes: "Clean lines • Magnetic",            type: "clutch" },
  { name: "Clutch 08 Floral Embroidery",     notes: "Stitched florals • Romantic",       type: "clutch" },
  { name: "Clutch 09 Art Deco",              notes: "Geometric shell • Retro",           type: "clutch" },
  { name: "Clutch 10 Braided Leather",       notes: "Hand-braided detail",               type: "clutch" },
  { name: "Clutch 11 Satin Bow",             notes: "Soft satin • Bow clasp",            type: "clutch" },
  { name: "Clutch 12 Quartz Frame",          notes: "Hard frame • Gloss finish",         type: "clutch" },

  // --- Jewelry (12 items) ---
  { name: "Jewelry 01 Gold Hoop Set",        notes: "14k plated • Light",                type: "jewelry" },
  { name: "Jewelry 02 Minimal Pendant",      notes: "Everyday • Delicate",               type: "jewelry" },
  { name: "Jewelry 03 Pearl Stud Duo",       notes: "Classic • Timeless",                type: "jewelry" },
  { name: "Jewelry 04 Chain Bracelet",       notes: "Layering • Subtle shine",           type: "jewelry" },
  { name: "Jewelry 05 Signet Ring",          notes: "Minimal • Polished",                type: "jewelry" },
  { name: "Jewelry 06 Stacking Rings",       notes: "Set of 3 • Mix & match",            type: "jewelry" },
  { name: "Jewelry 07 Huggie Pair",          notes: "Small hoops • Secure",              type: "jewelry" },
  { name: "Jewelry 08 Lariat Necklace",      notes: "Y-drop • Elegant line",             type: "jewelry" },
  { name: "Jewelry 09 Cuff Bracelet",        notes: "Open cuff • Adjustable",            type: "jewelry" },
  { name: "Jewelry 10 Bar Necklace",         notes: "Horizontal bar • Minimal",          type: "jewelry" },
  { name: "Jewelry 11 Teardrop Earrings",    notes: "Sleek silhouette",                  type: "jewelry" },
  { name: "Jewelry 12 Threader Earrings",    notes: "Delicate thread-through",           type: "jewelry" },

  // --- Wax Melters (unchanged) ---
  { name: "Ceramic Wax Melter",         notes: "Electric warmer • Even heat",   type: "wax-melters" },
  { name: "Minimal Plug-In Wax Melter", notes: "Compact • Bedroom friendly",    type: "wax-melters" },
];

// Reuse everywhere so slugs are consistent
export const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/** Prefer this for routing, so wax melts get unique URLs */
export const productSlug = (p: Product) => p.slug ?? slugify(p.name);

/** Prefer this for UI so wax melts can show alternate labels if provided */
export const productDisplayName = (p: Product) => p.displayName ?? p.name;
