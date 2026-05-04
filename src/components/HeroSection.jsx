import React, { useEffect, useState } from "react";
import { ArrowDown, Leaf } from "lucide-react";

export default function HeroSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1800&q=80')",
        }}
        role="img"
        aria-label="Lush green farmland"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-950/85 via-green-900/70 to-emerald-800/60" />

      {/* Decorative circles */}
      <div className="absolute top-24 right-16 w-64 h-64 rounded-full border border-white/10 hidden lg:block" />
      <div className="absolute top-40 right-32 w-40 h-40 rounded-full border border-white/10 hidden lg:block" />
      <div className="absolute bottom-32 left-10 w-48 h-48 rounded-full border border-white/10 hidden lg:block" />

      {/* Content */}
      <div
        className={`relative z-10 max-w-5xl mx-auto px-6 text-center transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="hidden lg:inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 text-white text-sm font-medium px-4 py-2 rounded-full mb-8">
          <Leaf className="w-4 h-4 text-green-300" />
          Agritech Enterprise · Est. 2015
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6">
          Growing the{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-200">
            Future
          </span>
          <br />
          of Agriculture
        </h1>

        <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
          CFO Farms & Other Agroallied Enterprise blends cutting-edge agritech
          with deep agricultural expertise to deliver sustainable food systems
          and thriving rural economies.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-green-500 hover:bg-green-400 text-white font-semibold px-8 py-4 rounded-full text-base shadow-xl hover:shadow-green-400/40 transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-300"
            aria-label="Explore our services"
          >
            Explore Our Services
          </button>
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="border-2 border-white/50 hover:border-white text-white font-semibold px-8 py-4 rounded-full text-base transition-all hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Contact us"
          >
            Partner With Us
          </button>
        </div>
      </div>

      {/* Scroll cue */}
      <button
        onClick={scrollToAbout}
        aria-label="Scroll down"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/60 hover:text-white transition-colors animate-bounce"
      >
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <ArrowDown className="w-5 h-5" />
      </button>
    </section>
  );
}