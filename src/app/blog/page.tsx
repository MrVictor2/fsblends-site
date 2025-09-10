// src/app/blog/page.tsx
import Link from "next/link";

type Post = { title: string; slug: string; excerpt: string; date: string };

const posts: Post[] = [
  {
    title: "Candle Care 101",
    slug: "candle-care-101",
    excerpt: "Wick trimming, first burn, and how to avoid tunneling.",
    date: "2025-09-01",
  },
  {
    title: "How We Blend Scents at FS Blends",
    slug: "how-we-blend-scents",
    excerpt: "A peek into our small-batch process and testing notes.",
    date: "2025-08-20",
  },
];

export default function BlogPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Blog</h1>
      <p className="text-neutral-700">Tips, behind-the-scenes, and scent stories.</p>

      <ul className="grid gap-4">
        {posts.map((p) => (
          <li key={p.slug} className="rounded-xl bg-white/80 p-4 transition hover:shadow">
            <div className="text-xs text-neutral-500">{new Date(p.date).toLocaleDateString()}</div>
            <h2 className="text-lg font-medium">
              <Link href={`/blog/${p.slug}`} className="hover:text-brand-gold">
                {p.title}
              </Link>
            </h2>
            <p className="text-sm text-neutral-700">{p.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
