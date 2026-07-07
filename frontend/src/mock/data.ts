import type {
  AiInsight,
  City,
  Developer,
  InvestmentOpportunity,
  Kpi,
  NotificationItem,
  Property,
  ReportItem,
  TimeSeriesPoint,
} from "@/types";

// -------- helpers ---------
const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const series = (base: number, drift: number, vol: number, n = 12): TimeSeriesPoint[] =>
  Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1);
    const trend = base * (1 + drift * t);
    const noise = (Math.sin(i * 1.3) + Math.cos(i * 0.7)) * vol * base * 0.03;
    return { date: months[i % 12], value: Math.max(0, Math.round(trend + noise)) };
  });

// -------- KPIs ---------
export const dashboardKpis: Kpi[] = [
  { id: "mv", label: "Total Market Value", value: 4.82, prefix: "SAR ", suffix: "T", change: 8.4, trend: "up", accent: "blue" },
  { id: "roi", label: "Average ROI", value: 14.6, suffix: "%", change: 2.1, trend: "up", accent: "emerald" },
  { id: "iscore", label: "Investment Score", value: 87, change: 3.2, trend: "up", accent: "purple" },
  { id: "growth", label: "Market Growth (YoY)", value: 11.9, suffix: "%", change: 1.8, trend: "up", accent: "orange" },
  { id: "land", label: "Avg Land Price", value: 4820, prefix: "SAR ", suffix: "/m²", change: 6.7, trend: "up", accent: "blue" },
  { id: "hot", label: "Hot Investment Zones", value: 42, change: 12.0, trend: "up", accent: "orange" },
  { id: "yield", label: "Avg Rental Yield", value: 7.8, suffix: "%", change: 0.4, trend: "up", accent: "emerald" },
  { id: "cci", label: "Construction Cost Index", value: 138.2, change: -1.4, trend: "down", accent: "navy" },
  { id: "infl", label: "Inflation Impact", value: 2.6, suffix: "%", change: -0.3, trend: "down", accent: "orange" },
  { id: "rate", label: "Interest Rate Trend", value: 5.5, suffix: "%", change: -0.25, trend: "down", accent: "navy" },
  { id: "sent", label: "Market Sentiment", value: 78, change: 4.6, trend: "up", accent: "purple" },
  { id: "ai", label: "AI Confidence Score", value: 92, change: 1.9, trend: "up", accent: "emerald" },
];

// -------- Trend series ---------
export const landPriceTrend = series(3800, 0.28, 1.4);
export const roiGrowth = series(9.5, 0.6, 0.6);
export const rentalYieldTrend = series(6.4, 0.22, 0.3);
export const constructionCostTrend = series(120, 0.16, 0.5);
export const priceAppreciation = series(100, 0.35, 0.8);
export const vacancyRates = series(14, -0.3, 0.5);

export const supplyDemand = months.map((m, i) => ({
  date: m,
  supply: Math.round(1200 + i * 30 + Math.sin(i) * 90),
  demand: Math.round(1100 + i * 55 + Math.cos(i) * 120),
}));

export const sectorPerformance = [
  { sector: "Residential", value: 32 },
  { sector: "Commercial", value: 24 },
  { sector: "Retail", value: 14 },
  { sector: "Hospitality", value: 12 },
  { sector: "Industrial", value: 10 },
  { sector: "Mixed-Use", value: 8 },
];

export const marketSegmentation = [
  { name: "Luxury", value: 28 },
  { name: "Mid-Market", value: 42 },
  { name: "Affordable", value: 22 },
  { name: "Commercial", value: 8 },
];

export const economicIndicators = months.map((m, i) => ({
  date: m,
  gdp: +(3.2 + Math.sin(i / 2) * 0.6 + i * 0.05).toFixed(2),
  inflation: +(2.6 + Math.cos(i / 3) * 0.4).toFixed(2),
  employment: +(96 + Math.sin(i / 4) * 0.6).toFixed(2),
}));

