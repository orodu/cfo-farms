const STORAGE_KEY = 'cfo_farms_cereal_prices';

// Mock data for initial setup
const mockData = [
  { id: 1, cereal: 'Maize', market: 'Benue', price_per_100kg: 45000, trend: 'up', notes: 'Good harvest expected', updated_date: new Date().toISOString() },
  { id: 2, cereal: 'Rice', market: 'Kano', price_per_100kg: 52000, trend: 'stable', notes: 'Stable supply', updated_date: new Date().toISOString() },
  { id: 3, cereal: 'Sorghum', market: 'Lagos', price_per_100kg: 38000, trend: 'down', notes: 'Decreasing demand', updated_date: new Date().toISOString() },
  { id: 4, cereal: 'Millet', market: 'Port Harcourt', price_per_100kg: 41000, trend: 'up', notes: 'Rising costs', updated_date: new Date().toISOString() },
];

export const getCerealPrices = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockData));
    return mockData;
  }
  return JSON.parse(stored);
};

export const addCerealPrice = (priceData) => {
  const prices = getCerealPrices();
  const newId = Math.max(...prices.map(p => p.id), 0) + 1;
  const newPrice = {
    id: newId,
    ...priceData,
    updated_date: new Date().toISOString()
  };
  prices.push(newPrice);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prices));
  return newPrice;
};

export const updateCerealPrice = (id, priceData) => {
  const prices = getCerealPrices();
  const index = prices.findIndex(p => p.id === id);
  if (index !== -1) {
    prices[index] = {
      ...prices[index],
      ...priceData,
      updated_date: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prices));
    return prices[index];
  }
  return null;
};

export const deleteCerealPrice = (id) => {
  const prices = getCerealPrices();
  const filtered = prices.filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return true;
};