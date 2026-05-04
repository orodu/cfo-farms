import React, { useState, useEffect } from "react";
import { Menu, X, Leaf } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why-us" },
  { label: "Impact", href: "#impact" },
  { label: "Weather", href: "#weather" },
  { label: "Prices", href: "#prices" },
  { label: "Contact", href: "#contact" },
];

const adminLink = { label: "Admin", href: "/AdminDashboard" };

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNav("#home")}
          className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 rounded"
          aria-label="CFO Farms home"
        >
          <div className="w-9 h-9 rounded-full bg-green-700 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <span className={`font-bold text-lg leading-tight tracking-tight transition-colors ${scrolled ? "text-green-900" : "text-white"}`}>
            CFO Farms
          </span>
        </button>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8" role="menubar">
          {navLinks.map((link) => (
            <li key={link.label} role="none">
              <button
                role="menuitem"
                onClick={() => handleNav(link.href)}
                className={`text-sm font-medium tracking-wide transition-colors hover:text-green-500 focus:outline-none focus-visible:underline ${
                  scrolled ? "text-green-900" : "text-white/90"
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Admin link - desktop */}
        <a
          href="/AdminDashboard"
          className={`hidden md:inline-flex text-xs font-semibold px-4 py-1.5 rounded-full border transition-all ${
            scrolled ? "border-green-700 text-green-700 hover:bg-green-50" : "border-white/40 text-white/80 hover:bg-white/10"
          }`}
        >
          Admin
        </a>

        {/* CTA */}
        <button
          onClick={() => handleNav("#contact")}
          className="hidden md:inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
          aria-label="Get in touch"
        >
          Get In Touch
        </button>

        {/* Mobile toggle */}
        <button
          className={`md:hidden p-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 transition-colors ${scrolled ? "text-green-900" : "text-white"}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
        aria-hidden={!menuOpen}
      >
        <div className="bg-white/98 backdrop-blur-md border-t border-green-100 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNav(link.href)}
              className="text-left text-green-900 font-medium text-base py-1 hover:text-green-600 transition-colors focus:outline-none focus-visible:underline"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNav("#contact")}
            className="w-full bg-green-600 text-white font-semibold py-3 rounded-full mt-2 hover:bg-green-700 transition-colors"
          >
            Get In Touch
          </button>
        </div>
      </div>
    </nav>
  );
}