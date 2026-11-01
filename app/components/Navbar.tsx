"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { getCartCount } from "@/lib/cart";
import { getActiveSession, logoutSession } from "@/lib/auth";
import {
  UserIcon,
  ShoppingCartIcon,
  MenuIcon,
  XIcon,
  ChevronDownIcon,
  WrenchIcon,
  CalendarIcon,
  BoltIcon,
  CpuChipIcon,
  ShieldCheckIcon,
  CheckIcon,
} from "./Icons";

interface NavbarProps {
  onBookServiceClick?: () => void;
  onSignupClick?: () => void;
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

export default function Navbar({
  onBookServiceClick,
  onSignupClick,
  isAuthenticated: propIsAuthenticated,
  onLogout,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState<number>(0);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();
  const servicesContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      if (propIsAuthenticated !== undefined) {
        setIsAuthenticated(propIsAuthenticated);
      } else {
        const session = getActiveSession();
        setIsAuthenticated(session !== null);
      }
    };

    checkAuth();

    const handleAuthUpdate = () => {
      checkAuth();
    };

    window.addEventListener("auth-updated", handleAuthUpdate);
    window.addEventListener("storage", handleAuthUpdate);
    return () => {
      window.removeEventListener("auth-updated", handleAuthUpdate);
      window.removeEventListener("storage", handleAuthUpdate);
    };
  }, [propIsAuthenticated]);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      logoutSession();
    }
  };

  useEffect(() => {
    setCartCount(getCartCount());
    const handleCartUpdate = () => {
      setCartCount(getCartCount());
    };
    window.addEventListener("cart-updated", handleCartUpdate);
    window.addEventListener("storage", handleCartUpdate);
    return () => {
      window.removeEventListener("cart-updated", handleCartUpdate);
      window.removeEventListener("storage", handleCartUpdate);
    };
  }, []);

  useEffect(() => {
    if (!servicesMenuOpen) return;

    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (
        servicesContainerRef.current &&
        !servicesContainerRef.current.contains(e.target as Node)
      ) {
        setServicesMenuOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setServicesMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [servicesMenuOpen]);

  const handleBookClick = () => {
    setServicesMenuOpen(false);
    setMobileMenuOpen(false);
    if (onBookServiceClick) {
      onBookServiceClick();
    } else {
      router.push("/book-service");
    }
  };

  const isServicesActive = pathname?.startsWith("/services") || pathname === "/book-service";

  return (
    <header className="w-full z-40 sticky top-0 bg-white">
      {/* Main Navbar */}
      <nav className="w-full bg-white border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 shrink-0">
              <Image
                src="/logo.jpg"
                alt="PANJTAN PAK AUTO"
                fill
                sizes="48px"
                className="object-contain group-hover:scale-105 transition-transform"
                priority
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm sm:text-base md:text-lg font-black tracking-tight text-slate-900 leading-none truncate">
                PANJTAN PAK AUTO
              </span>
              <span className="text-[8px] sm:text-[9px] font-bold tracking-wider text-slate-500 uppercase mt-0.5 truncate">
                STARTER &amp; ALTERNATOR SPECIALIST
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-7">
            {/* Home */}
            <Link
              href="/"
              className={`text-sm font-medium transition-colors relative py-2 ${
                pathname === "/" ? "text-blue-600 font-semibold" : "text-slate-700 hover:text-blue-600"
              }`}
            >
              Home
              {pathname === "/" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
              )}
            </Link>

            {/* Services with Integrated Mega Menu */}
            <div
              ref={servicesContainerRef}
              className="relative py-2"
            >
              <button
                type="button"
                onClick={() => setServicesMenuOpen((prev) => !prev)}
                className={`text-sm font-medium transition-colors flex items-center gap-1.5 py-1 ${
                  isServicesActive
                    ? "text-blue-600 font-semibold"
                    : "text-slate-700 hover:text-blue-600"
                }`}
                aria-expanded={servicesMenuOpen}
                aria-haspopup="true"
              >
                <span>Services</span>
                <ChevronDownIcon
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    servicesMenuOpen ? "rotate-180 text-blue-600" : "text-slate-400"
                  }`}
                />
                {isServicesActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>

              {/* Mega Menu Dropdown */}
              {servicesMenuOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/3 xl:-translate-x-1/2 pt-2 z-50">
                  <div className="w-[620px] max-w-[calc(100vw-3rem)] bg-white rounded-2xl border border-slate-200/90 shadow-2xl p-5 lg:p-6 grid grid-cols-12 gap-5 animate-in fade-in zoom-in-95 duration-150">
                    {/* Left Column: Workshop Services (7 cols) */}
                    <div className="col-span-7 flex flex-col justify-between pr-4 border-r border-slate-100">
                      <div>
                        <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase block mb-3">
                          Workshop Services Directory
                        </span>

                        <div className="space-y-2.5">
                          {/* Item 1 */}
                          <Link
                            href="/services/starter-motor-repair"
                            onClick={() => setServicesMenuOpen(false)}
                            className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                              <BoltIcon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                Starter Motor Repair &amp; Rebuild
                              </div>
                              <p className="text-[11px] text-slate-500 leading-snug">
                                Bench dyno testing, armature rewinding &amp; solenoid repair.
                              </p>
                            </div>
                          </Link>

                          {/* Item 2 */}
                          <Link
                            href="/services/alternator-testing-rewinding"
                            onClick={() => setServicesMenuOpen(false)}
                            className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                              <CpuChipIcon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                Alternator Testing &amp; Rewinding
                              </div>
                              <p className="text-[11px] text-slate-500 leading-snug">
                                Rectifier diode packs, IC regulators &amp; high-amp tests.
                              </p>
                            </div>
                          </Link>

                          {/* Item 3 */}
                          <Link
                            href="/services/computerized-engine-diagnostics"
                            onClick={() => setServicesMenuOpen(false)}
                            className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                              <WrenchIcon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                Computerized OBD-II Diagnostics
                              </div>
                              <p className="text-[11px] text-slate-500 leading-snug">
                                ECU scan, live telemetry sensors &amp; wiring tracing.
                              </p>
                            </div>
                          </Link>

                          {/* Item 4 */}
                          <Link
                            href="/services/complete-periodic-maintenance"
                            onClick={() => setServicesMenuOpen(false)}
                            className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                              <ShieldCheckIcon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                Periodic Maintenance &amp; Brakes
                              </div>
                              <p className="text-[11px] text-slate-500 leading-snug">
                                32-point check, synthetic oil &amp; disc rotor resurfacing.
                              </p>
                            </div>
                          </Link>
                        </div>
                      </div>

                      <div className="pt-3 mt-2 border-t border-slate-100">
                        <Link
                          href="/services"
                          onClick={() => setServicesMenuOpen(false)}
                          className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
                        >
                          <span>Explore All 8+ Services &amp; PKR Rates</span>
                          <span aria-hidden="true">&rarr;</span>
                        </Link>
                      </div>
                    </div>

                    {/* Right Column: Online Bay Reservation & Quote Card (5 cols) */}
                    <div className="col-span-5 flex flex-col justify-between bg-slate-50/80 rounded-xl border border-blue-100 p-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold tracking-wider text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded uppercase">
                            Direct Booking
                          </span>
                          <CalendarIcon className="w-4 h-4 text-blue-600" />
                        </div>

                        <h4 className="text-sm font-bold text-slate-900 leading-snug">
                          Book a Service / Request a Quote
                        </h4>
                        <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                          Schedule your preferred workshop bay appointment online or get an instant PKR price estimate.
                        </p>

                        <ul className="mt-3.5 space-y-1.5 text-[11px] text-slate-700 font-medium">
                          <li className="flex items-center gap-1.5">
                            <CheckIcon className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                            <span>Rs. 0 Advance · Pay after test</span>
                          </li>
                          <li className="flex items-center gap-1.5">
                            <CheckIcon className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                            <span>Instant price calculation</span>
                          </li>
                          <li className="flex items-center gap-1.5">
                            <CheckIcon className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                            <span>Official Written Warranty</span>
                          </li>
                        </ul>
                      </div>

                      <div className="pt-4 border-t border-slate-200/60 mt-3 space-y-2">
                        <Link
                          href="/book-service"
                          onClick={() => setServicesMenuOpen(false)}
                          className="block w-full py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs text-center rounded-lg shadow-xs hover:shadow transition-all"
                        >
                          Book an Appointment
                        </Link>
                        <Link
                          href="/workshops"
                          onClick={() => setServicesMenuOpen(false)}
                          className="block text-center text-[11px] font-semibold text-slate-600 hover:text-blue-600 transition-colors"
                        >
                          View Our 6 Specialized Bays &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Workshops */}
            <Link
              href="/workshops"
              className={`text-sm font-medium transition-colors relative py-2 ${
                pathname?.startsWith("/workshops")
                  ? "text-blue-600 font-semibold"
                  : "text-slate-700 hover:text-blue-600"
              }`}
            >
              Workshops
              {pathname?.startsWith("/workshops") && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
              )}
            </Link>

            {/* Spare Parts */}
            <Link
              href="/spare-parts"
              className={`text-sm font-medium transition-colors relative py-2 ${
                pathname?.startsWith("/spare-parts")
                  ? "text-blue-600 font-semibold"
                  : "text-slate-700 hover:text-blue-600"
              }`}
            >
              Spare Parts
              {pathname?.startsWith("/spare-parts") && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
              )}
            </Link>

            {/* Gallery */}
            <Link
              href="/#gallery"
              className="text-sm font-medium transition-colors relative py-2 text-slate-700 hover:text-blue-600"
            >
              Gallery
            </Link>

            {/* About Us */}
            <Link
              href="/#about"
              className="text-sm font-medium transition-colors relative py-2 text-slate-700 hover:text-blue-600"
            >
              About Us
            </Link>

            {/* Contact */}
            <Link
              href="/#contact"
              className="text-sm font-medium transition-colors relative py-2 text-slate-700 hover:text-blue-600"
            >
              Contact
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Cart Icon with badge */}
            <Link
              href="/cart"
              className={`relative p-2 rounded-full transition-colors ${
                pathname === "/cart"
                  ? "text-blue-600 bg-blue-50"
                  : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
              }`}
              title={`Shopping Cart (${cartCount} items)`}
            >
              <ShoppingCartIcon className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white font-bold text-[10px] min-w-4 h-4 px-1 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Authenticated State: Profile & Logout */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/profile"
                  className={`flex items-center gap-1.5 text-sm font-medium transition-colors py-2 px-2.5 rounded-lg ${
                    pathname === "/profile"
                      ? "text-blue-600 bg-blue-50 font-semibold"
                      : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                  }`}
                  title="Profile & Orders"
                >
                  <UserIcon className="w-4 h-4 text-slate-500" />
                  Profile
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-xs font-medium text-slate-500 hover:text-red-600 transition-colors py-2 px-2 rounded-lg hover:bg-slate-50 cursor-pointer"
                  title="Sign out of your account"
                >
                  Logout
                </button>
              </div>
            ) : (
              /* Logged-Out State: Only show existing Signup option */
              onSignupClick && (
                <button
                  type="button"
                  onClick={onSignupClick}
                  className="flex items-center gap-1.5 text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors py-2 px-2.5 rounded-lg hover:bg-slate-50 cursor-pointer"
                >
                  <UserIcon className="w-4 h-4 text-slate-500" />
                  Signup
                </button>
              )
            )}

            {/* Book a Service CTA Button */}
            <button
              onClick={handleBookClick}
              className="bg-blue-600 hover:bg-blue-700 active:scale-98 text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow-sm hover:shadow transition-all cursor-pointer"
            >
              Book a Service
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/cart"
              className="relative p-2 text-slate-700 hover:text-blue-600 rounded-lg"
              title="Cart"
            >
              <ShoppingCartIcon className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-blue-600 text-white font-bold text-[9px] min-w-3.5 h-3.5 px-0.5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg max-w-full overflow-hidden">
            <div className="flex flex-col space-y-1.5">
              {/* Home */}
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 text-sm font-medium rounded-lg ${
                  pathname === "/" ? "bg-blue-50 text-blue-600 font-semibold" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                Home
              </Link>

              {/* Mobile Services Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
                >
                  <span className={isServicesActive ? "text-blue-600 font-semibold" : ""}>Services &amp; Booking</span>
                  <ChevronDownIcon
                    className={`w-3.5 h-3.5 transition-transform ${
                      mobileServicesOpen ? "rotate-180 text-blue-600" : "text-slate-400"
                    }`}
                  />
                </button>

                {mobileServicesOpen && (
                  <div className="pl-4 pr-2 py-1 space-y-1 border-l-2 border-blue-100 ml-3 my-1">
                    <Link
                      href="/services"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-1.5 text-xs font-semibold text-slate-800 hover:text-blue-600"
                    >
                      All Workshop Services
                    </Link>
                    <Link
                      href="/book-service"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50/70 rounded-md"
                    >
                      <span>Book a Service / Quote</span>
                      <span className="text-[10px] font-bold text-blue-700 bg-white px-1.5 py-0.5 rounded border border-blue-200">
                        Rs. 0 Advance
                      </span>
                    </Link>
                    <Link
                      href="/services/starter-motor-repair"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-1 text-xs text-slate-600 hover:text-blue-600"
                    >
                      Starter Motor Diagnostics &amp; Repair
                    </Link>
                    <Link
                      href="/services/alternator-testing-rewinding"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-1 text-xs text-slate-600 hover:text-blue-600"
                    >
                      Alternator Diagnostics &amp; Rewinding
                    </Link>
                  </div>
                )}
              </div>

              {/* Workshops */}
              <Link
                href="/workshops"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 text-sm font-medium rounded-lg ${
                  pathname?.startsWith("/workshops")
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                Workshops
              </Link>

              {/* Spare Parts */}
              <Link
                href="/spare-parts"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 text-sm font-medium rounded-lg ${
                  pathname?.startsWith("/spare-parts")
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                Spare Parts
              </Link>

              {/* Gallery */}
              <Link
                href="/#gallery"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium rounded-lg text-slate-700 hover:bg-slate-50"
              >
                Gallery
              </Link>

              {/* About Us */}
              <Link
                href="/#about"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium rounded-lg text-slate-700 hover:bg-slate-50"
              >
                About Us
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg ${
                  pathname === "/cart"
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span className="flex items-center gap-2">
                  <ShoppingCartIcon className="w-4 h-4 text-slate-500" />
                  Cart
                </span>
                {cartCount > 0 && (
                  <span className="bg-blue-600 text-white font-bold text-xs px-2 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Profile (Only shown when authenticated) */}
              {isAuthenticated && (
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg ${
                    pathname === "/profile"
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <UserIcon className="w-4 h-4 text-slate-500" />
                  Profile &amp; Orders
                </Link>
              )}

              {/* Contact */}
              <Link
                href="/#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium rounded-lg text-slate-700 hover:bg-slate-50"
              >
                Contact
              </Link>
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-red-600 border border-red-200 rounded-lg hover:bg-red-50 cursor-pointer"
                >
                  Logout
                </button>
              ) : (
                onSignupClick && (
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onSignupClick();
                    }}
                    className="flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-slate-700 border border-slate-200 rounded-lg cursor-pointer"
                  >
                    <UserIcon className="w-4 h-4" />
                    Signup
                  </button>
                )
              )}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleBookClick();
                }}
                className="w-full py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-sm cursor-pointer"
              >
                Book a Service
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
