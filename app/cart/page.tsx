"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { loadCart, saveCart, type CartItem } from "@/lib/cart";

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // Load saved cart on initial mount
  useEffect(() => {
    setItems(loadCart());
    setLoaded(true);
  }, []);

  // Save whenever items change (after initial load)
  useEffect(() => {
    if (loaded) {
      saveCart(items);
    }
  }, [items, loaded]);

  function changeQty(id: CartItem["id"], change: number) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, (item.qty || 1) + change) } : item
      )
    );
  }

  function removeItem(id: CartItem["id"]) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function handleManualUpdate() {
    saveCart(items);
    setFeedbackMessage("Cart updated successfully!");
    setTimeout(() => setFeedbackMessage(""), 2500);
  }

  const itemsCount = items.reduce((sum, i) => sum + (i.qty || 1), 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * (i.qty || 1), 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-1 w-full">
        {/* Page heading */}
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-8">
            <p className="text-xs sm:text-sm text-slate-500">
              <Link href="/" className="hover:text-blue-600">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/spare-parts" className="hover:text-blue-600">Spare Parts</Link>
              <span className="mx-2">/</span>
              <span className="text-slate-700 font-medium">Cart</span>
            </p>
            <h1 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Your Shopping Cart
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Review your selected parts and quantities before proceeding to checkout.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
          {feedbackMessage && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-medium flex items-center justify-between">
              <span>✓ {feedbackMessage}</span>
              <button
                onClick={() => setFeedbackMessage("")}
                className="text-emerald-600 hover:text-emerald-900 text-xs"
              >
                ✕
              </button>
            </div>
          )}

          <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
            {/* Left: Cart items */}
            <div>
              <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
                <div className="hidden sm:grid grid-cols-[3fr_1fr_1fr] border-b border-slate-200 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 bg-slate-50/60">
                  <span>Product</span>
                  <span>Quantity</span>
                  <span className="text-right">Total</span>
                </div>

                {loaded && items.length === 0 ? (
                  <div className="px-6 py-16 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 text-2xl">
                      🛒
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Your cart is empty</h3>
                    <p className="mt-1 text-sm text-slate-500 max-w-md mx-auto">
                      Explore our high-quality genuine auto parts or workshop services to get started.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3 justify-center">
                      <Link
                        href="/services"
                        className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-xs transition-colors"
                      >
                        Explore Services
                      </Link>
                      <Link
                        href="/workshops"
                        className="px-5 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-medium transition-colors"
                      >
                        Find a Workshop Bay
                      </Link>
                    </div>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:grid sm:grid-cols-[3fr_1fr_1fr] sm:items-center gap-4 border-b border-slate-200 p-4 sm:px-6 sm:py-5 last:border-b-0 hover:bg-slate-50/50 transition-colors"
                    >
                      <div className="flex gap-4">
                        <div className="relative h-20 w-20 shrink-0 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center text-2xl">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="80px"
                              className="object-contain p-1"
                            />
                          ) : (
                            item.emoji || "🔧"
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-[11px] font-mono text-slate-400">SKU: {item.sku}</p>
                          <p className="font-semibold text-slate-900 text-sm sm:text-base">{item.name}</p>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {item.brand} &middot; {item.category}
                          </p>
                          <span className="mt-1.5 inline-block rounded-md bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                            In Stock
                          </span>
                          <p className="mt-1 text-sm font-medium text-slate-900">
                            Rs. {item.price.toLocaleString("en-PK")}
                            {item.oldPrice && (
                              <span className="ml-2 text-xs text-slate-400 line-through">
                                Rs. {item.oldPrice.toLocaleString("en-PK")}
                              </span>
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Quantity buttons */}
                      <div className="flex items-center justify-between sm:justify-start gap-4">
                        <span className="sm:hidden text-xs text-slate-500 font-medium">Quantity:</span>
                        <div className="flex w-fit items-center rounded-lg border border-slate-300 bg-white">
                          <button
                            type="button"
                            onClick={() => changeQty(item.id, -1)}
                            className="px-3 py-1 text-slate-600 hover:bg-slate-100 font-bold transition-colors"
                            aria-label="Decrease quantity"
                          >
                            &minus;
                          </button>
                          <span className="border-x border-slate-300 px-3.5 py-1 text-xs font-semibold text-slate-800">
                            {item.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => changeQty(item.id, 1)}
                            className="px-3 py-1 text-slate-600 hover:bg-slate-100 font-bold transition-colors"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Total + remove */}
                      <div className="flex items-center justify-between sm:justify-end sm:gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                        <div className="sm:text-right">
                          <span className="sm:hidden text-xs text-slate-500 mr-2">Total:</span>
                          <span className="font-bold text-slate-900 text-sm sm:text-base">
                            Rs. {(item.price * item.qty).toLocaleString("en-PK")}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Remove item"
                          aria-label="Remove item"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {items.length > 0 && (
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-50 shadow-xs transition-colors"
                  >
                    &larr; Continue Shopping
                  </Link>
                  <button
                    type="button"
                    onClick={handleManualUpdate}
                    className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-50 shadow-xs transition-colors cursor-pointer"
                  >
                    Update Cart
                  </button>
                </div>
              )}
            </div>

            {/* Right: Order summary */}
            <aside className="h-fit rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">Order Summary</h2>

              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Total Items</span>
                  <span className="font-medium text-slate-900">{itemsCount}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Estimated Shipping</span>
                  <span className="font-medium text-emerald-600">Calculated at Checkout</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-3 text-base">
                  <span className="font-semibold text-slate-900">Subtotal</span>
                  <span className="font-bold text-blue-600">
                    Rs. {subtotal.toLocaleString("en-PK")}
                  </span>
                </div>
              </div>

              {items.length > 0 ? (
                <Link
                  href="/checkout"
                  className="mt-6 block w-full rounded-lg bg-blue-600 hover:bg-blue-700 py-3 text-center text-sm font-semibold text-white shadow-xs transition-colors"
                >
                  Proceed to Checkout &rarr;
                </Link>
              ) : (
                <button
                  disabled
                  className="mt-6 block w-full rounded-lg bg-slate-200 py-3 text-center text-sm font-medium text-slate-400 cursor-not-allowed"
                >
                  Cart is Empty
                </button>
              )}

              <div className="mt-6 pt-5 border-t border-slate-100 space-y-2 text-xs text-slate-500">
                <p className="flex items-center gap-1.5">
                  <span className="text-blue-600">✓</span> 100% Genuine Auto Parts Guaranteed
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="text-blue-600">✓</span> Cash on Delivery &amp; Bank Transfer Available
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="text-blue-600">✓</span> Support from certified AutoPro technicians
                </p>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
