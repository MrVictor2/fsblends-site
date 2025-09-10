// src/app/gift/page.tsx
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const picks = [
  { key: "romantic", title: "Romantic", notes: "First Love • Fantasy Bouquet" },
  { key: "spa-day", title: "Spa Day", notes: "Lavender Oasis • Sweet Citrus Medley" },
  { key: "woodsy", title: "Woodsy & Warm", notes: "Woodzy Spell • Gourmet Treat" },
];

export default function GiftPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Gift Ideas</h1>
      <p className="text-neutral-700">Curated picks for birthdays, housewarmings, and “just because”.</p>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {picks.map((g) => (
          <Card key={g.key} className="bg-white/80">
            <CardHeader>
              <CardTitle>{g.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-neutral-700">{g.notes}</p>
              <Button asChild size="sm">
                <Link href="/products">Shop these scents</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