export const competitorGrowth = months.map((m, i) => ({
  date: m,
  A: Math.round(100 + i * 6 + Math.sin(i) * 8),
  B: Math.round(100 + i * 4.5 + Math.cos(i) * 6),
  C: Math.round(100 + i * 5.2 + Math.sin(i + 1) * 5),
  D: Math.round(100 + i * 3.8 + Math.cos(i + 2) * 7),
}));

export const heatmapMatrix = Array.from({ length: 8 }, (_, r) =>
  Array.from({ length: 12 }, (_, c) =>
    Math.round(30 + Math.sin(r * 0.7 + c * 0.5) * 25 + Math.cos(c * 0.3) * 15 + r * 3),
  ),
);

// -------- Cities ---------
const cityNames = [
  { name: "Riyadh", region: "Central", pop: 7_600_000 },
  { name: "Jeddah", region: "Western", pop: 4_700_000 },
  { name: "Dammam", region: "Eastern", pop: 1_500_000 },
  { name: "Al Khobar", region: "Eastern", pop: 1_200_000 },
  { name: "NEOM", region: "Tabuk", pop: 320_000 },
  { name: "Makkah", region: "Western", pop: 2_400_000 },
  { name: "Medinah", region: "Western", pop: 1_500_000 },
  { name: "Abha", region: "Southern", pop: 630_000 },
];

export const cities: City[] = cityNames.map((c, i) => ({
  id: c.name.toLowerCase().replace(/\s+/g, "-"),
  name: c.name,
  region: c.region,
  population: c.pop,
  avgIncome: Math.round(9_000 + i * 900 + Math.sin(i) * 600),
  growthRate: +(3.4 + i * 0.4 + Math.sin(i) * 0.6).toFixed(1),
  landPrice: Math.round(3800 + i * 420 + Math.cos(i) * 250),
  avgPropertyPrice: Math.round(1_400_000 + i * 220_000 + Math.sin(i) * 90_000),
  rentalYield: +(6 + Math.sin(i) * 1.4 + i * 0.15).toFixed(1),
  roi: +(10 + i * 0.6 + Math.cos(i) * 1.4).toFixed(1),
  demand: Math.round(70 + Math.sin(i) * 15 + i),
  supply: Math.round(65 + Math.cos(i) * 12 + i * 0.7),
  occupancy: Math.round(82 + Math.sin(i) * 8),
  vacancy: Math.round(12 + Math.cos(i) * 5),
  infrastructureScore: Math.round(72 + i * 2 + Math.sin(i) * 6),
  schools: 120 + i * 22,
  hospitals: 35 + i * 6,
  roadConnectivity: Math.round(78 + Math.sin(i) * 10),
  metroConnectivity: Math.round(55 + i * 4 + Math.cos(i) * 12),
  commercialGrowth: +(6 + i * 0.5 + Math.sin(i) * 2).toFixed(1),
  crimeIndex: +(18 + Math.cos(i) * 5).toFixed(1),
  livabilityScore: Math.round(78 + Math.sin(i) * 8),
  investmentScore: Math.round(82 + Math.cos(i) * 8),
  riskScore: Math.round(28 + Math.sin(i) * 10),
  growthPrediction: +(9 + i * 0.4 + Math.cos(i) * 2).toFixed(1),
  aiRecommendation:
    i % 3 === 0
      ? "Strong Buy — infrastructure momentum + demand outpacing supply."
      : i % 3 === 1
      ? "Hold — fundamentals stable, watch construction pipeline."
      : "Accumulate — undervalued vs. peer cities on ROI/risk basis.",
  priceForecast: series(3800 + i * 400, 0.32, 1),
  demandForecast: series(70 + i, 0.22, 0.6),
  futureProjects: [
    "King Salman Park expansion",
    "Metro Line 4 extension",
    "Mixed-use waterfront district",
    "Innovation Business Park",
  ].slice(0, 3 + (i % 2)),
  governmentInvestments: [
    "Vision 2030 tourism corridor",
    "Digital city grid upgrade",
    "Green infrastructure fund",
  ],
  coordinates: [24.7 + i * 0.4, 46.7 + i * 0.6],
}));

