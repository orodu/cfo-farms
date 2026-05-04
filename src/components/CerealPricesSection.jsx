import React, { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { getCerealPrices } from "@/lib/cerealPrices";

const markets = ["Benue", "Kano", "Lagos", "Port Harcourt"];
const cereals = ["Maize", "Rice", "Sorghum", "Millet", "Wheat"];

const trendIcon = (trend) => {
  if (trend === "up")   return <TrendingUp   className="w-4 h-4 text-red-400" />;
  if (trend === "down") return <TrendingDown className="w-4 h-4 text-green-400" />;
  return <Minus className="w-4 h-4 text-gray-400" />;
};

const trendColor = (trend) => {
  if (trend === "up")   return "text-red-400";
  if (trend === "down") return "text-green-400";
  return "text-gray-400";
};

export default function CerealPricesSection() {
  const [priceData, setPriceData]   = useState([]);
  const [loading, setLoading]       = useState(true);
  const [lastUpdated, setLastUpdated] = useState("");
  const [activeMarket, setActiveMarket] = useState("All");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = getCerealPrices();
      setPriceData(data);
      if (data.length > 0) {
        setLastUpdated(
          new Date(data[0].updated_date).toLocaleDateString("en-NG", {
            day: "numeric", month: "long", year: "numeric",
          })
        );
      }
      setLoading(false);
    };
    load();
  }, []);

  const filtered = activeMarket === "All"
    ? priceData
    : priceData.filter(p => p.market === activeMarket);

  const groupedByCereal = cereals
    .map(cereal => ({ cereal, entries: filtered.filter(p => p.cereal === cereal) }))
    .filter(g => g.entries.length > 0);

  return (
    <section id="prices" className="py-20 bg-[#F5F9F3]" aria-labelledby="prices-heading">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block text-green-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Market Intelligence
          </span>
          <h2 id="prices-heading" className="text-4xl md:text-5xl font-extrabold text-green-950 leading-tight">
            Cereal Prices <span className="text-green-600">Across Nigeria</span>
          </h2>
          <p className="text-gray-500 mt-3 text-base max-w-xl mx-auto">
            Wholesale prices (per 100kg bag) across key commodity markets, managed by our team.
          </p>
        </div>

        {/* Market Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {["All", ...markets].map(m => (
            <button key={m} onClick={() => setActiveMarket(m)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                activeMarket === m
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-white border border-green-200 text-green-800 hover:bg-green-50"
              }`}>
              {m}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" />
            <p className="text-green-700 text-sm">Loading market prices...</p>
          </div>
        ) : priceData.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg font-medium mb-2">No price data available yet.</p>
            <p className="text-sm">An admin can add market prices via the Admin Dashboard.</p>
          </div>
        ) : (
          <>
            {activeMarket === "All" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {groupedByCereal.map(({ cereal, entries }) => (
                  <div key={cereal} className="bg-white rounded-2xl shadow-sm border border-green-100 overflow-hidden">
                    <div className="bg-green-700 px-5 py-3">
                      <h3 className="text-white font-bold text-base">{cereal}</h3>
                    </div>
                    <div className="divide-y divide-green-50">
                      {entries.map((e, i) => (
                        <div key={i} className="flex items-center justify-between px-5 py-3">
                          <span className="text-gray-600 text-sm font-medium">{e.market}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-green-900 font-bold text-sm">
                              ₦{e.price_per_100kg?.toLocaleString()}
                            </span>
                            {trendIcon(e.trend)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-green-100 overflow-hidden max-w-2xl mx-auto">
                <div className="bg-green-700 px-6 py-4">
                  <h3 className="text-white font-bold text-lg">{activeMarket} Market Prices</h3>
                </div>
                <table className="w-full" role="table">
                  <thead>
                    <tr className="bg-green-50 text-green-700 text-xs uppercase tracking-widest">
                      <th className="text-left px-6 py-3 font-semibold">Cereal</th>
                      <th className="text-right px-6 py-3 font-semibold">Price / 100kg bag</th>
                      <th className="text-center px-6 py-3 font-semibold">Trend</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-green-50">
                    {filtered.map((e, i) => (
                      <tr key={i} className="hover:bg-green-50/50 transition-colors">
                        <td className="px-6 py-4 text-gray-800 font-medium text-sm">{e.cereal}</td>
                        <td className="px-6 py-4 text-right text-green-900 font-bold text-sm">
                          ₦{e.price_per_100kg?.toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-1">
                            {trendIcon(e.trend)}
                            <span className={`text-xs font-medium capitalize ${trendColor(e.trend)}`}>
                              {e.trend}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {lastUpdated && (
              <p className="text-center text-gray-400 text-xs mt-8">Last updated: {lastUpdated}</p>
            )}
          </>
        )}
      </div>
    </section>
  );
}