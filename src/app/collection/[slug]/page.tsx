// src/app/collection/[slug]/page.tsx
import Link from "next/link";
import { products, slugify, type Product } from "@/data/products";

type CollectionSlug = "classic" | "dessert";

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: CollectionSlug }>;
}) {
  // Next.js 15+ passes params as a Promise — unwrap it:
  const { slug } = await params;

  // Only candles belong to collections; filter by the collection slug
  const items: Product[] = products.filter(
    (p) => p.type === "candle" && p.collection === slug
  );

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-2xl font-semibold">Collection not found</h1>
        <p className="mt-2 text-neutral-700">
          The collection “{slug}” doesn’t exist.
        </p>
        <p className="mt-4">
          <Link href="/collection" className="underline">
            Back to Collections
          </Link>
        </p>
      </div>
    );
  }

  const title = slug === "classic" ? "Classic Collection" : "Dessert Candles";

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold">{title}</h1>
      <p className="mt-1 text-neutral-700">
        {slug === "classic"
          ? "Timeless scents for every day."
          : "Sheer Khurma, Iced Mango Lassi, and Iced Coffee Era."}
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {items.map((p) => {
          const prodSlug = slugify(p.name);
          return (
            <Link key={p.name} href={`/products/${prodSlug}`} className="block group">
              <div className="rounded-xl border bg-white/80 p-5 transition hover:shadow-md">
                <h2 className="text-lg font-semibold group-hover:text-brand-brown">
                  {p.name}
                </h2>
                <p className="mt-1 text-sm text-neutral-700">{p.notes}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <p className="mt-8">
        <Link href="/collection" className="underline">
          ← Back to Collections
        </Link>
      </p>
    </div>
  );
}
