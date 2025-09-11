// src/data/products.ts
export type ProductType =
  | "candle"
  | "wax-melt"
  | "wax-sachet"
  | "wax-melters"   // ← add this
  | "bag"
  | "clutch"
  | "jewelry";


export type CandleCollection = "classic" | "dessert";

export type Product = {
  name: string;
  notes: string;
  type: ProductType;
  /** Candles only */
  collection?: CandleCollection;
  /** Optional image to use on grids/cards later */
  image?: string;
};

// --- Candles (tagged into collections) ---
export const products: Product[] = [
  // CLASSIC collection (all candles except the 3 desserts)
  { name: "First Love",            notes: "Fresh Cut Roses • Sandalwood • Wild Rose",        type: "candle", collection: "classic", 
    image: "/images/products/first-love-10oz.jpg",
  },
  
  { name: "Frazer Fir",            notes: "Cypress • Fir • Lemon Peel • Evergreen",          type: "candle", collection: "classic" },
  { name: "Lavender Oasis",        notes: "Lavender • White Sage • Lemongrass",              type: "candle", collection: "classic" },
  { name: "Woodzy Spell",          notes: "Warm Mahogany • Earthy Wood",                     type: "candle", collection: "classic" },
  { name: "Jamaica Me Crazy",      notes: "Orange • Pineapple • Coconut • Rum",              type: "candle", collection: "classic" },
  { name: "Sweet Citrus Medley",   notes: "Mango • Gardenia • Blood Orange",                 type: "candle", collection: "classic" },
  { name: "Little Mystery 1",      notes: "Smoke Oud • Amber Noir • Patchouli",              type: "candle", collection: "classic" },
  { name: "Precious Memories",     notes: "Black Violet • Geraniums • Saffron",              type: "candle", collection: "classic" },
  { name: "Fantasy Bouquet",       notes: "White Jasmine • Neroli • Honeysuckle",            type: "candle", collection: "classic" },
  { name: "Gourmet Treat",         notes: "Black Cardamom • Mahogany Shea • Vanilla",        type: "candle", collection: "classic" },
  { name: "Little Mystery 2",      notes: "Oud • Turmeric • Saffron • Patchouli",            type: "candle", collection: "classic" },
  { name: "Little Mystery 3",      notes: "Smoked Oud • Cedar • Sandalwood • Incense",       type: "candle", collection: "classic" },

  // DESSERT collection (the 3 you called out)
  { name: "Sheer Khurma",          notes: "Cardamom • Almond • Milk",                        type: "candle", collection: "dessert" },
  { name: "Iced Mango Lassi",      notes: "Mango",                                           type: "candle", collection: "dessert" },
  { name: "Iced Coffee Era",       notes: "Coffee",                                          type: "candle", collection: "dessert" },

    // --- Non-candle products ---
    { name: "Vanilla Wax Melts",      notes: "Vanilla • Cozy • Warm",          type: "wax-melt",  image: "/images/wax-melt-vanilla.jpg" },
    { name: "Citrus Wax Melts",       notes: "Orange • Lemon • Bright",        type: "wax-melt",  image: "/images/wax-melt-citrus.jpg" },
  
    { name: "Rose Wax Sachet",        notes: "Rose petals • Wardrobe fresh",   type: "wax-sachet", image: "/images/wax-sachet-rose.jpg" },
    { name: "Lavender Wax Sachet",    notes: "Lavender • Calm",                type: "wax-sachet", image: "/images/wax-sachet-lavender.jpg" },
  
    { name: "Handmade Beaded Tote",   notes: "Intricate beadwork • Durable",   type: "bag",       image: "/images/bag-beaded-tote.jpg" },
    { name: "Mini Beaded Crossbody",  notes: "Compact • Everyday carry",       type: "bag",       image: "/images/bag-beaded-mini.jpg" },
  
    { name: "Evening Clutch",         notes: "Handcrafted • Elegant",          type: "clutch",    image: "/images/clutch-evening.jpg" },
    { name: "Pearl Accent Clutch",    notes: "Statement • Handmade",           type: "clutch",    image: "/images/clutch-pearl.jpg" },
  
    { name: "Gold Hoop Earrings",     notes: "14k plated • Light",             type: "jewelry",   image: "/images/jewelry-hoops.jpg" },
    { name: "Minimal Pendant",        notes: "Everyday • Delicate",            type: "jewelry",   image: "/images/jewelry-pendant.jpg" },
    { name: "Ceramic Wax Melter",      notes: "Electric warmer • Even heat",    type: "wax-melters", image: "/images/melter-ceramic.jpg" },
{ name: "Minimal Plug-In Wax Melter", notes: "Compact • Bedroom friendly",  type: "wax-melters", image: "/images/melter-plugin.jpg" },

  

  // We'll add these SKUs next, once the candle collections are hooked up:
  // { name: "Vanilla Wax Melts", notes: "…", type: "wax-melt" },
  // { name: "Rose Wax Sachet",   notes: "…", type: "wax-sachet" },
  // { name: "Beaded Tote",       notes: "Handmade", type: "bag" },
  // { name: "Evening Clutch",    notes: "Handcrafted", type: "clutch" },
  // { name: "Gold Hoops",        notes: "14k plated", type: "jewelry" },
];


// Reuse everywhere so slugs are consistent
export const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
