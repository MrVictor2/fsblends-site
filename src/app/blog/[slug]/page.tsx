// src/app/blog/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";

type Post = { title: string; slug: string; date: string; content: string };

const posts: Post[] = [
  {
    title: "Candle Care 101",
    slug: "candle-care-101",
    date: "2025-09-01",
    content:
      "Trim the wick to ~1/4 inch before every burn.\n\nLet the first burn create a full melt pool to the jar edge (2–3 hours) to prevent tunneling.\n\nKeep away from drafts and never leave unattended.",
  },
  {
    title: "How We Blend Scents at FS Blends",
    slug: "how-we-blend-scents",
    date: "2025-08-20",
    content:
      "We test small batches with different ratios to balance top, heart, and base notes.\n\nEach blend is cured, burned, and adjusted until it throws beautifully without overwhelming.",
  },
];

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return notFound();

  return (
    <article className="prose prose-neutral max-w-2xl">
      <div className="mb-6">
        <Link href="/blog" className="text-sm underline">← Back to Blog</Link>
      </div>

      <h1 className="mb-1 text-3xl font-semibold">{post.title}</h1>
      <p className="mb-6 text-sm text-neutral-500">
        {new Date(post.date).toLocaleDateString()}
      </p>

      {post.content.split("\n\n").map((para, i) => (
        <p key={i} className="text-neutral-800">{para}</p>
      ))}
    </article>
  );
}
