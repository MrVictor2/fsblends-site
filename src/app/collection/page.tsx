// src/app/collection/page.tsx
import ProductSection from "@/components/product-section";
import { products, type Product } from "@/data/products";

const candles: Product[]         = products.filter(p => p.type === "candle");
const classicCandles: Product[]  = candles.filter(p => p.collection === "classic");
const dessertCandles: Product[]  = candles.filter(p => p.collection === "dessert");

export default function CollectionsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 space-y-8" id="top">
      {/* Centered chips that SCROLL on this page */}
      <nav
        aria-label="Collections"
        className="mx-auto max-w-4xl rounded-md border bg-white/60 px-3 py-2 shadow-sm"
      >
        <ul className="flex items-center justify-center text-sm text-brand-ink">
          <li>
            <a href="#classic" className="rounded px-3 py-1 hover:text-brand-brown">
              Classic Collection
            </a>
          </li>
          <li className="mx-3 select-none opacity-30">|</li>
          <li>
            <a href="#dessert" className="rounded px-3 py-1 hover:text-brand-brown">
              Dessert Candles
            </a>
          </li>
        </ul>
      </nav>

      {/* Only candles appear below */}
      <ProductSection id="classic" title="Classic Collection" items={classicCandles} />
      <ProductSection id="dessert" title="Dessert Candles"  items={dessertCandles} />
    </main>
  );
}
