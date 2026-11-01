"use client";

import React, { useState } from "react";
import Image from "next/image";
import { XIcon } from "./Icons";

export default function GallerySection() {
  const [selectedPhoto, setSelectedPhoto] = useState<{
    title: string;
    description: string;
    src: string;
  } | null>(null);

  const galleryItems = [
    {
      id: 1,
      title: "Vehicle Servicing",
      description: "Multi-point preventive check",
      src: "/images/workshop/gallery-1.jpg",
    },
    {
      id: 2,
      title: "Technician Working",
      description: "Drivetrain & precision assembly",
      src: "/images/workshop/gallery-2.jpg",
    },
    {
      id: 3,
      title: "Engine Inspection",
      description: "Cylinder & valve timing testing",
      src: "/images/workshop/gallery-3.jpg",
    },
    {
      id: 4,
      title: "Diagnostic Equipment",
      description: "OEM software scanner scan",
      src: "/images/workshop/gallery-4.jpg",
    },
    {
      id: 5,
      title: "Workshop Interior",
      description: "Hydraulic bays and clean floor",
      src: "/images/workshop/gallery-5.jpg",
    },
    {
      id: 6,
      title: "Vehicle Repair",
      description: "Brake rotors and suspension arm",
      src: "/images/workshop/gallery-6.jpg",
    },
  ];

  return (
    <section id="gallery" className="w-full py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-2 block">
              Actual Work
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Workshop Gallery
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              See real work and vehicles serviced at our workshop.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setSelectedPhoto(galleryItems[0])}
            className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline text-left sm:text-right cursor-pointer"
          >
            View All Photos &rarr;
          </button>
        </div>

        {/* Gallery Grid (3x2) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/90 shadow-xs hover:shadow-xl transition-all cursor-pointer aspect-4/3"
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 group-hover:opacity-90 transition-all duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              {/* Gradient Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

              {/* Bottom Caption */}
              <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                <h3 className="font-bold text-base sm:text-lg tracking-tight group-hover:text-blue-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5 font-normal">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Centered CTA Button */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => setSelectedPhoto(galleryItems[0])}
            className="inline-flex items-center justify-center px-7 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            View Gallery
          </button>
        </div>

        {/* Lightbox Modal */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in"
            onClick={() => setSelectedPhoto(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-16/10 w-full">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex items-center justify-between p-5 bg-slate-900 text-white">
                <div>
                  <h4 className="text-lg font-bold">{selectedPhoto.title}</h4>
                  <p className="text-xs text-slate-400">{selectedPhoto.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedPhoto(null)}
                  className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800 transition-colors cursor-pointer"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