// -------- Developers ---------
export const developers: Developer[] = [
  {
    id: "dev-a",
    name: "Al Nakhla Holdings",
    logoColor: "oklch(0.62 0.19 250)",
    founded: 1998,
    hq: "Riyadh",
    projects: 128,
    roi: 16.4,
    growth: 22.1,
    landHoldings: 42,
    marketShare: 18.6,
    pricingStrategy: "Premium",
    luxury: 62,
    commercial: 24,
    residential: 14,
    upcomingProjects: 18,
    rating: 4.7,
  },
  {
    id: "dev-b",
    name: "Aurora Estates",
    logoColor: "oklch(0.72 0.17 158)",
    founded: 2004,
    hq: "Jeddah",
    projects: 96,
    roi: 13.8,
    growth: 18.4,
    landHoldings: 28,
    marketShare: 12.2,
    pricingStrategy: "Mid-Market",
    luxury: 28,
    commercial: 32,
    residential: 40,
    upcomingProjects: 14,
    rating: 4.4,
  },
  {
    id: "dev-c",
    name: "Meridian Realty Group",
    logoColor: "oklch(0.73 0.18 55)",
    founded: 1989,
    hq: "Dammam",
    projects: 154,
    roi: 15.1,
    growth: 14.6,
    landHoldings: 51,
    marketShare: 16.9,
    pricingStrategy: "Premium",
    luxury: 44,
    commercial: 36,
    residential: 20,
    upcomingProjects: 22,
    rating: 4.6,
  },
  {
    id: "dev-d",
    name: "Vantage Developments",
    logoColor: "oklch(0.62 0.22 300)",
    founded: 2011,
    hq: "NEOM",
    projects: 62,
    roi: 12.6,
    growth: 28.7,
    landHoldings: 19,
    marketShare: 7.8,
    pricingStrategy: "Value",
    luxury: 12,
    commercial: 22,
    residential: 66,
    upcomingProjects: 26,
    rating: 4.2,
  },
];

// -------- Properties ---------
const propertyImages = [
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
  "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200&q=80",
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80",
];

export const properties: Property[] = Array.from({ length: 12 }, (_, i) => {
  const city = cities[i % cities.length];
  const price = 1_200_000 + i * 380_000 + Math.round(Math.sin(i) * 200_000);
  const total = Math.round(price * 0.11);
  const valueAfter = Math.round(price * 1.28);
  return {
    id: `prop-${i + 1}`,
    name: [
      "Skyline Residences",
      "Palm Grove Villas",
      "Cadence Tower",
      "Aurora Bay Apartments",
      "Vista Heights",
      "Emerald Court",
      "Solstice Business Park",
      "Meridian Retail Plaza",
      "Northline Lofts",
      "Sapphire Estates",
      "Nova Mixed-Use",
      "Coral Ridge Villas",
    ][i],
    developer: developers[i % developers.length].name,
    location: `${city.name} — District ${((i % 6) + 1)}`,
    city: city.name,
    coordinates: city.coordinates,
    type: (["Villa", "Apartment", "Office", "Retail", "Mixed-Use", "Land"] as const)[i % 6],
    price,
    pastPrices: series(price * 0.7, 0.42, 0.6, 12),
    size: 180 + i * 42,
    bedrooms: (i % 5) + 1,
    parking: (i % 3) + 1,
    completion: (["Ready", "Off-Plan", "Under Construction"] as const)[i % 3],
    age: i % 12,
    legalStatus: i % 4 === 0 ? "Leasehold" : "Freehold",
    image: propertyImages[i % propertyImages.length],
    demandScore: 70 + (i * 3) % 25,
    riskScore: 20 + (i * 5) % 30,
    investmentGrade: (["A+", "A", "B+", "B", "C"] as const)[i % 5],
    liquidityScore: 60 + (i * 4) % 35,
    rentalYield: +(6.2 + Math.sin(i) * 1.4).toFixed(1),
    roi: +(12 + Math.cos(i) * 3 + i * 0.2).toFixed(1),
    capitalAppreciation: +(8 + Math.sin(i) * 2.4).toFixed(1),
    estimatedValue: Math.round(price * (1.05 + Math.sin(i) * 0.08)),
    ownershipHistory: [
      { owner: "Vision Capital", year: 2015 + (i % 3) },
      { owner: "Al Nakhla Holdings", year: 2019 + (i % 3) },
    ],
    renovation: {
      structural: Math.round(total * 0.24),
      interior: Math.round(total * 0.22),
      exterior: Math.round(total * 0.12),
      electrical: Math.round(total * 0.09),
      plumbing: Math.round(total * 0.08),
      painting: Math.round(total * 0.06),
      hvac: Math.round(total * 0.11),
      landscaping: Math.round(total * 0.08),
      total,
      valueAfter,
      expectedRoi: +(((valueAfter - price - total) / (price + total)) * 100).toFixed(1),
      profitMargin: +(((valueAfter - price - total) / valueAfter) * 100).toFixed(1),
      timelineWeeks: 14 + (i % 8),
      risks: [
        "Permit approval delay",
        "Material cost volatility",
        "Contractor availability",
      ],
      recommendation:
        "AI recommends phased renovation prioritizing interior + HVAC to unlock 78% of value uplift within 60% of budget.",
    },
  };
});

