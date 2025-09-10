// src/app/products/[slug]/page.tsx
import * as React from "react";
import { notFound } from "next/navigation";
import { products, slugify } from "@/data/products";
import ProductClient from "./product-client";

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Unwrap Next 15 params
  const { slug } = React.use(params);

  const product = products.find((p) => slugify(p.name) === slug);
  if (!product) return notFound();

  return (
    <ProductClient
      slug={slug}
      name={product.name}
      notes={product.notes}
    />
  );
}
