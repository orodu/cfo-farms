import React from "react";
import { ShieldCheck, Globe, Zap, Heart } from "lucide-react";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Trusted & Certified",
    description:
      "Our operations meet national and international quality standards, with certifications in sustainable agriculture and food safety.",
  },
  {
    icon: Globe,
    title: "Wide Coverage",
    description:
      "We operate across multiple states and regions, with a strong network of partner farms, cooperatives, and distribution hubs.",
  },
  {
    icon: Zap,
    title: "Tech-Powered",
    description:
      "We leverage real-time data, precision agriculture tools, and digital platforms to make smarter farming decisions faster.",
  },
  {
    icon: Heart,
    title: "Community First",
    description:
      "Everything we do is rooted in improving livelihoods. We invest in rural communities, gender-inclusive programs, and youth in agriculture.",
  },
];

export default function WhyUsSection() {
  return (
    <section id="why-us" className="py-28 bg-green-900 relative overflow-hidden" aria-labelledby="why-heading">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}
        aria-hidden="true"
      />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-green-800/50 blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-emerald-800/50 blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <span className="inline-block text-green-300 font-semibold text-sm uppercase tracking-widest mb-4">
              Why Choose Us
            </span>
            <h2
              id="why-heading"
              className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6"
            >
              Agriculture Reimagined{" "}
              <span className="text-green-300">for Impact</span>
            </h2>
            <p className="text-green-100/80 text-lg leading-relaxed mb-8">
              We don't just grow crops — we grow opportunities. CFO Farms combines
              deep local knowledge with global best practices to deliver measurable
              results for farmers, businesses, and communities alike.
            </p>
            <button
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-white text-green-900 font-bold px-8 py-4 rounded-full hover:bg-green-50 transition-all hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Partner with CFO Farms"
            >
              Become a Partner
            </button>
          </div>

          {/* Right: cards */}
          <div className="grid sm:grid-cols-2 gap-6" role="list">
            {reasons.map((r) => {
              const Icon = r.icon;
              return (
                <div
                  key={r.title}
                  role="listitem"
                  className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-6 hover:bg-white/15 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-green-500/20 border border-green-400/30 flex items-center justify-center mb-4" aria-hidden="true">
                    <Icon className="w-6 h-6 text-green-300" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{r.title}</h3>
                  <p className="text-green-100/70 text-sm leading-relaxed">{r.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}