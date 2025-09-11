// src/app/page.tsx
"use client";
import ProductCatalog from "@/components/ProductCatalog";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HomePage() {
  // fade only while the hero scrolls out
  const heroRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const ctaOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <main className="relative">
      {/* spacer uses the dynamic header height */}
      <div aria-hidden className="h-[var(--header-offset,56px)]" />

      {/* Hero / CTA */}
      <section ref={heroRef} className="relative z-[2]">
        <div className="relative z-10 mx-auto flex min-h-[48vh] max-w-6xl items-center justify-center px-4 pt-[min(55vh,520px)] pb-[clamp(1.5rem,4vw,3rem)]">
          <motion.div style={{ opacity: ctaOpacity }}>
            <Link
              href="#catalog"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("catalog")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="inline-flex items-center gap-3 rounded-md border border-white/90 bg-[#D2B48C]/45 px-7 py-3 text-sm text-brand-ink font-medium backdrop-blur-sm transition hover:bg-[#D2B48C] hover:text-brand-brown"
              aria-label="Shop Now"
            >
              SHOP NOW
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Full product catalog */}
      <ProductCatalog showHeading={false} />

      <div aria-hidden className="h-[40px]" />
    </main>
  );
}
