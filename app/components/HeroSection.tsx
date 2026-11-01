"use client";

import React, { useState } from "react";
import { SearchIcon, CarIcon, WrenchIcon, MapPinIcon, CheckIcon } from "./Icons";

interface HeroSectionProps {
  onSearch: (make: string, service: string, location: string) => void;
  onBookServiceClick: () => void;
}

export default function HeroSection({ onSearch, onBookServiceClick }: HeroSectionProps) {
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [location, setLocation] = useState("");

  const handleFindServices = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(selectedMake, selectedService, location);
    // Smooth scroll to services section
    const el = document.getElementById("services");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full pt-12 pb-16 md:pt-20 md:pb-24 bg-gradient-to-b from-slate-50/80 via-white to-slate-50/40 border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Category Tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
          <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">
            Automotive Services
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[44px] font-extrabold tracking-tight text-slate-900 max-w-3xl mx-auto leading-tight md:leading-tight">
          Professional Care for Your Vehicle
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Expert vehicle maintenance, diagnostics, and repair services at our fully equipped workshop.
        </p>

        {/* Search / Filter Container */}
        <div className="mt-8 sm:mt-10 max-w-4xl mx-auto bg-white rounded-2xl p-3 sm:p-4 shadow-xl shadow-slate-200/50 border border-[#D1D5DB]">
          <form onSubmit={handleFindServices} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Select Vehicle */}
            <div className="md:col-span-3 text-left px-3 py-1.5 rounded-xl hover:bg-slate-50 border border-[#D1D5DB] transition-colors">
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <CarIcon className="w-3.5 h-3.5 text-blue-600" />
                Select Vehicle
              </label>
              <select
                value={selectedMake}
                onChange={(e) => setSelectedMake(e.target.value)}
                className="w-full text-sm text-slate-800 bg-transparent focus:outline-none cursor-pointer py-1 font-medium"
              >
                <option value="">Choose Car Make</option>
                <option value="Toyota">Toyota</option>
                <option value="Honda">Honda</option>
                <option value="BMW">BMW</option>
                <option value="Mercedes-Benz">Mercedes-Benz</option>
                <option value="Audi">Audi</option>
                <option value="Ford">Ford</option>
                <option value="Hyundai">Hyundai</option>
                <option value="Kia">Kia</option>
                <option value="Nissan">Nissan</option>
              </select>
            </div>

            <div className="hidden md:block w-px h-10 bg-slate-200" />

            {/* Select Service */}
            <div className="md:col-span-4 text-left px-3 py-1.5 rounded-xl hover:bg-slate-50 border border-[#D1D5DB] transition-colors">
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <WrenchIcon className="w-3.5 h-3.5 text-blue-600" />
                Select Service
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full text-sm text-slate-800 bg-transparent focus:outline-none cursor-pointer py-1 font-medium"
              >
                <option value="">Choose Service Type</option>
                <option value="Vehicle Maintenance">Vehicle Maintenance</option>
                <option value="Engine Diagnostics">Engine Diagnostics</option>
                <option value="Brake Service">Brake Service</option>
                <option value="AC & Electrical">AC & Electrical</option>
                <option value="Oil & Filter Change">Oil & Filter Change</option>
                <option value="Tyre & Wheel Service">Tyre & Wheel Service</option>
              </select>
            </div>

            <div className="hidden md:block w-px h-10 bg-slate-200" />

            {/* Location */}
            <div className="md:col-span-3 text-left px-3 py-1.5 rounded-xl hover:bg-slate-50 border border-[#D1D5DB] transition-colors">
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <MapPinIcon className="w-3.5 h-3.5 text-blue-600" />
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter city or area (e.g. Peshawar)"
                className="w-full text-sm text-slate-800 bg-transparent placeholder:text-slate-400 focus:outline-none py-1 font-medium"
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full h-12 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-semibold text-sm rounded-xl shadow-md transition-all cursor-pointer"
              >
                <SearchIcon className="w-4 h-4" />
                <span>Get Started</span>
              </button>
            </div>
          </form>

          {/* Under search bar link */}
          <div className="mt-3 pt-3 border-t border-[#D1D5DB] flex items-center justify-between px-2 text-xs text-slate-500">
            <span>
              Can&apos;t find what you need?{" "}
              <a href="#contact" className="text-blue-600 hover:underline font-semibold">
                Contact us
              </a>
            </span>
            <span className="hidden sm:inline text-slate-400">6 Fully Equipped Service Bays</span>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-medium text-slate-700">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <CheckIcon className="w-3 h-3" />
            </span>
            <span>Certified Technicians</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <CheckIcon className="w-3 h-3" />
            </span>
            <span>Fixed Transparent Pricing</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <CheckIcon className="w-3 h-3" />
            </span>
            <span>Service Warranty Guaranteed</span>
          </div>
        </div>
      </div>
    </section>
  );
}
