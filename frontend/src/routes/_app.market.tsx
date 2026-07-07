import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useMockData } from "@/hooks/useMockData";
import { api } from "@/mock/api";
import { ChartCard } from "@/components/common/ChartCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Heatmap } from "@/components/charts/Heatmap";
import { InsightCard } from "@/components/common/InsightCard";
import { tooltipStyle } from "./_app.index";
import { cities, developers } from "@/mock/data";


const colors = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
];

function MarketPage() {
  const { data: trends } = useMockData(() => api.getMarketTrends());
  const { data: insights } = useMockData(() => api.getAiInsights());

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Market Intelligence"
        subtitle="Macro-level intelligence across cities, sectors and macro drivers."
      />

      <Filters />

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatMini label="Population Growth" value="+2.4%" tone="emerald" />
        <StatMini label="Infrastructure Score" value="82 / 100" tone="blue" />
        <StatMini label="Investment Risk" value="Low" tone="emerald" />
        <StatMini label="Gov. Projects Live" value="128" tone="purple" />
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <ChartCard title="Supply vs Demand" subtitle="Rolling 12 months" className="lg:col-span-2">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trends?.supplyDemand ?? []}>
                <defs>
                  <linearGradient id="ms" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="md" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-chart-4)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--color-chart-4)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="date" fontSize={11} stroke="var(--color-muted-foreground)" />
                <YAxis fontSize={11} stroke="var(--color-muted-foreground)" />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="supply" stroke="var(--color-chart-1)" fill="url(#ms)" strokeWidth={2} />
                <Area type="monotone" dataKey="demand" stroke="var(--color-chart-4)" fill="url(#md)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Demand Index by City">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={cities.map((c) => ({ name: c.name, demand: c.demand }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis type="number" fontSize={11} stroke="var(--color-muted-foreground)" />
                <YAxis type="category" dataKey="name" fontSize={11} stroke="var(--color-muted-foreground)" width={80} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="demand" fill="var(--color-accent)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChartCard title="Growth Forecast" subtitle="Composite 12-month">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trends?.priceAppreciation ?? []}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="date" fontSize={11} stroke="var(--color-muted-foreground)" />
                <YAxis fontSize={11} stroke="var(--color-muted-foreground)" />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="value" stroke="var(--color-emerald)" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Economic Correlation" subtitle="GDP × Inflation × Employment">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trends?.economicIndicators ?? []}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="date" fontSize={11} stroke="var(--color-muted-foreground)" />
                <YAxis fontSize={11} stroke="var(--color-muted-foreground)" />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="gdp" stroke="var(--color-chart-1)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="inflation" stroke="var(--color-chart-3)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="employment" stroke="var(--color-chart-2)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <ChartCard title="Price Heatmap" subtitle="Score by region × month" className="lg:col-span-2">
          <Heatmap
            data={trends?.heatmap ?? []}
            xLabels={["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"]}
            yLabels={cities.map((c) => c.name)}
          />
        </ChartCard>

        <ChartCard title="Segment Mix">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip contentStyle={tooltipStyle} />
                <Pie data={trends?.marketSegmentation ?? []} dataKey="value" nameKey="name" innerRadius={50} outerRadius={95}>
                  {(trends?.marketSegmentation ?? []).map((_, i) => (
                    <Cell key={i} fill={colors[i % colors.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </section>

      <section className="card-elevated p-6">
        <h3 className="font-display text-lg font-semibold">AI Market Summary</h3>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Saudi Arabia's real estate market shows robust +11.9% YoY growth driven by Vision 2030 infrastructure
          spend, tourism tailwinds, and demand outpacing supply across tier-1 cities. Riyadh and NEOM lead
          on investment score; Jeddah is a value opportunity as competitor concentration eases.
          Construction cost pressures compress mid-market residential margins by ~180bps — hedge inputs.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {["Vision 2030", "Tourism +19%", "Metro Corridors", "Hospitality Rotation", "Land Auctions Q3"].map((t) => (
            <span key={t} className="rounded-md bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">{t}</span>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader title="Signals" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {insights?.map((i, idx) => <InsightCard key={i.id} insight={i} index={idx} />)}
        </div>
      </section>
    </div>
  );
}

function Filters() {
  const options = [
    { label: "City", values: ["All", ...cities.map((c) => c.name)] },
    { label: "Region", values: ["All", "Central", "Western", "Eastern", "Southern", "Tabuk"] },
    { label: "Property Type", values: ["All", "Villa", "Apartment", "Office", "Retail", "Mixed-Use"] },
    { label: "Developer", values: ["All", ...developers.map((d) => d.name)] },
    { label: "Price Range", values: ["All", "< 1M", "1–5M", "5–20M", "> 20M"] },
    { label: "Date Range", values: ["1M", "3M", "6M", "YTD", "1Y", "All"] },
  ];
  return (
    <div className="card-elevated p-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {options.map((o) => (
          <label key={o.label} className="flex flex-col gap-1 text-xs">
            <span className="font-semibold text-muted-foreground">{o.label}</span>
            <select className="h-9 rounded-md border border-border bg-background px-2 text-sm outline-none focus:border-[var(--color-accent)]">
              {o.values.map((v) => <option key={v}>{v}</option>)}
            </select>
          </label>
        ))}
      </div>
    </div>
  );
}

function StatMini({ label, value, tone }: { label: string; value: string; tone: "emerald" | "blue" | "purple" | "orange" }) {
  const bg =
    tone === "emerald" ? "bg-[var(--color-emerald)]" :
    tone === "blue" ? "bg-[var(--color-accent)]" :
    tone === "purple" ? "bg-[var(--color-purple)]" :
    "bg-[var(--color-orange)]";
  return (
    <div className="card-elevated relative overflow-hidden p-4">
      <span className={`absolute inset-y-0 left-0 w-1 ${bg}`} />
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-xl font-bold">{value}</p>
    </div>
  );
}

export default MarketPage;
