import React, { useEffect, useRef, useState } from "react";

const stats = [
  { value: 500, suffix: "+", label: "Farmers Empowered" },
  { value: 1, suffix: "k+", label: "Hectares Cultivated" },
  { value: 1, suffix: "+", label: "States of Operation" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
];

function CountUp({ target, suffix, duration = 1800 }) {
  const [count, setCount] = useState(0);
  const ref = useRef();
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = target / (duration / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref} aria-live="polite">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function ImpactSection() {
  return (
    <section id="impact" className="py-28 bg-white" aria-labelledby="impact-heading">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-green-600 font-semibold text-sm uppercase tracking-widest mb-4">
            Our Impact
          </span>
          <h2
            id="impact-heading"
            className="text-4xl md:text-5xl font-extrabold text-green-950 leading-tight mb-4"
          >
            Numbers That Tell{" "}
            <span className="text-green-600">Our Story</span>
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            Across communities, farms, and markets — our impact speaks for itself.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20" role="list" aria-label="Impact statistics">
          {stats.map((stat) => (
            <div
              key={stat.label}
              role="listitem"
              className="text-center bg-[#F5F9F3] rounded-3xl p-8 border border-green-100"
            >
              <p className="text-5xl font-extrabold text-green-700 mb-2">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-gray-500 font-medium text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonial / Quote */}
        <div className="relative bg-gradient-to-br from-green-800 to-green-900 rounded-3xl p-10 md:p-16 text-center overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle at 20% 80%, white 1px, transparent 1px)",
              backgroundSize: "30px 30px"
            }}
            aria-hidden="true"
          />
          <p className="relative text-2xl md:text-3xl font-bold text-white leading-relaxed max-w-3xl mx-auto mb-6">
            "Our goal is a Nigeria — and an Africa — where no farmer is left behind, and where
            agriculture is a driver of prosperity, not just subsistence."
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm" aria-hidden="true">
              CF
            </div>
            <div className="text-left">
              <p className="text-white font-semibold text-sm">O.F Chichi</p>
              <p className="text-white font-semibold text-sm">Chief Farmer's Office</p>
              <p className="text-green-300 text-xs">Founder, CFO Farms & Agroallied Enterprise</p>
            </div>
          </div>
        </div>

        {/* Gallery strip */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "https://images.unsplash.com/photo-1597916829826-02e5bb4a54e0?w=600&q=80",
            "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600&q=80",
            "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&q=80",
            "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80",
          ].map((src, i) => (
            <div key={i} className="rounded-2xl overflow-hidden aspect-square">
              <img
                src={src}
                alt={`Farm scene ${i + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}