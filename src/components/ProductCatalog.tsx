// src/components/ProductCatalog.tsx
import Image from "next/image";
import Link from "next/link";
import { products, slugify, type Product } from "@/data/products";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProductCatalog({ showHeading = false }: { showHeading?: boolean }) {
  const candlesClassic = products.filter((p) => p.type === "candle" && p.collection === "classic");
  const candlesDessert = products.filter((p) => p.type === "candle" && p.collection === "dessert");
  const waxMelts      = products.filter((p) => p.type === "wax-melt");
  const waxSachets    = products.filter((p) => p.type === "wax-sachet");
  const bags          = products.filter((p) => p.type === "bag");
  const clutches      = products.filter((p) => p.type === "clutch");
  const jewelry       = products.filter((p) => p.type === "jewelry");

  return (
    <div
  className="mx-auto max-w-[min(90rem,92vw)] px-4
             pt-[clamp(1.5rem,4vw,3rem)]
             pb-[clamp(1.5rem,4vw,3rem)]">
              <div id="catalog" className="h-0 scroll-mt-[calc(var(--header-offset,56px)+8px)]" />



      {showHeading && (
        <>
          <h1 className="text-[clamp(1.75rem,3vw,2rem)] font-semibold">Products</h1>
          <p className="mt-1 text-neutral-700">Browse all FS Blends products by category.</p>
        </>
      )}

      {/* Sticky section index */}
      <nav
        className="sticky [top:var(--header-offset,56px)] z-[300] mt-6 rounded-lg border bg-white/80 px-3 py-2 backdrop-blur transition-[top] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[top] transform-gpu"
      >
        <ul className="flex flex-wrap items-center justify-center gap-3 text-sm">
          <li className="relative">
            <a className="underline-offset-4 hover:underline" href="#candles-classic">Classic Candles</a>
          </li>
          <li className="relative before:mx-2 before:content-['|'] before:text-neutral-400">
            <a className="underline-offset-4 hover:underline" href="#candles-dessert">Dessert Candles</a>
          </li>
          {waxMelts.length > 0 && (
            <li className="relative before:mx-2 before:content-['|'] before:text-neutral-400">
              <a className="underline-offset-4 hover:underline" href="#wax-melts">Wax Melts</a>
            </li>
          )}
          {waxSachets.length > 0 && (
            <li className="relative before:mx-2 before:content-['|'] before:text-neutral-400">
              <a className="underline-offset-4 hover:underline" href="#wax-sachets">Wax Sachets</a>
            </li>
          )}
          {bags.length > 0 && (
            <li className="relative before:mx-2 before:content-['|'] before:text-neutral-400">
              <a className="underline-offset-4 hover:underline" href="#bags">Beaded Bags</a>
            </li>
          )}
          {clutches.length > 0 && (
            <li className="relative before:mx-2 before:content-['|'] before:text-neutral-400">
              <a className="underline-offset-4 hover:underline" href="#clutches">Clutches</a>
            </li>
          )}
          {jewelry.length > 0 && (
            <li className="relative before:mx-2 before:content-['|'] before:text-neutral-400">
              <a className="underline-offset-4 hover:underline" href="#jewelry">Jewelry</a>
            </li>
          )}
        </ul>
      </nav>

      {/* Sections */}
      <div className="mt-8 space-y-14">
        <Section id="candles-classic" title="Classic Candles" items={candlesClassic} />
        <Section id="candles-dessert" title="Dessert Candles" items={candlesDessert} />
        {waxMelts.length   > 0 && <Section id="wax-melts"   title="Wax Melts"   items={waxMelts} />}
        {waxSachets.length > 0 && <Section id="wax-sachets" title="Wax Sachets" items={waxSachets} />}
        {bags.length       > 0 && <Section id="bags"        title="Handmade Beaded Bags" items={bags} />}
        {clutches.length   > 0 && <Section id="clutches"    title="Handcrafted Clutches" items={clutches} />}
        {jewelry.length    > 0 && <Section id="jewelry"     title="Jewelry"     items={jewelry} />}
      </div>
    </div>
  );
}

function Section({ id, title, items }: { id: string; title: string; items: Product[] }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-[clamp(1.125rem,2.2vw,1.5rem)] font-semibold">{title}</h2>
      <div className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4 md:gap-6 xl:gap-8">

        {items.map((p) => {
          const slug = slugify(p.name);
          const href = `/products/${slug}`;
          return (
            <Link key={p.name} href={href} className="block group">
              <Card className="h-full overflow-hidden border-0 p-0 bg-white/80 transition hover:shadow-md">

              + <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl">


                  {p.image ? (
                    <div className="absolute inset-0">
                      <Image
                        src={p.image}
                        alt=""
                        fill         className="object-cover transition-transform duration-300 ease-out transform-gpu will-change-transform group-hover:scale-105"

     sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, (min-width:768px) 45vw, 100vw" 
                        
                      />
                    </div>
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
          );
        })}
      </div>
    </section>
  );
}
