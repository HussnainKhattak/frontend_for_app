import React from "react";
import Link from "next/link";

interface PopularServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

export default function PopularServicesSection({ onSelectService }: PopularServicesSectionProps) {
  const services = [
    {
      category: "Routine Care",
      title: "Vehicle Maintenance",
      description: "Routine maintenance to keep your vehicle reliable and road-ready.",
      specs: "Inspection: 32 Points · Time: 90 Mins",
    },
    {
      category: "Computerized",
      title: "Engine Diagnostics",
      description: "Find and diagnose engine problems with professional equipment.",
      specs: "OBD-II Scan & Codes · Live Data Readout",
    },
    {
      category: "Safety Critical",
      title: "Brake Service",
      description: "Brake inspection, repair, and replacement by experienced technicians.",
      specs: "Pads & Rotors · Fluid Flush",
    },
    {
      category: "Climate & Power",
      title: "AC & Electrical",
      description: "Professional air-conditioning and electrical system services.",
      specs: "Gas Recharge (R134a) · Alternator / Battery",
    },
    {
      category: "Essential",
      title: "Oil & Filter Change",
      description: "Keep your engine running smoothly with regular oil and filter replacement.",
      specs: "Synthetic / Semi-synth · OEM Filter",
    },
    {
      category: "Handling & Grip",
      title: "Tyre & Wheel Service",
      description: "Tyre inspection, replacement, balancing, and wheel alignment.",
      specs: "3D Laser Alignment · Dynamic Balancing",
    },
  ];

  return (
    <section id="services" className="w-full py-16 bg-slate-50/60 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-2 block">
            Comprehensive Care
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Popular Services
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Professional services for your vehicle, all in one place.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv) => (
            <div
              key={srv.title}
              className="flex flex-col justify-between bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-blue-300 transition-all group"
            >
              <div>
                {/* Category Badge */}
                <div className="inline-block px-2.5 py-1 rounded-md bg-slate-100 group-hover:bg-blue-50 text-[11px] font-semibold text-slate-600 group-hover:text-blue-600 transition-colors mb-4 border border-slate-200/60">
                  {srv.category}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {srv.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {srv.description}
                </p>
              </div>

              <div>
                {/* Specs / Highlights */}
                <div className="py-2.5 px-3 bg-slate-50 rounded-lg text-xs font-medium text-slate-700 mb-4 border border-slate-100 flex items-center justify-between">
                  <span>{srv.specs}</span>
                </div>

                {/* View Service Link */}
                <button
                  type="button"
                  onClick={() => onSelectService(srv.title)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 group-hover:translate-x-0.5 transition-all cursor-pointer"
                >
                  <span>View Service</span>
                  <span aria-hidden="true">&rarr;</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Services CTA Button */}
        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-sm font-bold shadow-xs hover:shadow transition-all group"
          >
            <span>Explore All 7+ Specialized Workshop Services</span>
            <span className="text-blue-600 group-hover:translate-x-1 transition-transform">
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
