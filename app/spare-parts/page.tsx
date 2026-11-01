"use client";

import {
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import BookingModal from "@/app/components/BookingModal";
import SignupModal from "@/app/components/SignupModal";
import { ShopContext } from "@/app/context/ShopContext";
import ProductCard from "@/app/components/spare-parts/ProductCard";

const ITEMS_PER_PAGE = 12;

const boxClass =
  "rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm";
const boxTitleClass =
  "mb-4 text-xs font-bold uppercase tracking-wider text-slate-900";
const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 focus:border-blue-600 focus:outline-none disabled:bg-slate-100";
const pageButtonClass =
  "h-9 min-w-9 cursor-pointer rounded-lg border px-2 text-sm disabled:cursor-not-allowed disabled:opacity-40";

const SpareParts = () => {
  const { products, categories, brands, addToCart } = useContext(ShopContext);

  // 1. STATE VARIABLES
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string[]>([]);
  const [brand, setBrand] = useState<string[]>([]);
  const [availability, setAvailability] = useState<string[]>([]);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOption, setSortOption] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  // 2. HELPER FUNCTIONS
  const toggleValue = (
    setList: Dispatch<SetStateAction<string[]>>,
    value: string,
  ) => {
    setList((prevList) =>
      prevList.includes(value)
        ? prevList.filter((item) => item !== value)
        : [...prevList, value],
    );
  };

  const clearAllFilters = () => {
    setSearch("");
    setCategory([]);
    setBrand([]);
    setAvailability([]);
    setMake("");
    setModel("");
    setYear("");
    setMinPrice("");
    setMaxPrice("");
  };

  // 3. FILTERING LOGIC
  let filterProducts = products.slice();

  if (search.trim() !== "") {
    const text = search.trim().toLowerCase();
    filterProducts = filterProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(text) ||
        product.sku.toLowerCase().includes(text) ||
        product.brand.toLowerCase().includes(text),
    );
  }

  if (category.length > 0) {
    filterProducts = filterProducts.filter((item) =>
      category.includes(item.category),
    );
  }

  if (brand.length > 0) {
    filterProducts = filterProducts.filter((item) =>
      brand.includes(item.brand),
    );
  }

  if (availability.length === 1) {
    const wantInStock = availability[0] === "In Stock";
    filterProducts = filterProducts.filter(
      (item) => item.inStock === wantInStock,
    );
  }

  if (make) {
    filterProducts = filterProducts.filter(
      (item) => item.compatibility.make === make,
    );
  }

  if (model) {
    filterProducts = filterProducts.filter((item) =>
      item.compatibility.models.includes(model),
    );
  }

  if (year) {
    filterProducts = filterProducts.filter(
      (item) =>
        Number(year) >= item.compatibility.yearFrom &&
        Number(year) <= item.compatibility.yearTo,
    );
  }

  if (minPrice !== "") {
    filterProducts = filterProducts.filter(
      (item) => item.price >= Number(minPrice),
    );
  }

  if (maxPrice !== "") {
    filterProducts = filterProducts.filter(
      (item) => item.price <= Number(maxPrice),
    );
  }

  // 4. SORTING LOGIC
  if (sortOption === "price-asc") {
    filterProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === "price-desc") {
    filterProducts.sort((a, b) => b.price - a.price);
  } else if (sortOption === "name-asc") {
    filterProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

  // Reset pagination on filter change
  const filterKey = JSON.stringify([
    search,
    category,
    brand,
    availability,
    make,
    model,
    year,
    minPrice,
    maxPrice,
    sortOption,
  ]);
  const [prevFilterKey, setPrevFilterKey] = useState(filterKey);

  if (prevFilterKey !== filterKey) {
    setPrevFilterKey(filterKey);
    setCurrentPage(1);
  }

  // 5. PAGINATION LOGIC
  const totalPages = Math.ceil(filterProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const pageProducts = filterProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Sliding Window Pagination Math (Max 5 visible pages)
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, currentPage + 2);

  if (currentPage <= 3) {
    endPage = Math.min(5, totalPages);
  } else if (currentPage + 2 >= totalPages) {
    startPage = Math.max(1, totalPages - 4);
  }

  const visiblePages = [];
  for (let i = startPage; i <= endPage; i++) {
    visiblePages.push(i);
  }

  // 6. DYNAMIC DROPDOWN OPTIONS
  const modelOptions = make
    ? [
        ...new Set(
          products
            .filter((p) => p.compatibility.make === make)
            .flatMap((p) => p.compatibility.models),
        ),
      ]
    : [];

  const yearOptions: number[] = [];
  if (products.length > 0) {
    const minYear = Math.min(...products.map((p) => p.compatibility.yearFrom));
    const maxYear = Math.max(...products.map((p) => p.compatibility.yearTo));
    for (let y = maxYear; y >= minYear; y--) {
      yearOptions.push(y);
    }
  }

  // 7. REUSABLE CHECKBOX COMPONENT
  const renderCheckboxes = (
    title: string,
    optionsList: string[],
    stateVariable: string[],
    stateSetter: Dispatch<SetStateAction<string[]>>,
  ) => (
    <div className={boxClass}>
      <p className={boxTitleClass}>{title}</p>
      <div className="flex flex-col gap-3 text-sm text-slate-600">
        {optionsList.map((option) => (
          <label
            key={option}
            className="flex cursor-pointer items-center gap-3"
          >
            <input
              type="checkbox"
              className="h-4 w-4 cursor-pointer"
              value={option}
              checked={stateVariable.includes(option)}
              onChange={() => toggleValue(stateSetter, option)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </div>
  );

  // 8. RENDER
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      <Navbar
        onBookServiceClick={() => setIsBookingModalOpen(true)}
        onSignupClick={() => setIsSignupModalOpen(true)}
      />

      <main className="flex-1 w-full bg-slate-50">
        <div className="bg-slate-50">
          {/* --- Page Header --- */}
          <div className="border-b border-slate-200 bg-white px-4 py-6 text-center lg:text-left">
            <h1 className="text-3xl font-semibold text-slate-900">
              Spare Parts
            </h1>
            <p className="text-slate-500">
              Find the best parts for your vehicle.
            </p>
          </div>

          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 lg:flex-row">
            {/* --- LEFT SIDEBAR: FILTERS --- */}
            <div className="lg:w-72">
              <div className="flex items-center justify-between lg:hidden border-b pb-3 mb-4">
                <p
                  className="font-bold cursor-pointer"
                  onClick={() => setShowFilter(!showFilter)}
                >
                  FILTERS {showFilter ? "[-]" : "[+]"}
                </p>
                <button
                  onClick={clearAllFilters}
                  className="text-blue-600 text-sm"
                >
                  Clear All
                </button>
              </div>

              <div
                className={`${showFilter ? "block" : "hidden"} lg:block space-y-4`}
              >
                {/* Search Box */}
                <div className={boxClass}>
                  <p className={boxTitleClass}>Search</p>
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search parts..."
                    className={inputClass}
                  />
                </div>

                {/* Checkbox Groups */}
                {renderCheckboxes(
                  "Categories",
                  categories,
                  category,
                  setCategory,
                )}
                {renderCheckboxes("Brands", brands, brand, setBrand)}
                {renderCheckboxes(
                  "Availability",
                  ["In Stock", "Out of Stock"],
                  availability,
                  setAvailability,
                )}

                {/* Vehicle Compatibility Dropdowns */}
                <div className={boxClass}>
                  <p className={boxTitleClass}>Vehicle Compatibility</p>
                  <div className="space-y-2">
                    <select
                      value={make}
                      onChange={(e) => {
                        setMake(e.target.value);
                        setModel("");
                      }}
                      className={inputClass}
                    >
                      <option value="">Select Make</option>
                      {brands.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>

                    <select
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      disabled={!make}
                      className={inputClass}
                    >
                      <option value="">Select Model</option>
                      {modelOptions.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>

                    <select
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className={inputClass}
                    >
                      <option value="">Select Year</option>
                      {yearOptions.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Price Range */}
                <div className={boxClass}>
                  <p className={boxTitleClass}>Price</p>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className={inputClass}
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>

                <button
                  onClick={clearAllFilters}
                  className="w-full bg-slate-200 py-2 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-300 hidden lg:block"
                >
                  Reset Filters
                </button>
              </div>
            </div>

            {/* --- RIGHT SIDE: PRODUCTS & PAGINATION --- */}
            <div className="flex-1">
              <div className="mb-6 flex justify-between items-center">
                <p className="text-sm font-medium text-slate-600">
                  Showing {pageProducts.length} of {filterProducts.length}{" "}
                  products
                </p>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="p-2 border rounded-xl text-sm"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price (Low to High)</option>
                  <option value="price-desc">Price (High to Low)</option>
                  <option value="name-asc">Name (A-Z)</option>
                </select>
              </div>

              {/* Product Grid */}
              {pageProducts.length > 0 ? (
                <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4">
                  {pageProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={() => addToCart(product.id)}
                    />
                  ))}
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-slate-200/90 shadow-xs max-w-xl mx-auto">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 text-2xl">
                    ⚙️
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">No spare parts available yet</h3>
                  <p className="mt-1 text-sm text-slate-500 max-w-md mx-auto">
                    Our genuine spare parts inventory is currently being updated. Please check back soon or contact our workshop directly for part inquiries.
                  </p>
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-xl border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900">No products found</h3>
                  <p className="mt-1 text-sm text-slate-500">No spare parts match your current filter criteria.</p>
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="mt-4 inline-block text-xs font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-8 flex flex-wrap justify-center gap-2">
                  {/* First Button */}
                  <button
                    onClick={() => goToPage(1)}
                    disabled={currentPage === 1}
                    className={pageButtonClass}
                    title="First Page"
                  >
                    &laquo; First
                  </button>

                  {/* Prev Button */}
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={pageButtonClass}
                  >
                    Prev
                  </button>

                  {/* Visible Page Numbers */}
                  {visiblePages.map((page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`${pageButtonClass} ${page === currentPage ? "bg-blue-600 text-white" : "bg-white"}`}
                    >
                      {page}
                    </button>
                  ))}

                  {/* Next Button */}
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={pageButtonClass}
                  >
                    Next
                  </button>

                  {/* Last Button */}
                  <button
                    onClick={() => goToPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className={pageButtonClass}
                    title="Last Page"
                  >
                    Last &raquo;
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        defaultService="Starter Motor Diagnostics, Repair & Rebuild"
      />

      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
      />
    </div>
  );
};

export default SpareParts;
