"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { loadCart, saveCart, type CartItem } from "@/lib/cart";

type PlacedOrder = {
  id: string;
  status: string;
  date: string;
  items: {
    id: number | string;
    sku: string;
    name: string;
    brand: string;
    category: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  payment: string;
  customer: {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    notes: string;
  };
};

const ORDERS_KEY = "autopro-orders";

export default function CheckoutPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [payment, setPayment] = useState("cod");
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null);

  useEffect(() => {
    setItems(loadCart());
    setLoaded(true);
  }, []);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (items.length === 0) {
      alert("Your cart is empty. Please add products before checkout.");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const now = new Date();

    const order: PlacedOrder = {
      id: `AP-${now.getTime()}`,
      status: "Order Placed",
      date: now.toISOString(),
      items: items.map((item) => ({
        id: item.id,
        sku: item.sku,
        name: item.name,
        brand: item.brand,
        category: item.category,
        quantity: item.qty || 1,
        price: item.price,
      })),
      total: subtotal,
      payment,
      customer: {
        name: String(formData.get("fullName") || "").trim(),
        phone: String(formData.get("phone") || "").trim(),
        email: String(formData.get("email") || "").trim(),
        address: String(formData.get("address") || "").trim(),
        city: String(formData.get("city") || "").trim(),
        postalCode: String(formData.get("postalCode") || "").trim(),
        notes: String(formData.get("notes") || "").trim(),
      },
    };

    try {
      const savedOrders = localStorage.getItem(ORDERS_KEY);
      const parsedOrders = savedOrders ? JSON.parse(savedOrders) : [];

      if (!Array.isArray(parsedOrders)) {
        throw new Error("Saved orders data is invalid.");
      }

      localStorage.setItem(
        ORDERS_KEY,
        JSON.stringify([order, ...parsedOrders])
      );

      // Cart clears only after the order has been saved.
      saveCart([]);
      setItems([]);
      setPlacedOrder(order);
    } catch (error) {
      console.error("Could not save order:", error);
      alert(
        "Your order could not be saved. Please try again. Your cart has not been cleared."
      );
    }
  }

  const inputStyle =
    "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors";

  if (placedOrder) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
        <Navbar />
        <main className="flex-1 w-full flex items-center justify-center px-4 sm:px-6 py-12 sm:py-16">
          <div className="mx-auto w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-700">
              ✓
            </div>

            <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
              Order Request Received!
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Thank you! Your order request has been received. Our team will contact
              you shortly on your phone/WhatsApp to confirm dispatch details.
            </p>

            <div className="mt-6 rounded-xl bg-slate-50 p-4 text-left border border-slate-100">
              <div className="flex justify-between items-center pb-2.5 border-b border-slate-200 text-sm">
                <span className="text-slate-500">Order Reference</span>
                <span className="font-mono font-semibold text-blue-600">{placedOrder.id}</span>
              </div>

              <div className="flex justify-between items-center py-2.5 border-b border-slate-200 text-sm">
                <span className="text-slate-500">Payment Method</span>
                <span className="font-medium text-slate-800">
                  {placedOrder.payment === "cod" ? "Cash on Delivery" : "Bank Transfer"}
                </span>
              </div>

              <div className="flex justify-between items-center pt-2.5 text-sm">
                <span className="text-slate-500 font-medium">Total Amount</span>
                <span className="font-bold text-slate-900 text-base">
                  Rs. {placedOrder.total.toLocaleString("en-PK")}
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/profile"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-blue-700 transition-colors"
              >
                View in My Orders
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Continue Browsing
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!loaded) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
        <Navbar />
        <main className="flex-1 w-full flex items-center justify-center px-4 py-16">
          <div className="mx-auto max-w-lg rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-xs">
            Loading your cart details...
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
        <Navbar />
        <main className="flex-1 w-full flex items-center justify-center px-4 py-16">
          <div className="mx-auto max-w-lg rounded-xl border border-slate-200 bg-white p-8 text-center shadow-xs">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Your cart is empty</h1>
            <p className="mt-2 text-sm text-slate-500">
              Please add automotive parts or services to your cart before proceeding to checkout.
            </p>

            <Link
              href="/cart"
              className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 shadow-xs transition-colors"
            >
              Go to Cart
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-1 w-full">
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-8">
            <p className="text-xs sm:text-sm text-slate-500">
              <Link href="/" className="hover:text-blue-600">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-slate-400">Spare Parts</span>
              <span className="mx-2">/</span>
              <Link href="/cart" className="hover:text-blue-600">Cart</Link>
              <span className="mx-2">/</span>
              <span className="text-slate-700 font-medium">Checkout</span>
            </p>
            <h1 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Checkout &amp; Confirmation
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Enter your shipping information and payment preference to place your order request.
            </p>
          </div>
        </section>

        <form
          onSubmit={handleSubmit}
          className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 py-8 lg:grid-cols-[2fr_1fr]"
        >
          <div className="space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">Delivery Details</h2>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="text-xs sm:text-sm font-medium text-slate-700">
                  Full Name *
                  <input
                    name="fullName"
                    required
                    type="text"
                    placeholder="e.g. Asad Ali"
                    className={inputStyle}
                  />
                </label>

                <label className="text-xs sm:text-sm font-medium text-slate-700">
                  Phone / WhatsApp Number *
                  <input
                    name="phone"
                    required
                    type="tel"
                    placeholder="0300 0000000"
                    className={inputStyle}
                  />
                </label>

                <label className="text-xs sm:text-sm font-medium text-slate-700 sm:col-span-2">
                  Email Address
                  <input
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    className={inputStyle}
                  />
                </label>

                <label className="text-xs sm:text-sm font-medium text-slate-700 sm:col-span-2">
                  Complete Street Address *
                  <input
                    name="address"
                    required
                    type="text"
                    placeholder="House / Street / Area / Workshop location"
                    className={inputStyle}
                  />
                </label>

                <label className="text-xs sm:text-sm font-medium text-slate-700">
                  City *
                  <input
                    name="city"
                    required
                    type="text"
                    placeholder="e.g. Multan"
                    className={inputStyle}
                  />
                </label>

                <label className="text-xs sm:text-sm font-medium text-slate-700">
                  Postal Code
                  <input
                    name="postalCode"
                    type="text"
                    placeholder="e.g. 60000"
                    className={inputStyle}
                  />
                </label>

                <label className="text-xs sm:text-sm font-medium text-slate-700 sm:col-span-2">
                  Special Instructions / Notes (Optional)
                  <textarea
                    name="notes"
                    rows={3}
                    placeholder="e.g., Deliver during business hours, call before arriving..."
                    className={inputStyle}
                  />
                </label>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">Payment Preference</h2>

              <div className="mt-4 space-y-3">
                <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-300 p-3.5 text-sm hover:bg-slate-50 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    checked={payment === "cod"}
                    onChange={() => setPayment("cod")}
                    className="accent-blue-600"
                  />
                  <div>
                    <span className="font-semibold text-slate-800">Cash on Delivery (COD)</span>
                    <p className="text-xs text-slate-500">Pay cash upon inspecting and receiving parts at your doorstep.</p>
                  </div>
                </label>

                <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-300 p-3.5 text-sm hover:bg-slate-50 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    checked={payment === "bank"}
                    onChange={() => setPayment("bank")}
                    className="accent-blue-600"
                  />
                  <div>
                    <span className="font-semibold text-slate-800">Direct Bank Transfer / EasyPaisa</span>
                    <p className="text-xs text-slate-500">Account details will be sent via SMS / WhatsApp upon confirmation.</p>
                  </div>
                </label>

                {payment === "bank" && (
                  <p className="rounded-lg bg-blue-50 border border-blue-100 p-3.5 text-xs sm:text-sm text-blue-800">
                    ℹ️ Our billing desk will verify parts availability and send the official IBAN/Account details before taking payment.
                  </p>
                )}
              </div>
            </div>
          </div>

          <aside className="h-fit rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">Order Summary</h2>

            <div className="mt-4 space-y-3 text-sm">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between gap-3 text-xs sm:text-sm">
                  <span className="text-slate-600">
                    {item.name} &times; {item.qty}
                  </span>
                  <span className="font-medium text-slate-900">
                    Rs. {(item.price * item.qty).toLocaleString("en-PK")}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-between border-t border-slate-200 pt-4 text-base">
              <span className="font-semibold text-slate-800">Total Payable</span>
              <span className="font-bold text-blue-600">
                Rs. {subtotal.toLocaleString("en-PK")}
              </span>
            </div>

            <button
              type="submit"
              className="mt-6 w-full rounded-lg bg-blue-600 hover:bg-blue-700 py-3 text-sm font-semibold text-white shadow-xs transition-colors cursor-pointer"
            >
              Place Order Request &rarr;
            </button>

            <Link
              href="/cart"
              className="mt-3 block w-full rounded-lg border border-slate-300 py-2.5 text-center text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              &larr; Back to Cart
            </Link>
          </aside>
        </form>
      </main>

      <Footer />
    </div>
  );
}
