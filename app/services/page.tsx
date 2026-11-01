"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ServiceCard from "@/app/components/workshop/ServiceCard";
import ServiceFilters from "@/app/components/workshop/ServiceFilters";
import BookingModal from "@/app/components/BookingModal";
import SignupModal from "@/app/components/SignupModal";
import {
  WORKSHOP_SERVICES,
  WorkshopCategory,
  ServiceItem,
} from "@/app/data/servicesData";
import {
  SearchIcon,
  WrenchIcon,
  ShieldCheckIcon,
  CpuChipIcon,
  BoltIcon,
} from "@/app/components/Icons";

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<WorkshopCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recommended");

  // Modals
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [activeServiceForModal, setActiveServiceForModal] = useState("Starter Motor Diagnostics, Repair & Rebuild");

  const handleOpenBooking = (serviceName?: string) => {
    if (serviceName) setActiveServiceForModal(serviceName);
    setIsBookingModalOpen(true);
  };

  // Filter & Sort Logic
  const filteredServices = useMemo(() => {
    let result = WORKSHOP_SERVICES;

    // Filter by Category
    if (selectedCategory && selectedCategory !== "All") {
      result = result.filter((s) => s.category === selectedCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.shortDescription.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          s.symptoms.some((sym) => sym.toLowerCase().includes(q)) ||
          s.features.some((f) => f.toLowerCase().includes(q))
      );
    }

    // Sort
    const sorted = [...result];
    if (sortBy === "price-asc") {
      sorted.sort((a, b) => a.startingPrice - b.startingPrice);
    } else if (sortBy === "price-desc") {
      sorted.sort((a, b) => b.startingPrice - a.startingPrice);
    } else if (sortBy === "rating") {
      sorted.sort((a, b) => b.rating - a.rating);
    }

    return sorted;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        onBookServiceClick={() => handleOpenBooking()}
        onSignupClick={() => setIsSignupModalOpen(true)}
      />

      <main className="flex-1 w-full">
        {/* Simple Light Top Section - Exactly like workshops page */}
        <section className="relative w-full pt-10 pb-12 sm:pt-14 sm:pb-16 md:pt-16 md:pb-20 bg-gradient-to-b from-slate-50/80 via-white to-slate-50/40 border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Category Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-3 sm:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-[11px] sm:text-xs font-bold tracking-widest text-blue-600 uppercase">
                Workshop Services
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 max-w-3xl mx-auto leading-tight">
              Professional Workshop Services
            </h1>

            {/* Subtitle */}
            <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Expert vehicle maintenance, diagnostics, and specialized starter &amp; alternator repair services with transparent PKR rates and written warranty.
            </p>

            {/* Action Buttons */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
              <button
                type="button"
                onClick={() => handleOpenBooking()}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer text-center"
              >
                Book a Service
              </button>

              <Link
                href="/workshops"
                className="px-6 py-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-colors text-center"
              >
                Explore Workshop Bays
              </Link>
            </div>

            {/* 4 Stats Cards matching workshops page */}
            <div className="mt-8 sm:mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
              <div className="p-3 sm:p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs text-left">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2 sm:mb-2.5">
                  <WrenchIcon className="w-4 h-4" />
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl font-black text-blue-600">8+</div>
                <div className="text-[11px] sm:text-xs font-medium text-slate-500 mt-0.5 truncate">Specialist Services</div>
              </div>

              <div className="p-3 sm:p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs text-left">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2 sm:mb-2.5">
                  <ShieldCheckIcon className="w-4 h-4" />
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl font-black text-blue-600">100%</div>
                <div className="text-[11px] sm:text-xs font-medium text-slate-500 mt-0.5 truncate">Written Warranty</div>
              </div>

              <div className="p-3 sm:p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs text-left">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2 sm:mb-2.5">
                  <CpuChipIcon className="w-4 h-4" />
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl font-black text-blue-600">Bench</div>
                <div className="text-[11px] sm:text-xs font-medium text-slate-500 mt-0.5 truncate">Dyno Tested</div>
              </div>

              <div className="p-3 sm:p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs text-left">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2 sm:mb-2.5">
                  <BoltIcon className="w-4 h-4" />
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl font-black text-blue-600">12,000+</div>
                <div className="text-[11px] sm:text-xs font-medium text-slate-500 mt-0.5 truncate">Vehicles Serviced</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Services Section - Exactly matching PopularServicesSection.tsx on Homepage */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-16">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <span className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-2 block">
              Comprehensive Care
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Explore Our Workshop Services
            </h2>
            <p className="mt-2 text-xs sm:text-sm md:text-base text-slate-600">
              Select your required automotive service or filter by your car&apos;s symptoms.
            </p>
          </div>

          {/* Filter & Search Bar - Pure Blue & White */}
          <ServiceFilters
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
            totalResults={filteredServices.length}
          />

          {/* Service Cards Grid */}
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {filteredServices.map((service: ServiceItem) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onBookClick={() => handleOpenBooking(service.title)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200/90 p-12 text-center max-w-lg mx-auto shadow-xs">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <SearchIcon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No Services Found</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-500">
                No workshop services matched your query &quot;{searchQuery}&quot; under category &quot;{selectedCategory}&quot;.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="mt-5 py-2.5 px-5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </section>

        {/* CTA Banner matching CtaSection.tsx from homepage */}
        <section className="w-full py-16 bg-slate-50/60 border-t border-slate-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-gradient-to-r from-slate-50 via-blue-50/30 to-slate-50 border border-slate-200/90 p-8 sm:p-12 text-center shadow-xs">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Ready to Service Your Car?
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
                Book your next service appointment at AutoPro or speak directly with our workshop desk.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => handleOpenBooking()}
                  className="w-full sm:w-auto px-7 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  Book a Service
                </button>
                <a
                  href="tel:+923001234567"
                  className="w-full sm:w-auto px-7 py-3 text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all"
                >
                  Call +92 300 1234567
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        defaultService={activeServiceForModal}
      />

      {/* Signup Modal */}
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
      />
    </div>
  );
}
