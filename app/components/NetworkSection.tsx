import React from "react";
import Image from "next/image";
import { ShieldCheckIcon } from "./Icons";

interface NetworkSectionProps {
  onExploreServices: () => void;
}

export default function NetworkSection({ onExploreServices }: NetworkSectionProps) {
  return (
    <section id="about" className="w-full py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7">
            <span className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-2 block">
              Quality Assured
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              About Our Workshop
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
              AutoPro is a fully equipped automotive workshop with over 15 years of
              experience. Our facility features modern diagnostic tools and is staffed by certified
              specialists dedicated to technical precision and honest pricing.
            </p>

            {/* Metrics */}
            <div className="mt-8 grid grid-cols-3 gap-4 max-w-lg">
              <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs">
                <div className="text-2xl sm:text-3xl font-black text-blue-600">15+</div>
                <div className="text-xs font-medium text-slate-500 mt-1">Years Experience</div>
              </div>
              <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs">
                <div className="text-2xl sm:text-3xl font-black text-blue-600">5,000+</div>
                <div className="text-xs font-medium text-slate-500 mt-1">Vehicles Serviced</div>
              </div>
              <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs">
                <div className="text-2xl sm:text-3xl font-black text-blue-600">10+</div>
                <div className="text-xs font-medium text-slate-500 mt-1">Expert Technicians</div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8">
              <button
                type="button"
                onClick={onExploreServices}
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                Explore Our Services
              </button>
            </div>
          </div>

          {/* Right Visual Image Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100 group">
              <div className="aspect-4/3 relative w-full">
                <Image
                  src="/images/workshop/network-facility.jpg"
                  alt="AutoPro Certified Facility"
                  fill
                  className="object-cover group-hover:scale-103 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>

              {/* Bottom Badge */}
              <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 bg-white/95 backdrop-blur-xs py-2 px-3.5 rounded-xl border border-slate-200 shadow-lg flex items-center gap-2 text-xs font-semibold text-slate-800">
                <ShieldCheckIcon className="w-4 h-4 text-blue-600" />
                <span>Inspected &amp; Certified Facility</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
