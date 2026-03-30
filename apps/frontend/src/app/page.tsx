"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import RoomShowcase from "@/components/RoomShowcase";
import BlueprintSection from "@/components/BlueprintSection";
import LocationSection from "@/components/LocationSection";
import BuyingSection from "@/components/BuyingSection";
import ReserveSection from "@/components/ReserveSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import LenisScroll from "@/components/LenisScroll";

export default function HomePage() {
  return (
    <>
      <LenisScroll />
      <Navbar />
      <Hero />
      <main className="w-full">
        <RoomShowcase />
        <BlueprintSection />
        <LocationSection />
        <BuyingSection />
        <ReserveSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
