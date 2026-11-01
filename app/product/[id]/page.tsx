import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Product } from "@/app/types/product";

const products: Product[] = [];
import ProductDetailView from "@/app/components/spare-parts/ProductDetailView";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  if (!products || products.length === 0) {
    return [{ id: "1" }];
  }
  return products.map((p) => ({
    id: p.id.toString(),
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const productId = Number(id);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return {
      title: "Product Not Found — AutoPro",
    };
  }

  return {
    title: `${product.name} | AutoPro Spare Parts`,
    description: `${product.brand} OEM ${product.category} for ${product.compatibility.make}. In stock with warranty.`,
    openGraph: {
      title: `${product.name} — AutoPro Spare Parts`,
      description: `${product.brand} OEM ${product.category}`,
      images: product.images[0] ? [{ url: product.images[0] }] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const productId = Number(id);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return <ProductDetailView product={product} relatedProducts={relatedProducts} />;
}
