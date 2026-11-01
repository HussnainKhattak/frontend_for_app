import React from "react";
import Link from "next/link";
import { AutoProLogo, PhoneIcon, MailIcon, MapPinIcon, ShieldCheckIcon } from "./Icons";

export default function Footer() {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Cars", href: "#cars" },
    { name: "Services", href: "#services" },
    { name: "Spare Parts", href: "/spare-parts" },
    { name: "Gallery", href: "#gallery" },
    { name: "About Us", href: "#about" },
    { name: "Contact", href: "#contact" },
    { name: "FAQ", href: "#faq" },
  ];

  const serviceLinks = [
    { name: "Vehicle Maintenance", href: "#services" },
    { name: "Engine Diagnostics", href: "#services" },
    { name: "Brake Service", href: "#services" },
    { name: "AC & Electrical", href: "#services" },
    { name: "Tyre & Wheel Service", href: "#services" },
  ];

  return (
    <footer className="w-full bg-[#0a1128] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info Column */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <AutoProLogo className="w-9 h-9" />
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-white leading-none">
                  AutoPro
                </span>
                <span className="text-[9px] font-bold tracking-wider text-slate-400 uppercase mt-0.5">
                  Automotive Workshop
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Professional automotive services and expert vehicle care.
            </p>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300">
              <ShieldCheckIcon className="w-3.5 h-3.5 text-blue-400" />
              <span>Certified Automotive Workshop</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold tracking-wider text-white uppercase mb-4">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
              {quickLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-slate-400 hover:text-white transition-colors py-1"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold tracking-wider text-white uppercase mb-4">
              Services
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors py-0.5 block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold tracking-wider text-white uppercase mb-4">
              Contact
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-slate-400">
              <a
                href="tel:+923001234567"
                className="hover:text-white flex items-center gap-2 transition-colors"
              >
                <PhoneIcon className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>+92 300 1234567</span>
              </a>
              <a
                href="mailto:info@autopro.com"
                className="hover:text-white flex items-center gap-2 transition-colors"
              >
                <MailIcon className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>info@autopro.com</span>
              </a>
              <div className="flex items-start gap-2">
                <MapPinIcon className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span>123 Main Industrial Road</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; 2026 AutoPro. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href="#privacy" className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </a>
            <span>&bull;</span>
            <a href="#terms" className="hover:text-slate-400 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