// -------- Investment opportunities ---------
export const opportunities: InvestmentOpportunity[] = Array.from({ length: 8 }, (_, i) => ({
  id: `opp-${i + 1}`,
  title: [
    "NEOM Coastal Mixed-Use Portfolio",
    "Riyadh Business District Tower",
    "Jeddah Waterfront Residences",
    "Dammam Logistics Hub",
    "Makkah Hospitality Cluster",
    "Al Khobar Retail Anchor",
    "Medinah Cultural Quarter",
    "Abha Mountain Resort",
  ][i],
  location: cities[i % cities.length].name,
  type: ["Mixed-Use", "Commercial", "Residential", "Industrial", "Hospitality", "Retail", "Mixed-Use", "Hospitality"][i],
  score: 96 - i * 3,
  roi: +(22 - i * 1.1).toFixed(1),
  risk: 18 + i * 3,
  growth: +(28 - i * 1.4).toFixed(1),
  paybackYears: +(4 + i * 0.4).toFixed(1),
  capitalRequired: (i + 3) * 120_000_000,
  summary:
    "AI-ranked opportunity based on demand momentum, infrastructure pipeline, competitor gaps and macro tailwinds.",
  rank: i + 1,
}));

// -------- AI insights ---------
export const aiInsights: AiInsight[] = [
  {
    id: "ai-1",
    category: "Opportunity",
    title: "NEOM commercial land is undervalued vs. demand trajectory",
    body: "Projected 3-year demand growth of 34% is not yet priced in. Recommend accumulating positions in coastal clusters before Q3 land auctions.",
    confidence: 94,
    tags: ["NEOM", "Land", "Undervalued"],
    timestamp: "2h ago",
  },
  {
    id: "ai-2",
    category: "Risk",
    title: "Construction cost index pressure on mid-market residential",
    body: "Steel and cement inputs up 6.2% QoQ. Margins in mid-market residential compress by an estimated 180bps. Consider hedging via fixed-price contracts.",
    confidence: 88,
    tags: ["Costs", "Residential", "Margin"],
    timestamp: "5h ago",
  },
  {
    id: "ai-3",
    category: "Trend",
    title: "Rental yields converging across tier-1 districts",
    body: "Spread between top and median yields narrowed to 140bps. Diversification benefits are increasing — rebalance portfolios toward emerging districts.",
    confidence: 91,
    tags: ["Yields", "Diversification"],
    timestamp: "1d ago",
  },
  {
    id: "ai-4",
    category: "Recommendation",
    title: "Rotate 8% of capital from luxury to hospitality-adjacent assets",
    body: "Tourism inflows tracking +19% YoY. Hospitality-adjacent retail and F&B show highest incremental ROI per SAR deployed.",
    confidence: 86,
    tags: ["Portfolio", "Hospitality"],
    timestamp: "1d ago",
  },
  {
    id: "ai-5",
    category: "Opportunity",
    title: "Riyadh Metro Line 4 corridor pricing gap",
    body: "Properties within 800m of new stations trade at 12% discount to comparable corridors. Historical arbitrage window closes ~9 months post-opening.",
    confidence: 89,
    tags: ["Riyadh", "Metro", "Arbitrage"],
    timestamp: "2d ago",
  },
];

