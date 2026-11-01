"use client";

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import BrandsSection from "./components/BrandsSection";
import PopularServicesSection from "./components/PopularServicesSection";
import NetworkSection from "./components/NetworkSection";
import GallerySection from "./components/GallerySection";
import ReviewsSection from "./components/ReviewsSection";
import FaqSection from "./components/FaqSection";
import CtaSection from "./components/CtaSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import BookingModal from "./components/BookingModal";
import SignupModal from "./components/SignupModal";

export default function HomePage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("Vehicle Maintenance");

  const handleOpenBooking = (service?: string) => {
    if (service) setSelectedService(service);
    setIsBookingOpen(true);
  };

  const handleSearchFilter = (make: string, service: string, location: string) => {
    if (service) {
      setSelectedService(service);
    }
  };

  const handleScrollToServices = () => {
    const el = document.getElementById("services");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* Top announcement & Main Navbar */}
      <Navbar
        onBookServiceClick={() => handleOpenBooking()}
        onSignupClick={() => setIsSignupOpen(true)}
      />

      <main className="flex-1 w-full">
        {/* Hero Section */}
        <HeroSection
          onSearch={handleSearchFilter}
          onBookServiceClick={() => handleOpenBooking()}
        />

        {/* Brands We Service */}
        <BrandsSection />

        {/* Popular Services */}
        <PopularServicesSection
          onSelectService={(serviceName) => handleOpenBooking(serviceName)}
        />

        {/* About Our Workshop (Quality Assured) */}
        <NetworkSection onExploreServices={handleScrollToServices} />

        {/* Workshop Gallery (Actual Work) */}
        <GallerySection />

        {/* Customer Reviews */}
        <ReviewsSection />

        {/* Frequently Asked Questions */}
        <FaqSection />

        {/* Ready to Service Your Car CTA Banner */}
        <CtaSection
          onBookServiceClick={() => handleOpenBooking()}
          onViewServicesClick={handleScrollToServices}
        />

        {/* Contact Information & Direct Message */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        defaultService={selectedService}
      />

      {/* Frontend-only Signup Modal */}
      <SignupModal
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
      />
    </div>
  );
}
