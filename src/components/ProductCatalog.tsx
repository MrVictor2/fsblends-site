// src/components/ProductCatalog.tsx
"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useCart } from "@/lib/cart";
import {
  products,
  productDisplayName,
  productSlug,
  type Product,
} from "@/data/products";
import { productVariants, type Variant } from "@/data/variants";

/** Optional filter to reuse this grid on other pages (e.g., Collections) */
type Filter = {
  types?: Product["type"][];                  // e.g. ["candle"]
  collections?: Array<"classic" | "dessert">; // e.g. ["classic","dessert"]
};

export default function ProductCatalog({
  showHeading = false,
  headingText = "Products",
  hideIndex = false,
  filter,
}: {
  showHeading?: boolean;
  headingText?: string;
  hideIndex?: boolean;
  filter?: Filter;
}) {
  // filter helper
  const include = (p: Product) => {
    if (filter?.types && !filter.types.includes(p.type)) return false;
    if (p.type === "candle" && filter?.collections) {
      if (!p.collection) return false;
      if (!filter.collections.includes(p.collection)) return false;
    }
    return true;
  };

  // section datasets (apply include() everywhere)
  const candlesClassic = products.filter(
    (p) => p.type === "candle" && p.collection === "classic" && include(p)
  );
  const candlesDessert = products.filter(
    (p) => p.type === "candle" && p.collection === "dessert" && include(p)
  );
  const waxMelts   = products.filter((p) => p.type === "wax-melt"   && include(p));
  const waxSachets = products.filter((p) => p.type === "wax-sachet" && include(p));
  const bags       = products.filter((p) => p.type === "bag"        && include(p));
  const clutches   = products.filter((p) => p.type === "clutch"     && include(p));
  const jewelry    = products.filter((p) => p.type === "jewelry"    && include(p));

  // if we're explicitly filtering to only candles, don't show non-candle sections
  const onlyCandles =
    !!filter?.types && filter.types.length === 1 && filter.types[0] === "candle";

  const { setItems, openCart } = useCart();

  return (
    <div
      className="mx-auto max-w-[min(90rem,92vw)] px-4
                 pt-[clamp(1.5rem,4vw,3rem)]
                 pb-[clamp(1.5rem,4vw,3rem)]"
    >
      <div id="catalog" className="h-0 scroll-mt-[calc(var(--header-offset,56px)+8px)]" />

      {showHeading && (
        <>
          <h1 className="text-[clamp(1.75rem,3vw,2rem)] font-semibold">{headingText}</h1>
          <p className="mt-1 text-neutral-700">Browse FS Blends products.</p>
        </>
      )}

      {/* Sticky section index */}
      {!hideIndex && (
        <nav className="sticky [top:var(--header-offset,56px)] z-[300] mt-6 rounded-lg border bg-white/80 px-3 py-2 backdrop-blur">
          <ul className="flex flex-wrap items-center justify-center gap-3 text-sm">
            <li className="relative">
              <a className="underline-offset-4 hover:underline" href="#candles-classic">
                Classic Candles
              </a>
            </li>
            <li className="relative before:mx-2 before:content-['|'] before:text-neutral-400">
              <a className="underline-offset-4 hover:underline" href="#candles-dessert">
                Dessert Candles
              </a>
            </li>
            {!onlyCandles && waxMelts.length > 0 && (
              <li className="relative before:mx-2 before:content-['|'] before:text-neutral-400">
                <a className="underline-offset-4 hover:underline" href="#wax-melts">
                  Wax Melts
                </a>
              </li>
            )}
            {!onlyCandles && waxSachets.length > 0 && (
              <li className="relative before:mx-2 before:content-['|'] before:text-neutral-400">
                <a className="underline-offset-4 hover:underline" href="#wax-sachets">
                  Wax Sachets
                </a>
              </li>
            )}
            {!onlyCandles && bags.length > 0 && (
              <li className="relative before:mx-2 before:content-['|'] before:text-neutral-400">
                <a className="underline-offset-4 hover:underline" href="#bags">
                  Beaded Bags
                </a>
              </li>
            )}
            {!onlyCandles && clutches.length > 0 && (
              <li className="relative before:mx-2 before:content-['|'] before:text-neutral-400">
                <a className="underline-offset-4 hover:underline" href="#clutches">
                  Clutches
                </a>
              </li>
            )}
            {!onlyCandles && jewelry.length > 0 && (
              <li className="relative before:mx-2 before:content-['|'] before:text-neutral-400">
                <a className="underline-offset-4 hover:underline" href="#jewelry">
                  Jewelry
                </a>
              </li>
            )}
          </ul>
        </nav>
      )}

      {/* Sections */}
      <div className="mt-8 space-y-14">
        {candlesClassic.length > 0 && (
          <Section id="candles-classic" title="Classic Candles" items={candlesClassic} />
        )}
        {candlesDessert.length > 0 && (
          <Section id="candles-dessert" title="Dessert Candles" items={candlesDessert} />
        )}

        {!onlyCandles && waxMelts.length > 0 && (
          <Section id="wax-melts" title="Wax Melts" items={waxMelts} />
        )}
        {!onlyCandles && waxSachets.length > 0 && (
          <Section id="wax-sachets" title="Wax Sachets" items={waxSachets} />
        )}
        {!onlyCandles && bags.length > 0 && (
          <Section id="bags" title="Handmade Beaded Bags" items={bags} />
        )}
        {!onlyCandles && clutches.length > 0 && (
          <Section id="clutches" title="Handcrafted Clutches" items={clutches} />
        )}
        {!onlyCandles && jewelry.length > 0 && (
          <Section id="jewelry" title="Jewelry" items={jewelry} />
        )}
      </div>
    </div>
  );

  function Section({ id, title, items }: { id: string; title: string; items: Product[] }) {
    return (
      <section id={id} className="scroll-mt-24">
        <h2 className="text-[clamp(1.125rem,2.2vw,1.5rem)] font-semibold">{title}</h2>

        {/* Responsive equal-height cards via fixed image ratio + min heights */}
        <div className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4 md:gap-6 xl:gap-8">
          {items.map((p) => {
            const href = `/products/${productSlug(p)}`;

            return (
              <div key={productSlug(p)} className="group">
                <Card className="relative h-full overflow-hidden border-0 bg-white/80 transition hover:shadow-md flex flex-col">
                  {/* Image links to PDP (fixed ratio keeps rows aligned) */}
                  <Link href={href} className="block">
                    <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl">
                      {p.image ? (
                        <div className="absolute inset-0">
                          <Image
                            src={p.image}
                            alt={productDisplayName(p)}
                            fill
                            className="block object-cover transition-transform duration-300 ease-out transform-gpu will-change-transform group-hover:scale-105"
                            sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, (min-width:768px) 45vw, 100vw"
                          />
                        </div>
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-brand-sand/60 text-sm text-brand-ink/60">
                          No image yet
                        </div>
                      )}
                    </div>
                  </Link>

                  {/* Title */}
                  <CardHeader className="min-h-[56px]">
                    <Link href={href}>
                      <CardTitle className="group-hover:text-brand-brown">
                        {productDisplayName(p)}
                      </CardTitle>
                    </Link>
                  </CardHeader>

                  {/* Notes */}
                  <CardContent className="min-h-[44px] text-sm text-neutral-700 line-clamp-2">
                    {p.notes}
                  </CardContent>

                  {/* Buy logic: Classic Candles => mini drawer; others => instant add */}
                  <InlineQuickBuy
                    product={p}
                    onAdd={(item) => {
                      setItems((prev) => {
                        const next = [...prev];
                        const i = next.findIndex((x) => x.id === item.id);
                        if (i >= 0) next[i] = { ...next[i], qty: (next[i].qty ?? 0) + item.qty };
                        else next.push(item as any);
                        return next;
                      });
                      openCart?.();
                    }}
                  />
                </Card>
              </div>
            );
          })}
        </div>
      </section>
    );
  }
}

