import { useState } from "react";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  Radar,
  RadarChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Search } from "lucide-react";
import { useMockData } from "@/hooks/useMockData";
import { api } from "@/mock/api";
import { LocationCard } from "@/components/property/LocationCard";
import { ChartCard } from "@/components/common/ChartCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import { MapPlaceholder } from "@/components/maps/MapPlaceholder";
import { tooltipStyle } from "./_app.index";
import { fmtCompact, fmtCurrency } from "@/utils/format";
import type { City } from "@/types";


function LocationPage() {
  const { data: cities } = useMockData(() => api.getCities());
  const [selected, setSelected] = useState<City | null>(null);
  const [q, setQ] = useState("");

  const active = selected ?? cities?.[0] ?? null;
  const filtered = (cities ?? []).filter((c) => c.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Location Analytics"
        subtitle="Search a city, district or community — get an AI-scored intelligence brief."
      />

      <div className="relative max-w-2xl">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search Riyadh, NEOM, Jeddah, Al Khobar…"
          className="h-11 w-full rounded-xl border border-border bg-card pl-10 pr-4 text-sm outline-none focus:border-[var(--color-accent)]"
        />
      </div>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((c, i) => (
          <LocationCard key={c.id} c={c} index={i} onClick={() => setSelected(c)} />
        ))}
      </section>

      {active && (
        <motion.section
          key={active.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="card-elevated overflow-hidden">
            <div
              className="p-6 text-white"
              style={{ background: "var(--gradient-navy)" }}
            >
              <p className="text-xs uppercase tracking-widest text-white/60">{active.region} Region</p>
              <h2 className="mt-1 font-display text-3xl font-bold">{active.name}</h2>
              <p className="mt-2 max-w-2xl text-sm text-white/80">{active.aiRecommendation}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Chip label={`Investment ${active.investmentScore}`} tone="emerald" />
                <Chip label={`Risk ${active.riskScore}`} tone="orange" />
                <Chip label={`Growth ${active.growthPrediction}%`} tone="purple" />
                <Chip label={`Livability ${active.livabilityScore}`} tone="blue" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 border-t border-border p-6 md:grid-cols-4">
              <Metric label="Population" value={fmtCompact(active.population)} />
              <Metric label="Avg Income" value={fmtCurrency(active.avgIncome)} />
              <Metric label="Growth Rate" value={`${active.growthRate}%`} />
              <Metric label="Land Price" value={`${active.landPrice} /m²`} />
              <Metric label="Avg Property" value={fmtCurrency(active.avgPropertyPrice)} />
              <Metric label="Rental Yield" value={`${active.rentalYield}%`} />
              <Metric label="ROI" value={`${active.roi}%`} />
              <Metric label="Occupancy" value={`${active.occupancy}%`} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <ChartCard title="Price Forecast" subtitle="12-month projection" className="lg:col-span-2">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={active.priceForecast}>
                    <defs>
                      <linearGradient id="pf" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-accent)" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="date" fontSize={11} />
                    <YAxis fontSize={11} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Area type="monotone" dataKey="value" stroke="var(--color-accent)" strokeWidth={2.5} fill="url(#pf)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>

            <ChartCard title="Infrastructure Radar">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart
                    data={[
                      { k: "Schools", v: Math.min(100, active.schools / 3) },
                      { k: "Hospitals", v: Math.min(100, active.hospitals * 1.5) },
                      { k: "Roads", v: active.roadConnectivity },
                      { k: "Metro", v: active.metroConnectivity },
                      { k: "Commercial", v: Math.min(100, active.commercialGrowth * 8) },
                      { k: "Livability", v: active.livabilityScore },
                    ]}
                  >
                    <PolarGrid stroke="var(--color-border)" />
                    <PolarAngleAxis dataKey="k" fontSize={10} />
                    <PolarRadiusAxis fontSize={9} />
                    <Radar dataKey="v" stroke="var(--color-accent)" fill="var(--color-accent)" fillOpacity={0.3} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <ChartCard title="Demand Forecast">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={active.demandForecast}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="date" fontSize={11} />
                    <YAxis fontSize={11} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Line type="monotone" dataKey="value" stroke="var(--color-emerald)" strokeWidth={2.5} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>
            <ChartCard title="Interactive Map">
              <MapPlaceholder
                height={256}
                markers={[
                  { x: 30, y: 40, label: active.name, intensity: 1 },
                  { x: 55, y: 25, label: "Metro Line 4", intensity: 0.5 },
                  { x: 70, y: 60, label: "Gov. Project", intensity: 0.7 },
                  { x: 20, y: 70, label: "Business Park", intensity: 0.6 },
                ]}
              />
            </ChartCard>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="card-elevated p-5">
              <h4 className="font-display font-semibold">Future Development Projects</h4>
              <ul className="mt-3 space-y-2 text-sm">
                {active.futureProjects.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-elevated p-5">
              <h4 className="font-display font-semibold">Government Investments</h4>
              <ul className="mt-3 space-y-2 text-sm">
                {active.governmentInvestments.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-emerald)]" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>
      )}
    </div>
  );
}

function Chip({ label, tone }: { label: string; tone: "emerald" | "orange" | "purple" | "blue" }) {
  const map = {
    emerald: "bg-[var(--color-emerald)]/20 text-[var(--color-emerald)]",
    orange: "bg-[var(--color-orange)]/20 text-[var(--color-orange)]",
    purple: "bg-[var(--color-purple)]/20 text-[var(--color-purple)]",
    blue: "bg-[var(--color-accent)]/20 text-[var(--color-accent)]",
  } as const;
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${map[tone]}`}>{label}</span>;
}
function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-0.5 font-display text-lg font-bold">{value}</p>
    </div>
  );
}

export default LocationPage;
