"use client";

import React from "react";
import { WORKSHOP_CATEGORIES, WorkshopCategory } from "@/app/data/servicesData";
import { SearchIcon, XIcon, FilterIcon } from "@/app/components/Icons";

interface ServiceFiltersProps {
  selectedCategory: string;
  onSelectCategory: (category: WorkshopCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  totalResults: number;
}

export default function ServiceFilters({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  totalResults,
}: ServiceFiltersProps) {
  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/90 p-3.5 sm:p-5 shadow-xs mb-8">
      {/* Top Search Bar & Sort Row */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4 pb-4 sm:pb-5 border-b border-slate-100">
        {/* Search Input */}
        <div className="relative flex-1 min-w-0">
          <div className="absolute inset-y-0 left-0 pl-3 sm:pl-3.5 flex items-center pointer-events-none text-slate-400">
            <SearchIcon className="w-4 h-4 text-blue-600" />
          </div>
          <input
            type="text"
            placeholder="Search by service or symptoms (e.g. starter, alternator, clicking noise)..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 sm:pl-10 pr-8 sm:pr-9 py-2 sm:py-2.5 text-xs sm:text-sm bg-slate-50 hover:bg-slate-100/60 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-slate-800 placeholder-slate-400 font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute inset-y-0 right-0 pr-2.5 sm:pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
              title="Clear search"
            >
              <XIcon className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Controls & Counter */}
        <div className="flex items-center justify-between md:justify-end gap-2 sm:gap-3 flex-wrap sm:flex-nowrap shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <label htmlFor="service-sort" className="text-xs font-semibold text-slate-500 whitespace-nowrap">
              Sort:
            </label>
            <select
              id="service-sort"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg py-1.5 sm:py-2 px-2.5 sm:px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="recommended">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          <span className="text-xs font-semibold px-2 sm:px-2.5 py-1 sm:py-1.5 bg-blue-50 text-blue-700 rounded-lg border border-blue-100 whitespace-nowrap">
            {totalResults} {totalResults === 1 ? "Service" : "Services"}
          </span>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="pt-3.5 sm:pt-4 max-w-full overflow-hidden">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 sm:mb-3">
          <FilterIcon className="w-3.5 h-3.5 text-blue-600" />
          <span>Filter by Service Category</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar touch-pan-x">
          {WORKSHOP_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onSelectCategory(cat)}
                className={`text-xs font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-xs font-semibold ring-2 ring-blue-600/30"
                    : "bg-slate-100 hover:bg-slate-200/80 text-slate-700 border border-slate-200/60"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
