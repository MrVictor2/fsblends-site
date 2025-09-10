// src/app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl py-16 text-center">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="mt-2 text-neutral-700">
        The page you’re looking for doesn’t exist. Try the shop or head home.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Link href="/" className="rounded-xl bg-brand-gold px-4 py-2 text-white">
          Go Home
        </Link>
        <Link href="/shop" className="rounded-xl border px-4 py-2">
          Browse Shop
        </Link>
      </div>
    </div>
  );
}
