"use client";

import React, { useState } from "react";
import { ChevronDownIcon } from "./Icons";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default as shown in mockup!

  const faqs = [
    {
      question: "How do I book a vehicle service?",
      answer:
        "You can book directly using the search bar at the top or by clicking the 'Book a Service' button. Select your car make, required service, and preferred time slot to schedule your appointment at AutoPro.",
    },
    {
      question: "What happens during my first visit?",
      answer:
        "When you arrive at AutoPro, our service advisor will greet you, review the requested service, and perform a complimentary multi-point vehicle inspection. You'll receive a clear explanation and cost estimate before any work begins.",
    },
    {
      question: "What vehicle brands are supported?",
      answer:
        "We service all major domestic and imported brands including Toyota, Honda, BMW, Mercedes-Benz, Audi, Ford, Hyundai, Kia, and more.",
    },
    {
      question: "Can I cancel or reschedule my booking?",
      answer:
        "Yes! You can easily reschedule or cancel your appointment free of charge up to 2 hours before your scheduled inspection time.",
    },
    {
      question: "How much does a typical service cost?",
      answer:
        "Pricing is fixed and transparent for standard packages starting from Rs. 2,500. Detailed estimates and itemized approvals are provided before any extra repair begins.",
    },
    {
      question: "Does AutoPro provide service warranties?",
      answer:
        "Yes, AutoPro provides a service guarantee covering parts and labor on all completed repairs for a minimum of 30 days or 1,000 km.",
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="w-full py-16 bg-white border-b border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-2 block">
            Help &amp; Information
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Quick answers about booking, services, and our workshop.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="rounded-xl border border-slate-200/90 overflow-hidden bg-white shadow-2xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm sm:text-base font-semibold text-slate-900 hover:text-blue-600 bg-white hover:bg-slate-50/50 transition-colors cursor-pointer"
                >
                  <span className="pr-4">{faq.question}</span>
                  <div
                    className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-blue-600 bg-blue-50" : "text-slate-400 bg-slate-100"
                    }`}
                  >
                    <ChevronDownIcon className="w-3.5 h-3.5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
