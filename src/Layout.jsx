import React, { useEffect } from "react";

export default function Layout({ children, currentPageName }) {
  useEffect(() => {
    // SEO Meta tags
    document.title = "CFO Farms & Other Agroallied Enterprise | Sustainable Agritech in Nigeria";

    const setMeta = (name, content, attr = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // Primary
    setMeta("description", "CFO Farms & Other Agroallied Enterprise is a leading agritech company in Nigeria delivering sustainable crop production, farm mechanization, agroprocessing, and market linkages.");
    setMeta("keywords", "CFO Farms, agritech Nigeria, sustainable farming, agroallied enterprise, crop production, farm mechanization, agroprocessing, smallholder farmers, agriculture Nigeria");
    setMeta("author", "CFO Farms & Other Agroallied Enterprise");
    setMeta("robots", "index, follow");
    setMeta("viewport", "width=device-width, initial-scale=1.0");

    // Open Graph
    setMeta("og:title", "CFO Farms & Other Agroallied Enterprise", "property");
    setMeta("og:description", "Building sustainable food systems and empowering farming communities across Africa.", "property");
    setMeta("og:type", "website", "property");
    setMeta("og:url", "https://cfofarms.com.ng", "property");
    setMeta("og:image", "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&q=80", "property");
    setMeta("og:site_name", "CFO Farms", "property");

    // Twitter Card
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", "CFO Farms & Other Agroallied Enterprise");
    setMeta("twitter:description", "Building sustainable food systems and empowering farming communities across Africa.");
    setMeta("twitter:image", "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&q=80");

    // Canonical
    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://cfofarms.com.ng");
  }, []);

  return (
    <div className="min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        body {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          -webkit-font-smoothing: antialiased;
          scroll-behavior: smooth;
        }
        html {
          scroll-behavior: smooth;
        }
        *:focus-visible {
          outline: 2px solid #16a34a;
          outline-offset: 2px;
        }
      `}</style>
      {children}
    </div>
  );
}