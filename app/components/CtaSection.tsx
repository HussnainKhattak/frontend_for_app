import React from "react";

interface CtaSectionProps {
  onBookServiceClick: () => void;
  onViewServicesClick: () => void;
}

export default function CtaSection({ onBookServiceClick, onViewServicesClick }: CtaSectionProps) {
  return (
    <section className="w-full py-16 bg-white border-b border-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-slate-50 via-blue-50/30 to-slate-50 border border-slate-200/90 p-8 sm:p-12 text-center shadow-xs">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Ready to Service Your Car?
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            Book your next service appointment at AutoPro.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={onBookServiceClick}
              className="w-full sm:w-auto px-7 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              Book a Service
            </button>
            <button
              type="button"
              onClick={onViewServicesClick}
              className="w-full sm:w-auto px-7 py-3 text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all cursor-pointer"
            >
              View Our Services
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
