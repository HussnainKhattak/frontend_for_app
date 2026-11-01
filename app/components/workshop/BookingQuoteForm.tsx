"use client";

import React, { useState, useMemo } from "react";
import { WORKSHOP_SERVICES, ServiceItem } from "@/app/data/servicesData";
import {
  CheckIcon,
  PhoneIcon,
  ClockIcon,
  ShieldCheckIcon,
  BoltIcon,
  ClipboardCheckIcon,
  CalendarIcon,
  CarIcon,
  WrenchIcon,
  UserIcon,
} from "@/app/components/Icons";

interface BookingQuoteFormProps {
  initialServiceSlug?: string;
  initialMode?: "book" | "quote";
  isModal?: boolean;
  onSuccess?: () => void;
}

export default function BookingQuoteForm({
  initialServiceSlug,
  initialMode = "book",
  isModal = false,
  onSuccess,
}: BookingQuoteFormProps) {
  const [formMode, setFormMode] = useState<"book" | "quote">(initialMode);

  // Selected Service
  const [selectedSlug, setSelectedSlug] = useState<string>(
    initialServiceSlug || WORKSHOP_SERVICES[0]?.slug || "starter-motor-repair"
  );

  const currentService: ServiceItem | undefined = useMemo(() => {
    return WORKSHOP_SERVICES.find((s) => s.slug === selectedSlug) || WORKSHOP_SERVICES[0];
  }, [selectedSlug]);

  const [selectedPackageIndex, setSelectedPackageIndex] = useState<number>(0);

  // Vehicle Information
  const [make, setMake] = useState("Toyota");
  const [modelYear, setModelYear] = useState("Corolla 2021 (1.6L Petrol)");
  const [mileage, setMileage] = useState("65,000 km");

  // Booking Schedule
  const [date, setDate] = useState("2026-10-22");
  const [timeSlot, setTimeSlot] = useState("Morning (09:00 AM - 12:00 PM)");
  const [workshopBay, setWorkshopBay] = useState("Bay 01 (Starter & Alternator Testing Lab)");

  // Customer Contact
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Lahore");
  const [issueNotes, setIssueNotes] = useState("");

  // Form State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRefId, setBookingRefId] = useState("");

  // Price calculations in PKR
  const chosenPackage = useMemo(() => {
    return (
      currentService?.packages?.[selectedPackageIndex] || {
        name: "Standard Service",
        price: currentService?.startingPrice || 3500,
      }
    );
  }, [currentService, selectedPackageIndex]);

  const formattedEstimatedPrice = new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(chosenPackage.price);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const randomCode = `PPA-${Math.floor(1000 + Math.random() * 9000)}`;
      setBookingRefId(randomCode);
      setIsSubmitting(false);
      setIsSubmitted(true);
      if (onSuccess) onSuccess();
    }, 600);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setCustomerName("");
    setPhone("");
    setIssueNotes("");
  };

  // WhatsApp Message Generator
  const whatsappUrl = useMemo(() => {
    const text = encodeURIComponent(
      `Assalam o Alaikum Panjtan Pak Auto!\n\nI have submitted a ${
        formMode === "book" ? "Service Booking" : "Quote Request"
      } (Ref: ${bookingRefId}):\n- Vehicle: ${make} ${modelYear}\n- Service: ${currentService?.title}\n- Package: ${
        chosenPackage.name
      } (Est: ${formattedEstimatedPrice})\n- Date & Slot: ${date} (${timeSlot})\n- Customer: ${customerName} (${phone})\n- Notes: ${
        issueNotes || "Standard inspection"
      }\n\nPlease confirm my slot!`
    );
    return `https://wa.me/923001234567?text=${text}`;
  }, [
    formMode,
    bookingRefId,
    make,
    modelYear,
    currentService,
    chosenPackage,
    formattedEstimatedPrice,
    date,
    timeSlot,
    customerName,
    phone,
    issueNotes,
  ]);

  if (isSubmitted) {
    return (
      <div className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 sm:p-8 text-center animate-in fade-in duration-300">
        <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckIcon className="w-7 h-7" />
        </div>

        <span className="inline-block px-3 py-1 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold rounded-full mb-2">
          {formMode === "book" ? "Appointment Reserved" : "Quote Request Received"}
        </span>

        <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          {formMode === "book" ? "Your Service is Scheduled!" : "Quote Generated Successfully!"}
        </h3>

        <p className="mt-2 text-sm text-slate-600 max-w-lg mx-auto">
          Thank you, <span className="font-semibold text-slate-900">{customerName || "Valued Customer"}</span>. Your appointment has been logged in our workshop dispatch system.
        </p>

        {/* Reference Code Card */}
        <div className="mt-6 max-w-md mx-auto p-5 bg-slate-50 border border-slate-200/90 rounded-2xl text-left space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Reference Number</span>
              <div className="text-lg font-black text-blue-600">{bookingRefId}</div>
            </div>
            <span className="text-xs px-2.5 py-1 bg-blue-100 text-blue-800 font-semibold rounded-lg">
              AutoPro Workshop
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
            <div>
              <span className="text-slate-400 block">Vehicle:</span>
              <strong className="text-slate-800">{make} {modelYear}</strong>
            </div>
            <div>
              <span className="text-slate-400 block">Service:</span>
              <strong className="text-slate-800 truncate block">{currentService?.title}</strong>
            </div>
            <div>
              <span className="text-slate-400 block">Date &amp; Slot:</span>
              <strong className="text-slate-800">{date} · {timeSlot.split("(")[0]}</strong>
            </div>
            <div>
              <span className="text-slate-400 block">Estimated Cost:</span>
              <strong className="text-blue-600 font-bold">{formattedEstimatedPrice}</strong>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Warranty Coverage:</span>
            <span className="font-semibold text-blue-700">{currentService?.warranty}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 max-w-md mx-auto flex flex-col sm:flex-row gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-all shadow-sm"
          >
            <PhoneIcon className="w-4 h-4" />
            Send to WhatsApp
          </a>

          <button
            type="button"
            onClick={handleReset}
            className="py-3 px-5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-sm rounded-xl transition-all cursor-pointer"
          >
            New Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden ${isModal ? "p-3 sm:p-5" : "p-4 sm:p-6 md:p-8"}`}>
      {/* Top Form Header & Mode Switch */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-5 sm:pb-6 border-b border-slate-100">
        <div>
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-blue-600 block mb-1">
            Panjtan Pak Auto Workshop
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {formMode === "book" ? "Book a Workshop Service" : "Request a Price Quote"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Specialist diagnosis, transparent pricing in PKR, and verified warranty.
          </p>
        </div>

        {/* Dual Mode Switch */}
        <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200/80 w-full sm:w-auto shrink-0">
          <button
            type="button"
            onClick={() => setFormMode("book")}
            className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              formMode === "book"
                ? "bg-white text-blue-600 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <BoltIcon className="w-3.5 h-3.5" />
            <span>Book Service</span>
          </button>
          <button
            type="button"
            onClick={() => setFormMode("quote")}
            className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              formMode === "quote"
                ? "bg-white text-blue-600 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <ClipboardCheckIcon className="w-3.5 h-3.5" />
            <span>Request Quote</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        {/* Step 1: Vehicle Information */}
        <div>
          <label className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5 mb-3">
            <CarIcon className="w-4 h-4 text-blue-600" />
            <span>1. Vehicle Information</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Vehicle Make *
              </label>
              <select
                value={make}
                onChange={(e) => setMake(e.target.value)}
                className="w-full text-xs sm:text-sm border border-slate-200 rounded-xl p-2.5 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium transition-colors"
              >
                <option value="Toyota">Toyota</option>
                <option value="Honda">Honda</option>
                <option value="Suzuki">Suzuki</option>
                <option value="Hyundai">Hyundai</option>
                <option value="KIA">KIA</option>
                <option value="Nissan">Nissan</option>
                <option value="Daihatsu">Daihatsu</option>
                <option value="BMW">BMW</option>
                <option value="Mercedes-Benz">Mercedes-Benz</option>
                <option value="Other">Other Make</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Model &amp; Year *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Corolla Altis 2021"
                value={modelYear}
                onChange={(e) => setModelYear(e.target.value)}
                className="w-full text-xs sm:text-sm border border-slate-200 rounded-xl p-2.5 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Approx. Mileage (km)
              </label>
              <input
                type="text"
                placeholder="e.g. 60,000 km"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
                className="w-full text-xs sm:text-sm border border-slate-200 rounded-xl p-2.5 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Step 2: Service & Package Selection */}
        <div className="pt-2">
          <label className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5 mb-3">
            <WrenchIcon className="w-4 h-4 text-blue-600" />
            <span>2. Service &amp; Package Tier</span>
          </label>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Primary Service Required *
              </label>
              <select
                value={selectedSlug}
                onChange={(e) => {
                  setSelectedSlug(e.target.value);
                  setSelectedPackageIndex(0);
                }}
                className="w-full text-xs sm:text-sm border border-slate-200 rounded-xl p-2.5 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium transition-colors"
              >
                {WORKSHOP_SERVICES.map((srv) => (
                  <option key={srv.slug} value={srv.slug}>
                    [{srv.category}] — {srv.title} (Starting Rs. {srv.startingPrice.toLocaleString()})
                  </option>
                ))}
              </select>
            </div>

            {/* Package selector pills */}
            {currentService && currentService.packages && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Choose Service Package:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {currentService.packages.map((pkg, idx) => (
                    <button
                      key={pkg.name}
                      type="button"
                      onClick={() => setSelectedPackageIndex(idx)}
                      className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                        selectedPackageIndex === idx
                          ? "bg-blue-50/70 border-blue-600 ring-2 ring-blue-600/20"
                          : "bg-slate-50/70 border-slate-200/90 hover:bg-slate-100"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">{pkg.name}</span>
                        {pkg.popular && (
                          <span className="text-[9px] bg-blue-600 text-white px-1.5 py-0.5 rounded font-bold">
                            POPULAR
                          </span>
                        )}
                      </div>
                      <div className="text-sm font-extrabold text-blue-600 mt-1">
                        Rs. {pkg.price.toLocaleString()}
                      </div>
                      <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {pkg.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Step 3: Date & Preferred Bay (if booking) or Issue description */}
        <div className="pt-2">
          <label className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5 mb-3">
            <CalendarIcon className="w-4 h-4 text-blue-600" />
            <span>3. {formMode === "book" ? "Appointment Scheduling" : "Vehicle Symptoms & Details"}</span>
          </label>

          {formMode === "book" ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full text-xs sm:text-sm border border-slate-200 rounded-xl p-2.5 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Time Slot *
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full text-xs sm:text-sm border border-slate-200 rounded-xl p-2.5 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium transition-colors"
                >
                  <option value="Morning (09:00 AM - 12:00 PM)">Morning (09:00 AM - 12:00 PM)</option>
                  <option value="Afternoon (12:00 PM - 03:00 PM)">Afternoon (12:00 PM - 03:00 PM)</option>
                  <option value="Evening (03:00 PM - 06:30 PM)">Evening (03:00 PM - 06:30 PM)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Workshop Bay
                </label>
                <select
                  value={workshopBay}
                  onChange={(e) => setWorkshopBay(e.target.value)}
                  className="w-full text-xs sm:text-sm border border-slate-200 rounded-xl p-2.5 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium transition-colors"
                >
                  <option value="Bay 01 (Starter & Alternator Testing Lab)">Bay 01 (Starter &amp; Alternator)</option>
                  <option value="Bay 02 (Computerized Diagnostics & OBD)">Bay 02 (Diagnostics &amp; OBD)</option>
                  <option value="Bay 03 (Express Maintenance & Oil Service)">Bay 03 (Maintenance Lane)</option>
                  <option value="Bay 04 (Brake Caliper & Rotor Lathe)">Bay 04 (Brakes &amp; Rotors)</option>
                </select>
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Describe the problem or abnormal sounds/symptoms:
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Starter makes a single loud click when turning key, battery light flickers..."
                value={issueNotes}
                onChange={(e) => setIssueNotes(e.target.value)}
                className="w-full text-xs sm:text-sm border border-slate-200 rounded-xl p-2.5 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>
          )}
        </div>

        {/* Step 4: Contact Details */}
        <div className="pt-2">
          <label className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5 mb-3">
            <UserIcon className="w-4 h-4 text-blue-600" />
            <span>4. Customer Contact</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Muhammad Ali"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full text-xs sm:text-sm border border-slate-200 rounded-xl p-2.5 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Phone / WhatsApp Number *
              </label>
              <input
                type="tel"
                required
                placeholder="e.g. 0300 1234567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full text-xs sm:text-sm border border-slate-200 rounded-xl p-2.5 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                City / Location
              </label>
              <input
                type="text"
                placeholder="e.g. Lahore / Karachi"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full text-xs sm:text-sm border border-slate-200 rounded-xl p-2.5 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Live Estimator Summary Box (Light Card matching site) */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-50 via-blue-50/20 to-slate-50 border border-slate-200/90 rounded-2xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold tracking-wider uppercase text-blue-600 block">
              Transparent Estimate Summary
            </span>
            <div className="text-lg sm:text-xl md:text-2xl font-extrabold text-slate-900">
              Estimated Total: <span className="text-blue-600">{formattedEstimatedPrice}</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1 font-medium text-slate-700">
                <ClockIcon className="w-3.5 h-3.5 text-blue-600" />
                <span>{currentService?.estimatedTime}</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1 font-medium text-blue-700">
                <ShieldCheckIcon className="w-3.5 h-3.5 text-blue-600" />
                <span>{currentService?.warranty}</span>
              </span>
              <span>·</span>
              <span className="text-slate-500">Advance: Rs. 0</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto px-7 py-3 bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-semibold text-sm rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="inline-flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </span>
            ) : formMode === "book" ? (
              "Confirm Workshop Booking ➔"
            ) : (
              "Get Free Price Quote ➔"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
