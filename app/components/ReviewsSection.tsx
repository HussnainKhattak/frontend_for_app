"use client";

import React, { useState, useEffect } from "react";
import { StarIcon } from "./Icons";

export interface Review {
  id: string | number;
  rating: string | number;
  quote: string;
  name: string;
  vehicle?: string;
  avatarLetter?: string;
  date?: string;
}

interface ReviewsSectionProps {
  initialReviews?: Review[];
}

export default function ReviewsSection({ initialReviews }: ReviewsSectionProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews || []);

  useEffect(() => {
    if (initialReviews !== undefined) {
      setReviews(initialReviews);
    }
  }, [initialReviews]);

  return (
    <section className="w-full py-16 bg-slate-50/60 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-2 block">
            Customer Reviews
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            What Our Customers Say
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Real feedback from vehicle owners who visited AutoPro.
          </p>
        </div>

        {/* Content: Genuine Reviews from props or Clean Empty State */}
        {reviews && reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev) => {
              const ratingNum = Math.min(
                5,
                Math.max(1, Math.round(Number(rev.rating) || 5))
              );
              return (
                <div
                  key={rev.id}
                  className="flex flex-col justify-between bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow"
                >
                  <div>
                    {/* Stars + rating */}
                    <div className="flex items-center gap-1.5 mb-4">
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`w-4 h-4 ${
                              i < ratingNum
                                ? "fill-amber-400 text-amber-400"
                                : "fill-slate-200 text-slate-200"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-slate-900">
                        {rev.rating}
                      </span>
                    </div>

                    {/* Quote */}
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6">
                      &ldquo;{rev.quote}&rdquo;
                    </p>
                  </div>

                  {/* Author & Vehicle */}
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                    <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0">
                      {rev.avatarLetter ||
                        (rev.name ? rev.name.charAt(0).toUpperCase() : "U")}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 leading-tight">
                        {rev.name}
                      </h4>
                      {rev.vehicle && (
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {rev.vehicle}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 px-6 bg-white rounded-2xl border border-slate-200/90 shadow-xs max-w-xl mx-auto">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
              <StarIcon className="w-6 h-6 text-slate-300" />
            </div>
            <h3 className="text-base font-bold text-slate-900">No reviews yet</h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-500">
              Verified customer feedback and service ratings will be displayed here once submitted by clients.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
