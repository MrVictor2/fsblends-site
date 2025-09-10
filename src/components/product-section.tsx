// src/components/product-section.tsx
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { slugify, type Product } from "@/data/products";

// Server component (no "use client")
export default function ProductSection({
  id,
  title,
  items,
}: {
  id: string;
  title: string;
  items: Product[];
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {items.map((p) => (
          <Link key={p.name} href={`/products/${slugify(p.name)}`} className="block group">
            <Card className="overflow-hidden bg-white/80 transition hover:shadow-md">
              <div className="relative h-40 w-full border-b">
                {p.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.image} alt="" className="h-full w-full object-cover" loading="lazy" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-brand-sand/60 text-sm text-brand-ink/60">
                    No image yet
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle className="group-hover:text-brand-brown">{p.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-neutral-700">{p.notes}</CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
