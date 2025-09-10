// src/app/scents/page.tsx
import Link from "next/link";
import { products, slugify } from "@/data/products";

export default function ScentsPage() {
  const sorted = [...products].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Scent Library</h1>
      <p className="text-neutral-700">
        Browse all FS Blends fragrances. Click any scent to view details.
      </p>

      <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {sorted.map((p) => (
          <li key={p.name} className="rounded-xl bg-white/80 p-4 transition hover:shadow">
            <Link href={`/shop/${slugify(p.name)}`} className="block">
              <div className="font-medium">{p.name}</div>
              <div className="text-sm text-neutral-700">{p.notes}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
