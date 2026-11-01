"use client";

import { useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import BookingModal from "@/app/components/BookingModal";
import SignupModal from "@/app/components/SignupModal";
import { ShopContext } from "@/app/context/ShopContext";
import ProductCard from "@/app/components/spare-parts/ProductCard";
import type { Product } from "@/app/types/product";

const formatPrice = (amount: number) => `Rs. ${amount.toLocaleString("en-PK")}`;

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailView({ product, relatedProducts }: ProductDetailViewProps) {
  const { addToCart } = useContext(ShopContext);

  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  const handleAddToCart = () => {
    if (!product || !product.inStock) return;
    addToCart(product.id);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      <Navbar
        onBookServiceClick={() => setIsBookingOpen(true)}
        onSignupClick={() => setIsSignupOpen(true)}
      />

      <main className="flex-1 w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Breadcrumbs */}
          <nav className="mb-6 text-xs sm:text-sm text-slate-500">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2 text-slate-400">/</span>
            <Link href="/spare-parts" className="hover:text-blue-600">Spare Parts</Link>
            <span className="mx-2 text-slate-400">/</span>
            <span className="text-slate-700 font-medium">{product.name}</span>
          </nav>

          <div className="space-y-10">
            {/* Added to cart notification */}
            {addedNotice && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-medium flex items-center justify-between animate-in fade-in">
                <span>✓ Added &ldquo;{product.name}&rdquo; to your shopping cart!</span>
                <Link href="/cart" className="text-blue-600 underline font-semibold hover:text-blue-800">
                  View Cart &rarr;
                </Link>
              </div>
            )}

            {/* Main Product Card */}
            <div className="grid gap-8 lg:grid-cols-2 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="relative aspect-square w-full rounded-xl bg-slate-100 border border-slate-200 overflow-hidden">
                  {product.images[selectedImage] ? (
                    <Image
                      src={product.images[selectedImage]}
                      alt={product.name}
                      fill
                      priority
                      className="object-contain p-4"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl">🔧</div>
                  )}
                  <span
                    className={`absolute left-3 top-3 rounded-md px-2.5 py-1 text-xs font-semibold ${
                      product.inStock ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>

                {/* Thumbnail Row */}
                {product.images.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {product.images.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedImage(idx)}
                        className={`relative h-18 w-18 shrink-0 rounded-lg border-2 bg-slate-50 overflow-hidden transition-all cursor-pointer ${
                          selectedImage === idx ? "border-blue-600 ring-2 ring-blue-100" : "border-slate-200 opacity-70 hover:opacity-100"
                        }`}
                      >
                        <Image src={img} alt={`Thumb ${idx + 1}`} fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Details & Purchase */}
              <div className="flex flex-col justify-between space-y-6">
                <div>
                  <span className="inline-block rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                    {product.brand} OEM Compatible
                  </span>
                  <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                    {product.name}
                  </h1>
                  <p className="mt-1 text-xs font-mono text-slate-400">SKU: {product.sku}</p>

                  <div className="mt-4 flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-blue-600">
                      {formatPrice(product.price)}
                    </span>
                    {product.oldPrice && (
                      <span className="text-lg text-slate-400 line-through">
                        {formatPrice(product.oldPrice)}
                      </span>
                    )}
                  </div>

                  <div className="mt-6 border-t border-slate-100 pt-6 space-y-3">
                    <div className="flex justify-between text-sm py-1 border-b border-slate-50">
                      <span className="text-slate-500">Category</span>
                      <span className="font-semibold text-slate-800">{product.category}</span>
                    </div>
                    <div className="flex justify-between text-sm py-1 border-b border-slate-50">
                      <span className="text-slate-500">Brand</span>
                      <span className="font-semibold text-slate-800">{product.brand}</span>
                    </div>
                    <div className="flex justify-between text-sm py-1 border-b border-slate-50">
                      <span className="text-slate-500">Availability</span>
                      <span className={`font-semibold ${product.inStock ? "text-emerald-600" : "text-red-500"}`}>
                        {product.inStock ? "Ready for Dispatch / Pickup" : "Currently Unavailable"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm py-1 border-b border-slate-50">
                      <span className="text-slate-500">Condition</span>
                      <span className="font-semibold text-slate-800">Brand New (100% Genuine Tested)</span>
                    </div>
                  </div>

                  {/* Compatibility Box */}
                  <div className="mt-6 rounded-xl bg-slate-50 border border-slate-200/80 p-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Vehicle Fitment Guarantee
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Verified for <strong className="text-slate-900">{product.compatibility.make}</strong>{" "}
                      ({product.compatibility.models.join(", ")}) models from{" "}
                      <strong className="text-slate-900">{product.compatibility.yearFrom} &ndash; {product.compatibility.yearTo}</strong>.
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    disabled={!product.inStock}
                    onClick={handleAddToCart}
                    className="w-full rounded-xl bg-blue-600 py-3.5 px-6 text-sm font-bold text-white shadow-sm hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-all cursor-pointer"
                  >
                    {product.inStock ? "Add to Shopping Cart" : "Out of Stock"}
                  </button>
                  <Link
                    href="/cart"
                    className="block text-center w-full rounded-xl border border-slate-300 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    Go to Cart &amp; Checkout &rarr;
                  </Link>
                </div>
              </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold tracking-tight text-slate-900">
                  Related {product.category}
                </h2>
                <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                  {relatedProducts.map((p) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      onAddToCart={() => addToCart(p.id)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        defaultService="Starter Motor Diagnostics, Repair & Rebuild"
      />

      <SignupModal
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
      />
    </div>
  );
}

