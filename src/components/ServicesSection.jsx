import React from "react";
import { Sprout, Tractor, Package, TrendingUp, Users, FlaskConical } from "lucide-react";

const services = [
  {
    icon: Sprout,
    title: "Crop Production",
    description:
      "High-yield, climate-smart cultivation of staple and cash crops using precision farming techniques and improved seed varieties.",
    color: "bg-green-50 text-green-700",
    border: "border-green-100",
  },
  {
    icon: Tractor,
    title: "Farm Mechanization",
    description:
      "Modern equipment leasing and mechanization services that boost productivity and reduce manual labour bottlenecks for smallholder farmers.",
    color: "bg-emerald-50 text-emerald-700",
    border: "border-emerald-100",
  },
  {
    icon: Package,
    title: "Agroprocessing",
    description:
      "Value-addition through processing, packaging, and branding of agricultural commodities to increase market competitiveness and shelf life.",
    color: "bg-lime-50 text-lime-700",
    border: "border-lime-100",
  },
  {
    icon: TrendingUp,
    title: "Market Linkages",
    description:
      "Connecting farmers directly to off-takers, cooperatives, exporters, and food companies through our robust market intelligence network.",
    color: "bg-teal-50 text-teal-700",
    border: "border-teal-100",
  },
  {
    icon: Users,
    title: "Farmer Training",
    description:
      "Capacity-building programs on good agronomic practices, financial literacy, and climate resilience for rural farming communities.",
    color: "bg-green-50 text-green-700",
    border: "border-green-100",
  },
  {
    icon: FlaskConical,
    title: "Agritech Solutions",
    description:
      "Digital tools, drone services, soil testing, IoT sensors, and data analytics platforms designed to modernize farm management.",
    color: "bg-cyan-50 text-cyan-700",
    border: "border-cyan-100",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-28 bg-[#F5F9F3]" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-green-600 font-semibold text-sm uppercase tracking-widest mb-4">
            What We Do
          </span>
          <h2
            id="services-heading"
            className="text-4xl md:text-5xl font-extrabold text-green-950 leading-tight mb-4"
          >
            End-to-End{" "}
            <span className="text-green-600">Agricultural Services</span>
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            From seed to shelf — we cover every stage of the agricultural value chain with
            precision, passion, and purpose.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <article
                key={svc.title}
                role="listitem"
                className={`bg-white rounded-3xl p-8 border ${svc.border} shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-default`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${svc.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                  aria-hidden="true"
                >
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-green-950 mb-3">{svc.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{svc.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}