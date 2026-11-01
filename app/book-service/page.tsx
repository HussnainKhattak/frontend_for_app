"use client";

import React, { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import BookingQuoteForm from "@/app/components/workshop/BookingQuoteForm";
import BookingModal from "@/app/components/BookingModal";
import SignupModal from "@/app/components/SignupModal";
import {
  ShieldCheckIcon,
  StarIcon,
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  ClockIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  WrenchIcon,
} from "@/app/components/Icons";

function BookingFormWithParams() {
  const searchParams = useSearchParams();
  const serviceSlug = searchParams.get("service") || "starter-motor-repair";
  const mode = searchParams.get("mode") === "quote" ? "quote" : "book";

  return (
    <BookingQuoteForm
      initialServiceSlug={serviceSlug}
      initialMode={mode}
    />
  );
}

export default function BookServicePage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const bookingFaqs = [
    {
      question: "Do I have to pay any advance or deposit to book?",
      answer:
        "No. At Panjtan Pak Auto, online booking and quote requests are 100% free with Rs. 0 advance. You only pay after your vehicle has been serviced, inspected, and road-tested to your satisfaction.",
    },
    {
      question: "What happens after I submit my booking or quote request?",
      answer:
        "Your request is instantly assigned a unique reference code (e.g. PPA-2026). Our service advisor reviews your required bay and vehicle specs, sending a confirmation SMS / WhatsApp with your scheduled time slot.",
    },
    {
      question: "Can I bring my vehicle for diagnosis without an appointment?",
      answer:
        "Walk-ins are always welcome, but booking online guarantees priority entry into your assigned bay without waiting in the workshop queue.",
    },
    {
      question: "How long does a typical diagnostic or service appointment take?",
      answer:
        "Standard starter motor testing, battery health checks, or computer scans take 30 to 45 minutes. Periodic maintenance or starter overhauls typically take 1.5 to 2 hours with same-day turnaround.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        onBookServiceClick={() => setIsBookingModalOpen(true)}
        onSignupClick={() => setIsSignupModalOpen(true)}
      />

      <main className="flex-1 w-full">
        {/* Light Hero Section matching HeroSection.tsx */}
        <section className="relative w-full pt-10 pb-12 sm:pt-14 sm:pb-16 md:pt-20 md:pb-24 bg-gradient-to-b from-slate-50/80 via-white to-slate-50/40 border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Breadcrumb Navigation matching site */}
            <div className="text-xs text-slate-500 mb-3 sm:mb-4 flex items-center justify-center gap-2">
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
              <ChevronRightIcon className="w-3 h-3 text-slate-400" />
              <Link href="/services" className="hover:text-blue-600 transition-colors">
                Services
              </Link>
              <ChevronRightIcon className="w-3 h-3 text-slate-400" />
              <span className="text-slate-800 font-semibold">Book a Service</span>
            </div>

            {/* Category Tag matching HeroSection.tsx */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-3 sm:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-[11px] sm:text-xs font-bold tracking-widest text-blue-600 uppercase">
                Online Bay Reservation
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 max-w-3xl mx-auto leading-tight">
              Book a Service or Request a Quote
            </h1>

            {/* Subtitle */}
            <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Schedule your appointment at AutoPro. Select your car make, required service, and preferred workshop bay with zero upfront advance.
            </p>

            {/* 4 Trust Metrics Cards matching NetworkSection.tsx style */}
            <div className="mt-8 sm:mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
              <div className="p-3 sm:p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs text-left">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2 sm:mb-2.5">
                  <ShieldCheckIcon className="w-4 h-4" />
                </div>
                <div className="text-lg sm:text-xl md:text-2xl font-black text-slate-900">30-180 Days</div>
                <div className="text-[11px] sm:text-xs font-medium text-slate-500 mt-0.5 truncate">Written Warranty</div>
              </div>

              <div className="p-3 sm:p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs text-left">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2 sm:mb-2.5">
                  <StarIcon className="w-4 h-4 text-blue-600 fill-blue-600" />
                </div>
                <div className="text-lg sm:text-xl md:text-2xl font-black text-slate-900">4.9 / 5.0</div>
                <div className="text-[11px] sm:text-xs font-medium text-slate-500 mt-0.5 truncate">Customer Rating</div>
              </div>

              <div className="p-3 sm:p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs text-left">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2 sm:mb-2.5">
                  <ClockIcon className="w-4 h-4" />
                </div>
                <div className="text-lg sm:text-xl md:text-2xl font-black text-slate-900">Rs. 0 Advance</div>
                <div className="text-[11px] sm:text-xs font-medium text-slate-500 mt-0.5 truncate">Pay After Road Test</div>
              </div>

              <div className="p-3 sm:p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs text-left">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2 sm:mb-2.5">
                  <WrenchIcon className="w-4 h-4" />
                </div>
                <div className="text-lg sm:text-xl md:text-2xl font-black text-slate-900">6 Bays</div>
                <div className="text-[11px] sm:text-xs font-medium text-slate-500 mt-0.5 truncate">Specialist Stations</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Booking Form Section */}
        <section className="w-full py-16 bg-white border-b border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Standard Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-2 block">
                Direct Reservation
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Select Your Service &amp; Schedule
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600">
                Fill in your vehicle details below to receive an instant price estimate and confirmed workshop bay slot.
              </p>
            </div>

            <Suspense
              fallback={
                <div className="w-full bg-white rounded-2xl p-12 text-center border border-slate-200/90 shadow-xs">
                  <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-sm font-semibold text-slate-600">Loading booking form...</p>
                </div>
              }
            >
              <BookingFormWithParams />
            </Suspense>
          </div>
        </section>

        {/* 4 Info Cards matching ContactSection.tsx */}
        <section className="w-full py-16 bg-slate-50/60 border-b border-slate-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-2 block">
                Direct Assistance
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Need Help With Your Booking?
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600">
                Our workshop service advisors are available to guide you on repairs and quotes.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {/* Call Us */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs text-left">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2.5 sm:mb-3">
                  <PhoneIcon className="w-4 h-4" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-slate-500 uppercase block">
                  Call Us
                </span>
                <a
                  href="tel:+923001234567"
                  className="font-bold text-sm text-slate-900 hover:text-blue-600 transition-colors mt-0.5 block truncate"
                >
                  +92 300 1234567
                </a>
                <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1">
                  Immediate workshop desk support
                </p>
              </div>

              {/* Email */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs text-left">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2.5 sm:mb-3">
                  <MailIcon className="w-4 h-4" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-slate-500 uppercase block">
                  Email
                </span>
                <a
                  href="mailto:info@autopro.com"
                  className="font-bold text-sm text-slate-900 hover:text-blue-600 transition-colors mt-0.5 block truncate"
                >
                  info@autopro.com
                </a>
                <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1">
                  Response within 2 hours
                </p>
              </div>

              {/* Location */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs text-left">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2.5 sm:mb-3">
                  <MapPinIcon className="w-4 h-4" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-slate-500 uppercase block">
                  Location
                </span>
                <div className="font-bold text-sm text-slate-900 mt-0.5 truncate">
                  Plot 12-B, Main Auto Hub
                </div>
                <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1">
                  Commercial Workshop Center
                </p>
              </div>

              {/* Opening Hours */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs text-left">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2.5 sm:mb-3">
                  <ClockIcon className="w-4 h-4" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-slate-500 uppercase block">
                  Opening Hours
                </span>
                <div className="font-bold text-xs text-slate-900 mt-0.5 leading-snug">
                  Mon &ndash; Sat: 9:00 AM &ndash; 7:30 PM
                </div>
                <p className="text-[10px] sm:text-[11px] text-blue-600 mt-1">
                  Sunday: Emergency on-call
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs Accordion matching FaqSection.tsx */}
        <section className="w-full py-16 bg-white border-b border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-2 block">
                Booking Information
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Frequently Asked Booking Questions
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600">
                Common questions about scheduling, estimates, and payment policies.
              </p>
            </div>

            <div className="space-y-3">
              {bookingFaqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={faq.question}
                    className="rounded-xl border border-slate-200/90 overflow-hidden bg-white shadow-2xs transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm sm:text-base font-semibold text-slate-900 hover:text-blue-600 bg-white hover:bg-slate-50/50 transition-colors cursor-pointer"
                    >
                      <span className="pr-4">{faq.question}</span>
                      <div
                        className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-blue-600 bg-blue-50" : "text-slate-400 bg-slate-100"
                        }`}
                      >
                        <ChevronDownIcon className="w-3.5 h-3.5" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Banner matching CtaSection.tsx */}
        <section className="w-full py-16 bg-slate-50/60">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-gradient-to-r from-slate-50 via-blue-50/30 to-slate-50 border border-slate-200/90 p-8 sm:p-12 text-center shadow-xs">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Prefer to Speak Directly with a Master Technician?
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
                Call our workshop hotline for instant advice on your vehicle&apos;s symptoms and turnaround time.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="tel:+923001234567"
                  className="w-full sm:w-auto px-7 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  Call +92 300 1234567
                </a>
                <Link
                  href="/services"
                  className="w-full sm:w-auto px-7 py-3 text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all"
                >
                  Browse Workshop Services
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        defaultService="Starter Motor Diagnostics, Repair & Rebuild"
      />

      {/* Signup Modal */}
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
      />
    </div>
  );
}
