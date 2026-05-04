import React from "react";
import { CheckCircle } from "lucide-react";

const pillars = [
  "Sustainable farming practices",
  "Technology-driven agriculture",
  "Community & rural empowerment",
  "Farm-to-table supply chains",
  "Agroprocessing & value-addition",
  "Research & innovation",
];

export default function AboutSection() {
  return (
    <section id="about" className="py-28 bg-white" aria-labelledby="about-heading">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image block */}
          <div className="relative order-2 md:order-1">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=900&q=80"
                alt="Farmers working on a sustainable farm"
                className="w-full h-[480px] object-cover"
                loading="lazy"
              />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-4 md:-right-8 bg-green-700 text-white rounded-2xl px-6 py-5 shadow-2xl">
              <p className="text-4xl font-extrabold">10+</p>
              <p className="text-sm font-medium text-green-200 mt-1">Years of Excellence</p>
            </div>
            {/* Accent shape */}
            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-green-100 -z-10" />
          </div>

          {/* Text block */}
          <div className="order-1 md:order-2">
            <span className="inline-block text-green-600 font-semibold text-sm uppercase tracking-widest mb-4">
              Who We Are
            </span>
            <h2
              id="about-heading"
              className="text-4xl md:text-5xl font-extrabold text-green-950 leading-tight mb-6"
            >
              Rooted in Purpose,{" "}
              <span className="text-green-600">Grown with Vision</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              CFO Farms & Other Agroallied Enterprise is a forward-thinking agritech company
              dedicated to transforming agriculture through innovation, sustainability, and
              community impact. We operate across the entire agricultural value chain — from
              farm inputs and cultivation to processing, distribution, and market access.
            </p>
            <p className="text-gray-500 text-base leading-relaxed mb-8">
              Our mission is to build a resilient food ecosystem that empowers smallholder farmers,
              reduces post-harvest losses, and connects producers directly to consumers and markets.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="list" aria-label="Our pillars">
              {pillars.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-gray-700 text-sm font-medium">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}