// -------- Reports ---------
export const reports: ReportItem[] = [
  { id: "r-1", title: "Q3 Saudi Market Intelligence Report", type: "Market", updated: "Nov 12, 2025", pages: 84, summary: "Macro outlook, sector rotation, and forecast scenarios." },
  { id: "r-2", title: "Riyadh Location Deep-Dive", type: "Location", updated: "Nov 08, 2025", pages: 46, summary: "District-level fundamentals, infrastructure and demand signals." },
  { id: "r-3", title: "Skyline Residences — Property Brief", type: "Property", updated: "Nov 04, 2025", pages: 22, summary: "Valuation, comparables, and cash-flow projection." },
  { id: "r-4", title: "2026 Investment Opportunities Handbook", type: "Investment", updated: "Nov 01, 2025", pages: 118, summary: "Top 25 opportunities ranked by AI investment score." },
  { id: "r-5", title: "Developer Landscape & Competitive Positioning", type: "Competitor", updated: "Oct 27, 2025", pages: 58, summary: "Benchmarking of the top 12 developers across KSA." },
  { id: "r-6", title: "NEOM Investment Thesis", type: "Location", updated: "Oct 20, 2025", pages: 64, summary: "Long-horizon thesis with scenario modeling." },
];

// -------- Notifications ---------
export const notifications: NotificationItem[] = [
  { id: "n-1", kind: "alert", title: "Investment Alert", body: "NEOM Coastal Portfolio moved to Rank #1 in AI ranking.", time: "12m ago", read: false },
  { id: "n-2", kind: "market", title: "Market Change", body: "Riyadh land price index +2.4% this week.", time: "1h ago", read: false },
  { id: "n-3", kind: "price", title: "Price Alert", body: "Skyline Residences dropped 3.1% below estimated value.", time: "3h ago", read: true },
  { id: "n-4", kind: "ai", title: "AI Recommendation", body: "Rotate 8% of capital from luxury to hospitality-adjacent assets.", time: "6h ago", read: true },
];

export const watchlist = {
  locations: cities.slice(0, 4).map((c) => c.id),
  properties: properties.slice(0, 3).map((p) => p.id),
  developers: developers.slice(0, 2).map((d) => d.id),
};

export const savedSearches = [
  { id: "s-1", query: "Riyadh mixed-use, ROI > 15%", updated: "Today", results: 34 },
  { id: "s-2", query: "NEOM commercial land, off-plan", updated: "Yesterday", results: 12 },
  { id: "s-3", query: "Jeddah waterfront villas < SAR 4M", updated: "3d ago", results: 21 },
  { id: "s-4", query: "Developers with market share > 15%", updated: "1w ago", results: 5 },
];

export const popularSearches = [
  "Riyadh",
  "NEOM opportunities",
  "Jeddah waterfront",
  "Al Nakhla Holdings",
  "Investment score > 90",
  "Rental yield > 8%",
];

export const recentSearches = ["Riyadh", "Skyline Residences", "NEOM", "Al Khobar"];
