"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ServiceItem, WORKSHOP_SERVICES } from "@/app/data/servicesData";
import {
  ShieldCheckIcon,
  StarIcon,
  CheckIcon,
  PhoneIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "@/app/components/Icons";
import BookingQuoteForm from "./BookingQuoteForm";

interface ServiceDetailViewProps {
  service: ServiceItem;
}

export default function ServiceDetailView({ service }: ServiceDetailViewProps) {
  const [selectedImage, setSelectedImage] = useState<string>(service.image);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const formattedPrice = new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(service.startingPrice);

  const relatedServices = WORKSHOP_SERVICES.filter(
    (s) => s.slug !== service.slug
  ).slice(0, 3);

  const handleScrollToBooking = () => {
    const el = document.getElementById("booking-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full bg-white">
      {/* Breadcrumb Navigation matching site */}
      <div className="bg-slate-50/70 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 text-xs text-slate-500 flex items-center gap-2">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <ChevronRightIcon className="w-3 h-3 text-slate-400" />
          <Link href="/services" className="hover:text-blue-600 transition-colors">
            Services
          </Link>
          <ChevronRightIcon className="w-3 h-3 text-slate-400" />
          <span className="text-slate-800 font-semibold truncate max-w-xs sm:max-w-md">
            {service.title}
          </span>
        </div>
      </div>

      {/* Main Service Overview Section */}
      <section className="w-full py-10 sm:py-14 md:py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Column: Image Gallery (5 cols) */}
            <div className="lg:col-span-5 space-y-3">
              <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/90 shadow-xs">
                <Image
                  src={selectedImage}
                  alt={service.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover transition-all duration-300"
                  onError={() => setSelectedImage("/images/workshop/gallery-1.jpg")}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                
                <div className="absolute top-2.5 sm:top-3.5 left-2.5 sm:left-3.5 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-blue-600 text-white text-[10px] sm:text-[11px] font-semibold tracking-wide uppercase shadow-xs">
                    {service.category}
                  </span>
                </div>

                <div className="absolute bottom-2.5 sm:bottom-3.5 left-2.5 sm:left-3.5 right-2.5 sm:right-3.5 flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 text-white text-xs">
                  <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-xs text-blue-700 font-semibold border border-blue-100 shadow-xs text-[10px] sm:text-xs">
                    <ShieldCheckIcon className="w-3.5 h-3.5 text-blue-600" />
                    {service.warranty}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-xs text-slate-800 font-medium border border-slate-200 shadow-xs text-[10px] sm:text-xs">
                    <ClockIcon className="w-3.5 h-3.5 text-blue-600" />
                    {service.estimatedTime}
                  </span>
                </div>
              </div>

              {/* Thumbnail switcher if gallery available */}
              {service.galleryImages && service.galleryImages.length > 1 && (
                <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-1 no-scrollbar touch-pan-x">
                  {service.galleryImages.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedImage(img)}
                      className={`relative w-16 h-14 sm:w-20 sm:h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                        selectedImage === img
                          ? "border-blue-600 scale-98 shadow-xs"
                          : "border-slate-200 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image src={img} alt="" fill sizes="80px" className="object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Quick Workshop Guarantee Box matching NetworkSection.tsx */}
              <div className="p-3.5 sm:p-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs space-y-2.5 sm:space-y-3">
                <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-slate-500 uppercase block">
                  AutoPro Workshop Standard
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-slate-700 min-w-0">
                    <CheckIcon className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="truncate">100% Genuine Parts</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 text-slate-700 min-w-0">
                    <CheckIcon className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="truncate">Certified Specialists</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 text-slate-700 min-w-0">
                    <CheckIcon className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="truncate">Dyno Bench Testing</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 text-slate-700 min-w-0">
                    <CheckIcon className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="truncate">Written Warranty</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Information & Quick CTA (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 sm:p-6 md:p-8 flex flex-col justify-between">
              <div>
                {/* Rating and Reviews - Strictly Blue & White */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-1.5 text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                    <StarIcon className="w-4 h-4 text-blue-600 fill-blue-600" />
                    <span className="text-xs font-bold text-slate-900">{service.rating}</span>
                  </div>
                  <span className="text-xs text-slate-500">
                    Based on <strong>{service.reviewsCount}</strong> verified vehicle owners
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {service.title}
                </h1>

                {/* Full Description */}
                <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed">
                  {service.fullDescription}
                </p>

                {/* Price & Duration Block matching site style */}
                <div className="mt-5 sm:mt-6 p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-baseline justify-between gap-3 sm:gap-4">
                  <div>
                    <span className="text-[10px] sm:text-[11px] uppercase font-bold text-slate-500 block">
                      Starting Price
                    </span>
                    <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900">
                      {formattedPrice}
                    </div>
                    <span className="text-[10px] sm:text-[11px] text-slate-500">
                      Transparent pricing based on required tier
                    </span>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-[10px] sm:text-[11px] uppercase font-bold text-slate-500 block">
                      Estimated Duration
                    </span>
                    <div className="text-sm sm:text-base md:text-lg font-bold text-slate-800 flex items-center sm:justify-end gap-1.5 mt-0.5">
                      <ClockIcon className="w-4 h-4 text-blue-600" />
                      <span>{service.estimatedTime}</span>
                    </div>
                    <span className="text-[10px] sm:text-[11px] text-blue-600 font-semibold">
                      Same-day service available
                    </span>
                  </div>
                </div>

                {/* Key Features List */}
                <div className="mt-5 sm:mt-6">
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2.5 sm:mb-3">
                    Service Highlights &amp; Inclusions
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 min-w-0">
                        <div className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckIcon className="w-3 h-3" />
                        </div>
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <button
                  type="button"
                  onClick={handleScrollToBooking}
                  className="flex-1 py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all text-center cursor-pointer"
                >
                  Book This Service Now
                </button>

                <a
                  href="tel:+923001234567"
                  className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 font-semibold text-sm transition-colors text-center"
                >
                  <PhoneIcon className="w-4 h-4 text-blue-600" />
                  Call Workshop
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Symptoms Section - Pure Blue & White */}
      <section className="w-full py-16 bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-2 block">
              Warning Signs &amp; Diagnostics
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Does Your Car Show Any of These Symptoms?
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              If you experience any of these common warning signs, visit our workshop before minor wear causes roadside breakdown.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.symptoms.map((symptom, i) => (
              <div
                key={i}
                className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs text-left flex items-start gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <ExclamationTriangleIcon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block leading-snug">
                    {symptom}
                  </span>
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Diagnostic check recommended
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4-Step Workshop Procedure Section */}
      <section className="w-full py-10 sm:py-14 md:py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-2 block">
              Technical Excellence
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Our 4-Step Professional Procedure
            </h2>
            <p className="mt-2 text-xs sm:text-sm md:text-base text-slate-600">
              Every job follows standardized bench testing and manufacturer torque specifications.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {service.processSteps.map((stp) => (
              <div
                key={stp.step}
                className="flex flex-col justify-between bg-white rounded-2xl p-4 sm:p-5 md:p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-50 text-blue-600 font-extrabold text-xs sm:text-sm flex items-center justify-center mb-3 sm:mb-4">
                    0{stp.step}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-2">
                    {stp.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {stp.description}
                  </p>
                </div>
                <div className="mt-4 sm:mt-6 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-blue-600">
                  <CheckIcon className="w-3.5 h-3.5 text-blue-600" />
                  <span>Quality Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Package Tiers Comparison */}
      {service.packages && service.packages.length > 0 && (
        <section className="w-full py-10 sm:py-14 md:py-16 bg-slate-50/60 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
              <span className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-2 block">
                Transparent Pricing in PKR
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Select Your Service Package
              </h2>
              <p className="mt-2 text-xs sm:text-sm md:text-base text-slate-600">
                Upfront estimates with zero hidden costs. Choose the tier that matches your vehicle&apos;s condition.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              {service.packages.map((pkg) => {
                const pkgFormatted = new Intl.NumberFormat("en-PK", {
                  style: "currency",
                  currency: "PKR",
                  maximumFractionDigits: 0,
                }).format(pkg.price);

                return (
                  <div
                    key={pkg.name}
                    className={`relative flex flex-col justify-between p-4 sm:p-6 md:p-7 rounded-2xl border transition-all ${
                      pkg.popular
                        ? "bg-white border-2 border-blue-600 shadow-md ring-2 ring-blue-600/10"
                        : "bg-white border-slate-200/90 shadow-xs hover:border-slate-300"
                    }`}
                  >
                    {pkg.popular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-xs">
                        Most Popular
                      </span>
                    )}

                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">{pkg.name}</h3>
                      <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        {pkg.description}
                      </p>

                      <div className="mt-4 pt-4 border-t border-slate-100">
                        <div className="text-xl sm:text-2xl font-extrabold text-slate-900">{pkgFormatted}</div>
                        <span className="text-[10px] sm:text-[11px] text-slate-500">
                          Estimated Parts &amp; Labor
                        </span>
                      </div>

                      <ul className="mt-5 sm:mt-6 space-y-2 sm:space-y-2.5">
                        {pkg.features.map((feat, fidx) => (
                          <li key={fidx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 min-w-0">
                            <CheckIcon className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      type="button"
                      onClick={handleScrollToBooking}
                      className={`mt-6 sm:mt-8 w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                        pkg.popular
                          ? "bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                      }`}
                    >
                      Choose {pkg.name}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* FAQs Section matching FaqSection.tsx */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="w-full py-16 bg-white border-b border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-2 block">
                Help &amp; Information
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600">
                Quick answers about this service, procedure, and warranty.
              </p>
            </div>

            <div className="space-y-3">
              {service.faqs.map((faq, index) => {
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
      )}

      {/* Embedded Booking & Quote Form Section */}
      <section id="booking-section" className="w-full py-16 bg-slate-50/60 border-b border-slate-100 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-2 block">
              Reserve Online
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Schedule Your Appointment or Request a Quote
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Pre-selected with {service.title}. Instant confirmation with our workshop desk.
            </p>
          </div>

          <BookingQuoteForm initialServiceSlug={service.slug} />
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="w-full py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-2 block">
                  Explore More
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Other Popular Services
                </h2>
              </div>
              <Link
                href="/services"
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1"
              >
                <span>View All Services</span>
                <span>&rarr;</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedServices.map((rel) => {
                const relPrice = new Intl.NumberFormat("en-PK", {
                  style: "currency",
                  currency: "PKR",
                  maximumFractionDigits: 0,
                }).format(rel.startingPrice);

                return (
                  <Link
                    key={rel.id}
                    href={`/services/${rel.slug}`}
                    className="group flex flex-col justify-between bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-blue-300 transition-all"
                  >
                    <div>
                      <div className="relative w-full h-40 rounded-xl overflow-hidden bg-slate-100 mb-4 border border-slate-100">
                        <Image
                          src={rel.image}
                          alt={rel.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-blue-600 text-white text-[10px] font-bold uppercase">
                          {rel.category}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                        {rel.shortDescription}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{relPrice}</span>
                      <span className="text-xs font-semibold text-blue-600 group-hover:translate-x-0.5 transition-transform">
                        View Service &rarr;
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
