/**
 * Mock API service — mimics a REST client so pages can later swap to real endpoints
 * without changing component code. All functions return Promises.
 */
import * as data from "./data";

const delay = <T>(v: T, ms = 220): Promise<T> =>
  new Promise((r) => setTimeout(() => r(v), ms));

export const api = {
  getDashboardKpis: () => delay(data.dashboardKpis),
  getMarketTrends: () =>
    delay({
      landPrice: data.landPriceTrend,
      roi: data.roiGrowth,
      rentalYield: data.rentalYieldTrend,
      constructionCost: data.constructionCostTrend,
      supplyDemand: data.supplyDemand,
      sectorPerformance: data.sectorPerformance,
      marketSegmentation: data.marketSegmentation,
      economicIndicators: data.economicIndicators,
      competitorGrowth: data.competitorGrowth,
      vacancy: data.vacancyRates,
      priceAppreciation: data.priceAppreciation,
      heatmap: data.heatmapMatrix,
    }),
  getCities: () => delay(data.cities),
  getCity: (id: string) => delay(data.cities.find((c) => c.id === id) ?? null),
  getDevelopers: () => delay(data.developers),
  getProperties: () => delay(data.properties),
  getProperty: (id: string) => delay(data.properties.find((p) => p.id === id) ?? null),
  getOpportunities: () => delay(data.opportunities),
  getAiInsights: () => delay(data.aiInsights),
  getReports: () => delay(data.reports),
  getNotifications: () => delay(data.notifications),
  getWatchlist: () => delay(data.watchlist),
  getSavedSearches: () => delay(data.savedSearches),
  search: (q: string) => {
    const query = q.toLowerCase();
    return delay({
      cities: data.cities.filter((c) => c.name.toLowerCase().includes(query)),
      properties: data.properties.filter(
        (p) => p.name.toLowerCase().includes(query) || p.location.toLowerCase().includes(query),
      ),
      developers: data.developers.filter((d) => d.name.toLowerCase().includes(query)),
    });
  },
};

export type Api = typeof api;
