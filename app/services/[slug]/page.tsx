import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ServiceDetailView from "@/app/components/workshop/ServiceDetailView";
import { WORKSHOP_SERVICES, getServiceBySlug } from "@/app/data/servicesData";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return WORKSHOP_SERVICES.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found — Panjtan Pak Auto",
    };
  }

  return {
    title: `${service.title} | Panjtan Pak Auto Workshop`,
    description: service.shortDescription,
    openGraph: {
      title: `${service.title} — Panjtan Pak Auto`,
      description: service.shortDescription,
      images: [{ url: service.image }],
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar />

      <main className="flex-1 w-full">
        <ServiceDetailView service={service} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
