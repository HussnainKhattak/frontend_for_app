"use client";

import React, { useState } from "react";
import { PhoneIcon, MailIcon, MapPinIcon, ClockIcon, CheckIcon } from "./Icons";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="w-full py-16 bg-slate-50/70 border-b border-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-2 block">
            Get In Touch
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Contact Information
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Reach our dedicated support team or visit our central headquarters.
          </p>
        </div>

        {/* 4 Info Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {/* Call Us */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs text-left">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <PhoneIcon className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase block">
              Call Us
            </span>
            <a
              href="tel:+923001234567"
              className="font-bold text-sm text-slate-900 hover:text-blue-600 transition-colors mt-0.5 block"
            >
              +92 300 1234567
            </a>
            <p className="text-[11px] text-slate-500 mt-1">
              Toll-free customer support line
            </p>
          </div>

          {/* Email */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs text-left">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <MailIcon className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase block">
              Email
            </span>
            <a
              href="mailto:info@autopro.com"
              className="font-bold text-sm text-slate-900 hover:text-blue-600 transition-colors mt-0.5 block"
            >
              info@autopro.com
            </a>
            <p className="text-[11px] text-slate-500 mt-1">
              Average response time: under 2 hours
            </p>
          </div>

          {/* Location */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs text-left">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <MapPinIcon className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase block">
              Location
            </span>
            <div className="font-bold text-sm text-slate-900 mt-0.5">
              123 Main Industrial Road
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Automotive Commercial Hub
            </p>
          </div>

          {/* Opening Hours */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs text-left">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <ClockIcon className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase block">
              Opening Hours
            </span>
            <div className="font-bold text-xs text-slate-900 mt-0.5 leading-snug">
              Monday &ndash; Saturday: 9:00 AM &ndash; 7:00 PM
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Sunday: Closed for maintenance
            </p>
          </div>
        </div>

        {/* Send a Direct Message Form Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs max-w-3xl mx-auto">
          <div className="text-left mb-6">
            <h3 className="text-xl font-bold text-slate-900">
              Send a Direct Message
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Have a question about a complex repair or fleet pricing? Drop us a quick note.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckIcon className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Message Received!</h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                Thank you, <span className="font-semibold text-slate-800">{name}</span>. An AutoPro service specialist will contact you at <span className="font-semibold text-slate-800">{phone}</span> shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setName("");
                  setPhone("");
                  setMessage("");
                  setSubmitted(false);
                }}
                className="mt-3 text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Asad Ali"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-sm border border-slate-200 rounded-xl px-3.5 py-2.5 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0300 0000000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-sm border border-slate-200 rounded-xl px-3.5 py-2.5 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Message / Vehicle Details
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tell us about your vehicle model and required service..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full text-sm border border-slate-200 rounded-xl px-3.5 py-2.5 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md transition-colors cursor-pointer"
                >
                  Send Message
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
