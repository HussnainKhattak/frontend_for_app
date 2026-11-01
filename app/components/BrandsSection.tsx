import React from "react";
import {
  ToyotaBrandIcon,
  HondaBrandIcon,
  BMWBrandIcon,
  MercedesBrandIcon,
  AudiBrandIcon,
  FordBrandIcon,
} from "./Icons";

export default function BrandsSection() {
  const brands = [
    {
      name: "Toyota",
      models: "Corolla, Yaris, Fortuner, Prado",
      Icon: ToyotaBrandIcon,
    },
    {
      name: "Honda",
      models: "Civic, City, Vezel, Accord",
      Icon: HondaBrandIcon,
    },
    {
      name: "BMW",
      models: "3 Series, 5 Series, X3, X5",
      Icon: BMWBrandIcon,
    },
    {
      name: "Mercedes-Benz",
      models: "C-Class, E-Class, GLA, GLC",
      Icon: MercedesBrandIcon,
    },
    {
      name: "Audi",
      models: "A3, A4, A6, Q5, Q7",
      Icon: AudiBrandIcon,
    },
    {
      name: "Ford",
      models: "Ranger, Mustang, EcoSport",
      Icon: FordBrandIcon,
    },
  ];

  return (
    <section id="cars" className="w-full py-12 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Brands We Service
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            OEM &amp; genuine parts support for major manufacturers
          </p>
        </div>

        {/* Brand Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {brands.map((brand) => {
            const BrandIconComponent = brand.Icon;
            return (
              <div
                key={brand.name}
                className="group flex flex-col items-center justify-between text-center p-5 rounded-xl border border-slate-200/80 bg-white hover:border-blue-300 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <div className="w-12 h-12 rounded-lg bg-slate-50 group-hover:bg-blue-50 flex items-center justify-center text-slate-700 group-hover:text-blue-600 transition-colors mb-3">
                  <BrandIconComponent className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-blue-600 transition-colors">
                  {brand.name}
                </h3>
                <p className="text-[11px] text-slate-500 leading-snug line-clamp-2">
                  {brand.models}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
