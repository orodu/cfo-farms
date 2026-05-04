import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";

const contactInfo = [
  { icon: Mail, label: "Email Us", value: "hello@cfofarm.com.ng", href: "mailto:hello@cfofarm.com.ng" },
  { icon: Phone, label: "Call Us", value: "+234 800 CFO FARM", href: "tel:+2347012270418" },
  { icon: MapPin, label: "Visit Us", value: "Makurdi, Benue, Nigeria", href: "#" },
];

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    // Mock email sending
    console.log('Contact form submitted:', form);
    alert('Thank you for your message! We will get back to you soon.');
    setSending(false);
    setSubmitted(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section id="contact" className="py-28 bg-[#F5F9F3]" aria-labelledby="contact-heading">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-green-600 font-semibold text-sm uppercase tracking-widest mb-4">
            Contact Us
          </span>
          <h2
            id="contact-heading"
            className="text-4xl md:text-5xl font-extrabold text-green-950 leading-tight mb-4"
          >
            Let's Grow{" "}
            <span className="text-green-600">Together</span>
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            Whether you're a farmer, investor, off-taker, or partner — we'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Info panel */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {contactInfo.map((c) => {
              const Icon = c.icon;
              return (
                <a
                  key={c.label}
                  href={c.href}
                  className="flex items-start gap-4 bg-white rounded-2xl p-6 border border-green-100 shadow-sm hover:shadow-md transition-shadow group"
                  aria-label={`${c.label}: ${c.value}`}
                >
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 transition-colors" aria-hidden="true">
                    <Icon className="w-6 h-6 text-green-700" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-green-600 uppercase tracking-widest mb-1">{c.label}</p>
                    <p className="text-green-900 font-semibold">{c.value}</p>
                  </div>
                </a>
              );
            })}

            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden border border-green-100 flex-1 min-h-40">
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80"
                alt="Nigeria landscape representing CFO Farms location"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 bg-white rounded-3xl p-8 md:p-10 border border-green-100 shadow-sm">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-16 gap-4">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center" aria-hidden="true">
                  <CheckCircle className="w-9 h-9 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-green-900">Message Sent!</h3>
                <p className="text-gray-500 max-w-sm">
                  Thank you for reaching out. Our team will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-green-600 font-semibold hover:underline focus:outline-none focus-visible:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
                <h3 className="text-2xl font-bold text-green-950 mb-8">Send Us a Message</h3>
                <div className="grid sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name <span aria-hidden="true" className="text-red-400">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                      aria-required="true"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address <span aria-hidden="true" className="text-red-400">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                      aria-required="true"
                    />
                  </div>
                </div>
                <div className="mb-5">
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                  />
                </div>
                <div className="mb-8">
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message <span aria-hidden="true" className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project, needs or enquiry..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition resize-none"
                    aria-required="true"
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
                  aria-label="Submit contact form"
                >
                  {sending
                    ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    : <Send className="w-5 h-5" aria-hidden="true" />}
                  {sending ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}