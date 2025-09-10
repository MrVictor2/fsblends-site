export type CandleSize = "6 oz" | "8 oz" | "10 oz";
export type ContainerColor = "Black" | "White";

export type Variant = {
  id: string;              // unique id / sku
  size: CandleSize;
  container?: ContainerColor; // omit for products with no container choice
  price: number;           // in cents (e.g., 1899 = $18.99)
  inStock: boolean;
  image?: string;
};

export type Product = {
  slug: string;
  name: string;
  description?: string;
  image?: string;
  variants: Variant[];
};
