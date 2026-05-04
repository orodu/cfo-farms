import React from "react";
import { Leaf, Twitter, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

const footerLinks = {
  Company: ["About Us", "Our Team", "Careers", "News & Blog"],
  Services: ["Crop Production", "Farm Mechanization", "Agroprocessing", "Market Linkages"],
  Resources: ["Farmer's Guide", "Research Reports", "Case Studies", "FAQs"],
};

const socials = [
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
];

export default function FooterSection() {
  return (
    <footer className="bg-green-950 text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand col */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-green-600 flex items-center justify-center" aria-hidden="true">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-white">CFO Farms</span>
            </div>
            <p className="text-green-300/70 text-sm leading-relaxed mb-6 max-w-xs">
              CFO Farms & Other Agroallied Enterprise — building sustainable food systems
              and empowering farming communities across Africa.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-3" role="list" aria-label="Social media links">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    role="listitem"
                    aria-label={s.label}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-green-600 flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
                  >
                    <Icon className="w-4 h-4 text-white" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link cols */}
          {Object.entries(footerLinks).map(([cat, links]) => (
            <div key={cat}>
              <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-4">{cat}</h3>
              <ul className="space-y-3" role="list">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-green-300/70 hover:text-white text-sm transition-colors focus:outline-none focus-visible:underline"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-green-300/50 text-sm">
            © {new Date().getFullYear()} CFO Farms & Other Agroallied Enterprise. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-green-300/50 hover:text-white text-xs transition-colors focus:outline-none focus-visible:underline"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}