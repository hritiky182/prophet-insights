import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./styles.css";
import AppLayout from "./routes/_app";
import Dashboard from "./routes/_app.index";
import MarketIntelligence from "./routes/_app.market";
import LocationAnalytics from "./routes/_app.location";
import PropertyLayout, { PropertyIndex } from "./routes/_app.property";
import PropertyDetail from "./routes/_app.property.$id";
import InvestmentOpportunities from "./routes/_app.investment";
import CompetitorAnalysis from "./routes/_app.competitor";
import AiInsights from "./routes/_app.ai-insights";
import Reports from "./routes/_app.reports";
import SavedSearches from "./routes/_app.saved-searches";
import Watchlist from "./routes/_app.watchlist";
import Settings from "./routes/_app.settings";
import Profile from "./routes/_app.profile";
import { Toaster } from "@/components/ui/sonner";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="market" element={<MarketIntelligence />} />
            <Route path="location" element={<LocationAnalytics />} />
            <Route path="property" element={<PropertyLayout />}>
              <Route index element={<PropertyIndex />} />
              <Route path=":id" element={<PropertyDetail />} />
            </Route>
            <Route path="investment" element={<InvestmentOpportunities />} />
            <Route path="competitor" element={<CompetitorAnalysis />} />
            <Route path="ai-insights" element={<AiInsights />} />
            <Route path="reports" element={<Reports />} />
            <Route path="saved-searches" element={<SavedSearches />} />
            <Route path="watchlist" element={<Watchlist />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </QueryClientProvider>
  </React.StrictMode>
);
