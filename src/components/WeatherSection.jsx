import React, { useEffect, useState } from "react";
import { Cloud, Sun, CloudRain, Wind, Droplets, CloudSnow, Zap, RefreshCw } from "lucide-react";

const WMO_DESCRIPTIONS = {
  0: "Clear sky", 1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
  45: "Foggy", 48: "Foggy",
  51: "Light drizzle", 53: "Drizzle", 55: "Heavy drizzle",
  61: "Light rain", 63: "Rain", 65: "Heavy rain",
  71: "Light snow", 73: "Snow", 75: "Heavy snow", 77: "Snow grains",
  80: "Showers", 81: "Rain showers", 82: "Heavy showers",
  85: "Snow showers", 86: "Heavy snow showers",
  95: "Thunderstorm", 96: "Thunderstorm + hail", 99: "Thunderstorm + hail",
};

const weatherIcon = (code, cls = "w-10 h-10") => {
  if (code >= 95) return <Zap className={`${cls} text-yellow-400`} />;
  if (code >= 85) return <CloudSnow className={`${cls} text-blue-200`} />;
  if (code >= 80) return <CloudRain className={`${cls} text-blue-400`} />;
  if (code >= 71) return <CloudSnow className={`${cls} text-blue-200`} />;
  if (code >= 61) return <CloudRain className={`${cls} text-blue-400`} />;
  if (code >= 51) return <CloudRain className={`${cls} text-blue-300`} />;
  if (code >= 45) return <Cloud className={`${cls} text-gray-400`} />;
  if (code === 3)  return <Cloud className={`${cls} text-gray-400`} />;
  if (code >= 1)   return <Cloud className={`${cls} text-gray-300`} />;
  return <Sun className={`${cls} text-yellow-400`} />;
};

const locations = [
  { name: "Benue", lat: 7.3369, lon: 8.7404 },
];

const fetchCityWeather = (lat, lon) =>
  fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&daily=temperature_2m_max,temperature_2m_min,weather_code,rain_sum,uv_index_max` +
    `&current=temperature_2m,rain,wind_speed_10m,relative_humidity_2m,weather_code` +
    `&timezone=auto&forecast_days=1`
  ).then(r => r.json());

export default function WeatherSection() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadWeather = async () => {
    setLoading(true);
    const result = await fetchCityWeather(locations[0].lat, locations[0].lon);
    setWeatherData(result);
    setLoading(false);
  };

  useEffect(() => { loadWeather(); }, []);

  const data = weatherData;
  const loc  = locations[0];

  return (
    <section id="weather" className="py-20 bg-gradient-to-br from-sky-950 via-sky-900 to-green-950" aria-labelledby="weather-heading">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block text-sky-300 font-semibold text-sm uppercase tracking-widest mb-3">Farm Weather</span>
          <h2 id="weather-heading" className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Live <span className="text-sky-300">Weather Forecast</span>
          </h2>
          <p className="text-sky-200/70 mt-3 text-base">Real-time data powered by Open-Meteo.</p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 border-4 border-sky-400/30 border-t-sky-400 rounded-full animate-spin" />
            <p className="text-sky-200 text-sm">Fetching live weather data...</p>
          </div>
        ) : data ? (
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Current conditions */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-3xl p-8">
              <p className="text-sky-300 text-xs font-semibold uppercase tracking-widest mb-4">
                Current — {loc.name}
              </p>
              <div className="flex items-center gap-4 mb-6">
                {weatherIcon(data.current?.weather_code)}
                <div>
                  <p className="text-5xl font-extrabold text-white">
                    {Math.round(data.current?.temperature_2m)}°C
                  </p>
                  <p className="text-sky-200 text-sm capitalize">
                    {WMO_DESCRIPTIONS[data.current?.weather_code] ?? "—"}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/10 rounded-2xl p-3 text-center">
                  <Droplets className="w-4 h-4 text-sky-300 mx-auto mb-1" />
                  <p className="text-white text-sm font-bold">{data.current?.relative_humidity_2m}%</p>
                  <p className="text-sky-300 text-xs">Humidity</p>
                </div>
                <div className="bg-white/10 rounded-2xl p-3 text-center">
                  <Wind className="w-4 h-4 text-sky-300 mx-auto mb-1" />
                  <p className="text-white text-sm font-bold">{Math.round(data.current?.wind_speed_10m)}</p>
                  <p className="text-sky-300 text-xs">km/h</p>
                </div>
                <div className="bg-white/10 rounded-2xl p-3 text-center">
                  <CloudRain className="w-4 h-4 text-sky-300 mx-auto mb-1" />
                  <p className="text-white text-sm font-bold">{data.current?.rain ?? 0}mm</p>
                  <p className="text-sky-300 text-xs">Rain</p>
                </div>
              </div>
            </div>

            {/* Daily summary */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <p className="text-sky-300 text-xs font-semibold uppercase tracking-widest mb-4">Today's Summary</p>
              <div className="flex items-center gap-4 mb-6">
                {weatherIcon(data.daily?.weather_code?.[0])}
                <div>
                  <p className="text-3xl font-extrabold text-white">
                    {Math.round(data.daily?.temperature_2m_min?.[0])}° – {Math.round(data.daily?.temperature_2m_max?.[0])}°C
                  </p>
                  <p className="text-sky-200 text-sm">
                    {WMO_DESCRIPTIONS[data.daily?.weather_code?.[0]] ?? "—"}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/10 rounded-2xl p-3 text-center">
                  <CloudRain className="w-4 h-4 text-sky-300 mx-auto mb-1" />
                  <p className="text-white text-sm font-bold">{data.daily?.rain_sum?.[0] ?? 0}mm</p>
                  <p className="text-sky-300 text-xs">Total Rain</p>
                </div>
                <div className="bg-white/10 rounded-2xl p-3 text-center">
                  <Sun className="w-4 h-4 text-yellow-300 mx-auto mb-1" />
                  <p className="text-white text-sm font-bold">{data.daily?.uv_index_max?.[0] ?? 0}</p>
                  <p className="text-sky-300 text-xs">UV Index</p>
                </div>
              </div>
              <button onClick={loadWeather}
                className="flex items-center gap-1.5 text-sky-300 text-xs font-semibold mt-5 hover:text-sky-200 transition-colors">
                <RefreshCw className="w-3.5 h-3.5" /> Refresh
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-sky-200">No weather data available.</p>
        )}
      </div>
    </section>
  );
}