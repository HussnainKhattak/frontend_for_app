"use client";

import React, { useState } from "react";
import { XIcon, CheckIcon } from "./Icons";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  defaultService = "Vehicle Maintenance",
}: BookingModalProps) {
  const [carMake, setCarMake] = useState("Toyota");
  const [carModel, setCarModel] = useState("Corolla 2021");
  const [service, setService] = useState(defaultService);
  const [date, setDate] = useState("2026-10-20");
  const [time, setTime] = useState("10:00 AM");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 bg-slate-900 text-white">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <h3 className="font-semibold text-base sm:text-lg tracking-tight">Book a Service at AutoPro</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-6 sm:p-8 text-center space-y-4">
            <div className="w-14 sm:w-16 h-14 sm:h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckIcon className="w-7 sm:w-8 h-7 sm:h-8" />
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-slate-900">Booking Confirmed!</h4>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              Thank you, <span className="font-semibold text-slate-800">{name || "Valued Customer"}</span>. Your service appointment for{" "}
              <span className="font-semibold text-blue-600">{service}</span> at{" "}
              <span className="font-semibold text-slate-800">AutoPro Workshop</span> is scheduled for{" "}
              <span className="font-semibold text-slate-800">{date} at {time}</span>.
            </p>
            <div className="p-3.5 sm:p-4 bg-slate-50 rounded-xl text-left text-xs text-slate-600 space-y-1.5 border border-slate-100">
              <div className="flex justify-between">
                <span className="text-slate-500">Vehicle:</span>
                <span className="font-medium text-slate-800">{carMake} {carModel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Location:</span>
                <span className="font-medium text-slate-800">AutoPro Workshop — Service Bay #3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Service Guarantee:</span>
                <span className="font-medium text-emerald-600">30-Day AutoPro Warranty</span>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3.5 sm:space-y-4 max-h-[80vh] overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Vehicle Make</label>
                <select
                  value={carMake}
                  onChange={(e) => setCarMake(e.target.value)}
                  className="w-full text-xs sm:text-sm border border-slate-200 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                >
                  <option value="Toyota">Toyota</option>
                  <option value="Honda">Honda</option>
                  <option value="BMW">BMW</option>
                  <option value="Mercedes-Benz">Mercedes-Benz</option>
                  <option value="Audi">Audi</option>
                  <option value="Ford">Ford</option>
                  <option value="Hyundai">Hyundai</option>
                  <option value="Kia">Kia</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Model &amp; Year</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Corolla 2021"
                  value={carModel}
                  onChange={(e) => setCarModel(e.target.value)}
                  className="w-full text-xs sm:text-sm border border-slate-200 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Required Service</label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full text-xs sm:text-sm border border-slate-200 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              >
                <option value="Vehicle Maintenance">Vehicle Maintenance (32 Points Inspection)</option>
                <option value="Engine Diagnostics">Engine Diagnostics &amp; OBD-II Scan</option>
                <option value="Brake Service">Brake Service &amp; Fluid Flush</option>
                <option value="AC &amp; Electrical">AC &amp; Electrical System Re-gas</option>
                <option value="Oil &amp; Filter Change">Oil &amp; Filter Change (OEM Spec)</option>
                <option value="Tyre &amp; Wheel Service">Tyre &amp; 3D Wheel Alignment</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Appointment Date</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full text-xs sm:text-sm border border-slate-200 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Time</label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full text-xs sm:text-sm border border-slate-200 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                >
                  <option value="09:30 AM">09:30 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="04:30 PM">04:30 PM</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Asad Ali"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs sm:text-sm border border-slate-200 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="0300 1234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs sm:text-sm border border-slate-200 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition-colors cursor-pointer"
              >
                Confirm Appointment
              </button>
            </div>
            <p className="text-center text-[11px] text-slate-500">
              No advance payment required. Pay directly at the workshop after inspection.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
