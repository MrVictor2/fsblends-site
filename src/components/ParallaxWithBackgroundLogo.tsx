"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { products, slugify } from "@/data/products";

export default function HomePage() {
  // Scroll progress (0 → 1 across the page)
  const { scrollYProgress } = useScroll();

  // Background logo: subtle fade + micro-scale
  const logoOpacity = useTransform(scrollYProgress, [0, 0.2, 0.6, 1], [1, 0.9, 0.35, 1]);
  const logoScale   = useTransform(scrollYProgress, [0, 1], [1.05, 1.0]);

  // Section parallax (slightly different speeds if you want to add more bands later)
  const bandY1  = useTransform(scrollYProgress, [0, 1], ["0vh", "-10vh"]);
  const bandY2  = useTransform(scrollYProgress, [0, 1], ["0vh",  "-8vh"]);

  // Data groups
  const classic = products.filter((p: any) => p.type === "candle" && p.collection === "classic");
  const dessert = products.filter((p: any) => p.type === "candle" && p.collection === "dessert");

  return (
    <main className="relative">
      {/* Spacer for fixed header (keeps content from hiding under your sticky top bar) */}
      <div aria-hidden className="h-[56px]" />

      {/* ---------- FIXED BACKGROUND LOGO (behind everything) ---------- */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[1] flex items-start justify-center"
        style={{ opacity: logoOpacity }}
      >
        {/* small nudge down if your header is tall */}
        <motion.div className="mt-[88px] md:mt-[124px]" style={{ scale: logoScale }}>
          <Image
            src="/fs-logo.svg"   // ensure this exists in /public
            alt=""
            width={540}
            height={480}
            className="w-[240px] md:w-[875px] h-auto opacity-50"
            priority
          />
        </motion.div>
      </motion.div>

      {/* ---------- YOUR CENTERED CTA (from your first page) ---------- */}
      <section className="relative z-[2]">
        <div className="relative z-10 mx-auto flex min-h-[48vh] max-w-6xl items-center justify-center px-4 py-16 md:py-115">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-md border border-white/90 bg-[#D2B48C]/45 px-7 py-3 text-sm font-extrabold backdrop-blur-sm transition hover:bg-[#D2B48C] hover:text-black"
            aria-label="Shop Now"
          >
            SHOP NOW
          </Link>
        </div>
      </section>

      {/* ---------- CLASSIC CANDLES (parallax glide) ---------- */}
      <section className="relative z-[2] bg-brand-cream/0">
        <motion.div className="mx-auto max-w-6xl px-4 py-14 md:py-20" style={{ y: bandY1 }}>
          <h2 className="text-center text-2xl font-semibold text-brand-ink">Classic Collection </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {classic.slice(0, 12).map((p) => {
              const slug = slugify(p.name);
              return (
                <Link
                  key={p.name}
                  href={`/products/${slug}`}
                  className="group relative rounded-xl border bg-white/80 p-5 transition hover:shadow-md"
                >
                  <div className="mb-2 text-base font-medium group-hover:text-brand-brown">
                    {p.name}
                  </div>
                  {p.notes && <div className="text-sm text-brand-ink/80">{p.notes}</div>}
                  <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-black/0 transition group-hover:ring-black/5" />
                </Link>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ---------- DESSERT CANDLES (parallax glide) ---------- */}
      <section className="relative z-[2] bg-brand-sand/0">
        <motion.div className="mx-auto max-w-6xl px-4 py-16 md:py-24" style={{ y: bandY2 }}>
          <h2 className="text-center text-2xl font-semibold text-brand-ink">Dessert Candles</h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-brand-ink/80">
            Our most playful scents with gourmand notes. Limited quantities.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {dessert.map((p) => {
              const slug = slugify(p.name);
              return (
                <Link
                  key={p.name}
                  href={`/products/${slug}`}
                  className="group relative rounded-xl border bg-white/85 p-5 transition hover:shadow-md"
                >
                  <div className="mb-2 text-base font-medium group-hover:text-brand-brown">
                    {p.name}
                  </div>
                  {p.notes && <div className="text-sm text-brand-ink/80">{p.notes}</div>}
                  <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-black/0 transition group-hover:ring-black/5" />
                </Link>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Spacer for fixed footer */}
      <div aria-hidden className="h-[40px]" />
    </main>
  );
}
