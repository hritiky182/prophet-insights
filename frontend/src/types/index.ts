export type Trend = "up" | "down" | "flat";

export interface Kpi {
  id: string;
  label: string;
  value: number;
  unit?: string;
  prefix?: string;
  suffix?: string;
  change: number; // percentage
  trend: Trend;
  icon?: string;
  accent?: "blue" | "emerald" | "orange" | "purple" | "navy";
}

export interface TimeSeriesPoint {
  date: string;
  value: number;
  [k: string]: number | string;
}

export interface City {
  id: string;
  name: string;
  region: string;
  population: number;
  avgIncome: number;
  growthRate: number;
  landPrice: number;
  avgPropertyPrice: number;
  rentalYield: number;
  roi: number;
  demand: number;
  supply: number;
  occupancy: number;
  vacancy: number;
  infrastructureScore: number;
  schools: number;
  hospitals: number;
  roadConnectivity: number;
  metroConnectivity: number;
  commercialGrowth: number;
  crimeIndex: number;
  livabilityScore: number;
  investmentScore: number;
  riskScore: number;
  growthPrediction: number;
  aiRecommendation: string;
  priceForecast: TimeSeriesPoint[];
  demandForecast: TimeSeriesPoint[];
  futureProjects: string[];
  governmentInvestments: string[];
  coordinates: [number, number];
}

export interface Developer {
  id: string;
  name: string;
  logoColor: string;
  founded: number;
  hq: string;
  projects: number;
  roi: number;
  growth: number;
  landHoldings: number; // sqm millions
  marketShare: number;
  pricingStrategy: "Premium" | "Mid-Market" | "Value";
  luxury: number;
  commercial: number;
  residential: number;
  upcomingProjects: number;
  rating: number;
}

export interface Property {
  id: string;
  name: string;
  developer: string;
  location: string;
  city: string;
  coordinates: [number, number];
  type: "Villa" | "Apartment" | "Office" | "Retail" | "Mixed-Use" | "Land";
  price: number;
  pastPrices: TimeSeriesPoint[];
  size: number; // sqm
  bedrooms: number;
  parking: number;
  completion: "Ready" | "Off-Plan" | "Under Construction";
  age: number;
  legalStatus: "Freehold" | "Leasehold";
  image: string;
  demandScore: number;
  riskScore: number;
  investmentGrade: "A+" | "A" | "B+" | "B" | "C";
  liquidityScore: number;
  rentalYield: number;
  roi: number;
  capitalAppreciation: number;
  estimatedValue: number;
  ownershipHistory: { owner: string; year: number }[];
  renovation: RenovationEstimate;
}

export interface RenovationEstimate {
  structural: number;
  interior: number;
  exterior: number;
  electrical: number;
  plumbing: number;
  painting: number;
  hvac: number;
  landscaping: number;
  total: number;
  valueAfter: number;
  expectedRoi: number;
  profitMargin: number;
  timelineWeeks: number;
  risks: string[];
  recommendation: string;
}

export interface InvestmentOpportunity {
  id: string;
  title: string;
  location: string;
  type: string;
  score: number;
  roi: number;
  risk: number;
  growth: number;
  paybackYears: number;
  capitalRequired: number;
  summary: string;
  rank: number;
}

export interface AiInsight {
  id: string;
  category: "Opportunity" | "Risk" | "Trend" | "Recommendation";
  title: string;
  body: string;
  confidence: number;
  tags: string[];
  timestamp: string;
}

export interface ReportItem {
  id: string;
  title: string;
  type: "Market" | "Location" | "Property" | "Investment" | "Competitor";
  updated: string;
  pages: number;
  summary: string;
}

export interface NotificationItem {
  id: string;
  kind: "alert" | "market" | "price" | "ai";
  title: string;
  body: string;
  time: string;
  read: boolean;
}
