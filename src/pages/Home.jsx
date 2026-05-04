import React, { useState, useEffect, useRef } from "react";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import WhyUsSection from "@/components/WhyUsSection";
import ImpactSection from "@/components/ImpactSection";
import WeatherSection from "@/components/WeatherSection";
import CerealPricesSection from "@/components/CerealPricesSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] font-sans">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <WhyUsSection />
      <ImpactSection />
      <WeatherSection />
      <CerealPricesSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
}