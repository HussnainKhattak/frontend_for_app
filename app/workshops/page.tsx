"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import BookingQuoteForm from "@/app/components/workshop/BookingQuoteForm";
import BookingModal from "@/app/components/BookingModal";
import SignupModal from "@/app/components/SignupModal";
import {
  MapPinIcon,
  PhoneIcon,
  ClockIcon,
  ShieldCheckIcon,
  WrenchIcon,
  CheckIcon,
  EyeIcon,
  CpuChipIcon,
  BoltIcon,
} from "@/app/components/Icons";

export default function WorkshopsPage() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const workshopBays = [
    {
      bayNumber: "Bay 01",
      title: "Starter & Alternator Testing Lab",
      category: "Electrical Specialty",
      description: "Equipped with 300A high-amperage dyno test benches, commutator resurfacing micro-lathes, and armature growler testers for precision rebuilds.",
      image: "/images/workshop/gallery-1.jpg",
      equipment: ["300A High-Load Dyno Bench", "Precision Commutator Lathe", "Grade-H Copper Rewinding Station"],
      leadTechnician: "Tariq Mahmood (Master Electrician)",
    },
    {
      bayNumber: "Bay 02",
      title: "Computerized ECU & Diagnostics Bay",
      category: "Electronics & Sensors",
      description: "Dedicated to dealer-level electronic troubleshooting, ECU coding, live sensor telemetry, and pinpointing complex intermittent wiring harness issues.",
      image: "/images/workshop/gallery-4.jpg",
      equipment: ["Autel MaxiSys Diagnostic System", "Dual-Channel Digital Oscilloscope", "Smoke Pro Vacuum Leak Detector"],
      leadTechnician: "Imran Khan (Diagnostics Specialist)",
    },
    {
      bayNumber: "Bay 03",
      title: "Express Periodic Maintenance Lane",
      category: "Routine Care",
      description: "Rapid turnaround lane for 32-point inspection, synthetic engine oil flushes, filter replacements, and electronic throttle decarbonization.",
      image: "/images/workshop/gallery-5.jpg",
      equipment: ["Rotary Hydraulic 2-Post Lift", "Pneumatic Oil Extractor", "Digital Torque Wrenches"],
      leadTechnician: "Bilal Aslam (Maintenance Lead)",
    },
    {
      bayNumber: "Bay 04",
      title: "Brake Caliper & Rotor Lathe Station",
      category: "Brake Systems",
      description: "Equipped with on-car and off-car disc rotor precision lathes to eliminate brake judder and pedal pulsation. Ceramic brake pad fitting and ABS bleeding.",
      image: "/images/workshop/gallery-6.jpg",
      equipment: ["Pro-Cut Disc Rotor Lathe", "Pneumatic Caliper Press", "Pressurized DOT 4 Bleeder"],
      leadTechnician: "Rizwan Shah (Brake Specialist)",
    },
    {
      bayNumber: "Bay 05",
      title: "Automotive AC & Climate Control Bay",
      category: "Climate Systems",
      description: "Automated refrigerant recovery, 250 PSI nitrogen leak pressure testing, compressor clutch electromagnetic rebuilding, and pure R134a charging.",
      image: "/images/workshop/network-facility.jpg",
      equipment: ["Robinair Automated Recovery Station", "250 PSI Nitrogen Leak Rig", "Digital Vent Temp Probes"],
      leadTechnician: "Naveed Ahmed (Climate Specialist)",
    },
    {
      bayNumber: "Bay 06",
      title: "Engine & Transmission Overhaul Station",
      category: "Mechanical Systems",
      description: "Heavy mechanical station equipped for timing adjustments, fuel injector ultrasonic bath balancing, and CVT / Automatic transmission fluid flushes.",
      image: "/images/workshop/gallery-3.jpg",
      equipment: ["Ultrasonic Fuel Injector Flow Bench", "Engine Support Bar & Crane", "Transmission Fluid Flushing Machine"],
      leadTechnician: "Asif Javed (Engine Master)",
    },
  ];

  const handleScrollToBooking = () => {
    const el = document.getElementById("workshop-booking");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        onBookServiceClick={() => setIsBookingModalOpen(true)}
        onSignupClick={() => setIsSignupModalOpen(true)}
      />

      <main className="flex-1 w-full">
        {/* Light Hero Section matching HeroSection.tsx */}
        <section className="relative w-full pt-10 pb-12 sm:pt-14 sm:pb-16 md:pt-16 md:pb-20 bg-gradient-to-b from-slate-50/80 via-white to-slate-50/40 border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Category Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-3 sm:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-[11px] sm:text-xs font-bold tracking-widest text-blue-600 uppercase">
                Workshop Facilities
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 max-w-3xl mx-auto leading-tight">
              Our Specialized Workshop Bays &amp; Facility
            </h1>

            {/* Subtitle */}
            <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Step inside the regional specialist center for Starter, Alternator, and Auto Electrical repairs. Six engineered service bays equipped with precision diagnostic machinery.
            </p>

            {/* Action Buttons */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
              <button
                type="button"
                onClick={handleScrollToBooking}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer text-center"
              >
                Reserve a Workshop Bay
              </button>

              <Link
                href="/services"
                className="px-6 py-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-colors text-center"
              >
                Explore Services &amp; Rates
              </Link>
            </div>

            {/* 4 Stats Cards matching NetworkSection.tsx */}
            <div className="mt-8 sm:mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
              <div className="p-3 sm:p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs text-left">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2 sm:mb-2.5">
                  <WrenchIcon className="w-4 h-4" />
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl font-black text-blue-600">6 Bays</div>
                <div className="text-[11px] sm:text-xs font-medium text-slate-500 mt-0.5 truncate">Specialized Stations</div>
              </div>

              <div className="p-3 sm:p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs text-left">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2 sm:mb-2.5">
                  <ShieldCheckIcon className="w-4 h-4" />
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl font-black text-blue-600">15+</div>
                <div className="text-[11px] sm:text-xs font-medium text-slate-500 mt-0.5 truncate">Certified Technicians</div>
              </div>

              <div className="p-3 sm:p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs text-left">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2 sm:mb-2.5">
                  <CpuChipIcon className="w-4 h-4" />
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl font-black text-blue-600">100%</div>
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

        {/* 6 Specialized Workshop Bays Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-16">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-2 block">
              Facility Tour
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Explore Our Service Bays
            </h2>
            <p className="mt-2 text-xs sm:text-sm md:text-base text-slate-600">
              Each vehicle is routed to a purpose-built station equipped with specialized tools and supervised by certified technicians.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {workshopBays.map((bay) => (
              <div
                key={bay.bayNumber}
                className="flex flex-col justify-between bg-white rounded-2xl p-4 sm:p-5 md:p-6 border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-blue-300 transition-all group"
              >
                <div>
                  {/* Bay Image */}
                  <div className="relative w-full h-40 sm:h-44 rounded-xl overflow-hidden mb-4 bg-slate-100 border border-slate-100">
                    <Image
                      src={bay.image}
                      alt={bay.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    
                    <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-blue-600 text-white text-[10px] sm:text-[11px] font-bold tracking-wider">
                      {bay.bayNumber}
                    </div>

                    <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 sm:left-3 text-xs font-semibold text-slate-200">
                      {bay.category}
                    </div>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {bay.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {bay.description}
                  </p>

                  {/* Equipment Checklist */}
                  <div className="py-2.5 px-3 bg-slate-50 rounded-lg text-xs font-medium text-slate-700 mb-4 border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                      Station Machinery:
                    </span>
                    <ul className="space-y-1">
                      {bay.equipment.map((eq, i) => (
                        <li key={i} className="flex items-center gap-1.5 text-xs text-slate-600 min-w-0">
                          <CheckIcon className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span className="truncate min-w-0">{eq}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Station Lead:</span>
                  <span className="font-semibold text-slate-800">{bay.leadTechnician}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Customer Lounge & Facility Amenities */}
        <section className="w-full bg-slate-50/60 border-y border-slate-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: Features */}
              <div className="lg:col-span-7">
                <span className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-2 block">
                  Customer Experience
                </span>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Air-Conditioned Waiting Lounge with Live Bay Views
                </h2>
                <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                  While our specialists service your vehicle, relax in our executive customer lounge. We believe in 100% transparency, offering direct glass viewing windows overlooking each repair bay.
                </p>

                <div className="grid grid-cols-2 gap-4 mt-8 max-w-lg">
                  <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                      <ClockIcon className="w-4 h-4" />
                    </div>
                    <div className="text-xs font-bold text-slate-900">Complimentary Cafe</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Tea, coffee, and water</div>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                      <CpuChipIcon className="w-4 h-4" />
                    </div>
                    <div className="text-xs font-bold text-slate-900">High-Speed Wi-Fi</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Workstation &amp; charging</div>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                      <EyeIcon className="w-4 h-4" />
                    </div>
                    <div className="text-xs font-bold text-slate-900">Live Glass Viewing</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Watch your vehicle repair</div>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                      <ShieldCheckIcon className="w-4 h-4" />
                    </div>
                    <div className="text-xs font-bold text-slate-900">Warranty Receipt</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Official stamp &amp; test report</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Contact & Timings matching ContactSection.tsx */}
              <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
                <span className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-2 block">
                  Workshop Hours &amp; Location
                </span>
                <h3 className="text-xl font-bold text-slate-900 mb-6">
                  Visit Our Central Workshop
                </h3>

                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                      <MapPinIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-slate-500 uppercase block">Address</span>
                      <strong className="text-slate-900">Plot 12-B, Auto Commercial Market, Main Boulevard</strong>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                      <PhoneIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-slate-500 uppercase block">Direct Line</span>
                      <strong className="text-slate-900">+92 300 1234567 / 042-35890000</strong>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                      <ClockIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-slate-500 uppercase block">Operating Hours</span>
                      <strong className="text-slate-900 block">Monday &ndash; Saturday: 9:00 AM &ndash; 7:30 PM</strong>
                      <span className="text-xs text-blue-600 font-medium">Sunday: On-Call Electrical Emergency</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 flex gap-3">
                  <a
                    href="tel:+923001234567"
                    className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs text-center shadow-xs transition-colors"
                  >
                    Call Workshop
                  </a>
                  <button
                    type="button"
                    onClick={handleScrollToBooking}
                    className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 font-semibold text-xs text-center transition-colors cursor-pointer"
                  >
                    Book a Bay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Embedded Booking / Bay Reservation Section */}
        <section id="workshop-booking" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-2 block">
              Bay Reservation
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Reserve Your Workshop Bay Appointment
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Skip the waiting queue. Select your preferred vehicle service and reserve a bay slot with our master technicians.
            </p>
          </div>

          <BookingQuoteForm initialServiceSlug="starter-motor-repair" />
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        defaultService="Starter Motor Diagnostics, Repair & Rebuild"
      />

      {/* Signup Modal */}
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
      />
    </div>
  );
}
