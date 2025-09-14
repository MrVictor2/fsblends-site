// src/app/collections/page.tsx
import ProductCatalog from "@/components/ProductCatalog";

export default function CollectionsPage() {
  return (
    <ProductCatalog
      showHeading
      headingText="Classic Collection"
      hideIndex={false} // keep the two-chip index if you want; set to true to hide
      filter={{ types: ["candle"], collections: ["classic", "dessert"] }}
    />
  );
}