/* ---------- Inline quick-buy logic ---------- */

function InlineQuickBuy({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: (item: {
    id: string;
    name: string;
    price: number;
    qty: number;
    size?: string;
    color?: string;
  }) => void;
}) {
  const slug = productSlug(product);
  const variants: Variant[] = productVariants[slug] ?? [];

  // Classic-candle rule: only these open the mini drawer
  const isClassicCandle = product.type === "candle" && product.collection === "classic";
  const opensPanel = isClassicCandle;

  // Selections (for classic candles)
  const hasColor = variants.some((v) => v.color != null);
  const sizes = Array.from(new Set(variants.map((v) => v.size)));
  const colors = hasColor ? (["black", "white"] as const) : [];

  const [open, setOpen] = React.useState(false);
  const [size, setSize] = React.useState<string | undefined>(variants[0]?.size);
  const [color, setColor] = React.useState<string | undefined>(hasColor ? variants[0]?.color : undefined);
  const [qty, setQty] = React.useState(1);

  React.useEffect(() => {
    // keep selection valid if product changes
    const first = variants[0];
    if (!first) return;
    setSize((curr) => (curr && sizes.includes(curr as any) ? curr : first.size));
    setColor(hasColor ? (variants.find((r) => r.size === (size ?? first.size))?.color ?? first.color) : undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const chosenVariant = React.useMemo(() => {
    if (!variants.length) return undefined;
    if (size && hasColor && color) return variants.find((r) => r.size === size && r.color === color) ?? variants[0];
    if (size && !hasColor) return variants.find((r) => r.size === size) ?? variants[0];
    return variants[0];
  }, [variants, size, color, hasColor]);

  const price = chosenVariant?.price ?? 3500;
  const fmt = (cents: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
  const ready = !!size && (!hasColor || !!color);

  // Add immediately for non-classic items
  const addInstant = () => {
    const v = variants[0] ?? { price: 3500, size: "10oz" as any, color: undefined };
    onAdd({
      id: `${slug}-${v.size}-${v.color ?? "default"}`,
      name: productDisplayName(product),
      price: v.price,
      qty: 1,
      size: v.size,
      color: v.color,
    });
  };

  const addFromPanel = () => {
    if (!ready || !chosenVariant) return;
    onAdd({
      id: `${slug}-${chosenVariant.size}-${hasColor ? chosenVariant.color ?? "default" : "default"}`,
      name: productDisplayName(product),
      price: chosenVariant.price,
      qty,
      size: chosenVariant.size,
      color: hasColor ? chosenVariant.color : undefined,
    });
    setOpen(false);
  };

  const handleBuyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!opensPanel) {
      addInstant();
    } else {
      setOpen((v) => !v);
    }
  };

  return (
    <div
      className="relative px-6 pb-9"
      onClick={(e) => {
        // prevent card links from triggering
        e.stopPropagation();
      }}
    >
      <Button
        onClick={handleBuyClick}
        className="
          w-auto h-10 rounded-lg text-sm font-medium
          bg-brand-brown text-white
          hover:bg-brand-brown/90
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brown/40
          active:opacity-90"
      >
        Buy now
      </Button>

      {/* in-flow panel, Mini drawer (classic candles only) */}
      {opensPanel && open && (
        <div
          role="dialog"
          aria-label="Quick buy"
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-0 left-0 right-0 z-[60] rounded-xl border bg-white p-3 shadow-xl ring-1 ring-black/5 max-h-56 overflow-auto"
        >
          {/* Size */}
          {sizes.length > 1 && (
            <div>
              <div className="mb-1 text-[11px] font-medium">Size</div>
              <div className="flex flex-wrap gap-1.5">
                {sizes.map((s) => {
                  const active = size === s;
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => {
                        setSize(s);
                        if (hasColor) {
                          const firstForSize = variants.find((r) => r.size === s)?.color;
                          setColor(firstForSize);
                        }
                      }}
                      className={[
                        "rounded-md border px-2.5 py-1 text-xs transition",
                        active
                          ? "border-brand-brown bg-brand-brown text-white"
                          : "border-gray-300 bg-white hover:bg-gray-50",
                      ].join(" ")}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Color */}
          {hasColor && size && (
            <div className="mt-2">
              <div className="mb-1 text-[11px] font-medium">Color</div>
              <div className="flex flex-wrap gap-1.5">
                {colors.map((c) => {
                  const available = variants.some((r) => r.size === size && r.color === c);
                  const active = color === c;
                  return (
                    <button
                      key={c}
                      type="button"
                      disabled={!available}
                      onClick={() => available && setColor(c)}
                      className={[
                        "rounded-md border px-2.5 py-1 text-xs capitalize transition",
                        !available
                          ? "cursor-not-allowed border-dashed border-gray-300 bg-gray-50 text-gray-400"
                          : active
                          ? "border-brand-brown bg-brand-brown text-white"
                          : "border-gray-300 bg-white hover:bg-gray-50",
                      ].join(" ")}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Qty + price */}
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <label className="text-[11px]" htmlFor={`qty-${slug}`}>
                Qty
              </label>
              <input
                id={`qty-${slug}`}
                type="number"
                min={1}
                max={10}
                value={qty}
                onChange={(e) => setQty(Math.max(1, Math.min(10, Number(e.target.value) || 1)))}
                className="w-12 rounded-md border px-2 py-1 text-xs"
              />
            </div>
            <div className="text-[11px]">
              <span className="font-medium">Price: </span>
              {fmt(price)}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-2 flex gap-3">
            <Button
              onClick={addFromPanel}
              disabled={!ready}
              className="flex-1 h-8 rounded-md bg-brand-brown text-white hover:opacity-90 disabled:opacity-50"
            >
              Add to cart
            </Button>
            <Button variant="outline" onClick={() => setOpen(false)} className="h-8 px-3 rounded-md">
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
