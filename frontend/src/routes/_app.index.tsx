import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
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
import { StatCard } from "@/components/common/StatCard";
import { ChartCard } from "@/components/common/ChartCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import { InsightCard } from "@/components/common/InsightCard";
import { Heatmap } from "@/components/charts/Heatmap";
import { GaugeChart } from "@/components/charts/GaugeChart";


const chartColors = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
];

function Dashboard() {
  const { data: kpis } = useMockData(() => api.getDashboardKpis());
  const { data: trends } = useMockData(() => api.getMarketTrends());
  const { data: insights } = useMockData(() => api.getAiInsights());

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Executive Intelligence"
        subtitle="Real-time, AI-powered signals across markets, locations, and portfolios."
        action={
          <div className="glass hidden items-center gap-2 rounded-full px-3 py-1.5 text-xs md:flex">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--color-emerald)]" />
            <span className="font-semibold">Live</span>
            <span className="text-muted-foreground">Updated 12s ago</span>
          </div>
        }
      />

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {kpis?.map((k, i) => <StatCard key={k.id} kpi={k} index={i} />)}
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <ChartCard title="Land Price Trend" subtitle="SAR / m² · 12-month rolling" className="lg:col-span-2" delay={0.05}>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trends?.landPrice ?? []}>
                <defs>
                  <linearGradient id="lp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-accent)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="date" stroke="var(--color-muted-foreground)" fontSize={11} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="value" stroke="var(--color-accent)" strokeWidth={2.5} fill="url(#lp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="AI Confidence" subtitle="Model consensus" delay={0.1}>
          <div className="h-72">
            <GaugeChart value={92} label="Confidence" />
          </div>
        </ChartCard>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChartCard title="ROI Growth vs Rental Yield" subtitle="Composite YoY performance" delay={0.05}>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mergeSeries(trends?.roi ?? [], trends?.rentalYield ?? [], "roi", "yield")}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="date" stroke="var(--color-muted-foreground)" fontSize={11} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="roi" stroke="var(--color-chart-2)" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="yield" stroke="var(--color-chart-3)" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Supply vs Demand" subtitle="Rolling 12-month" delay={0.1}>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trends?.supplyDemand ?? []}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="date" stroke="var(--color-muted-foreground)" fontSize={11} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="supply" fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="demand" fill="var(--color-chart-4)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <ChartCard title="Market Segmentation" subtitle="Share by segment" delay={0.05}>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip contentStyle={tooltipStyle} />
                <Pie data={trends?.marketSegmentation ?? []} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={4}>
                  {(trends?.marketSegmentation ?? []).map((_, i) => (
                    <Cell key={i} fill={chartColors[i % chartColors.length]} />
                  ))}
                </Pie>
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Sector Performance" subtitle="Ranking by score" delay={0.1}>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={trends?.sectorPerformance ?? []}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis type="number" stroke="var(--color-muted-foreground)" fontSize={11} />
                <YAxis type="category" dataKey="sector" stroke="var(--color-muted-foreground)" fontSize={11} width={90} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="value" fill="var(--color-accent)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Vacancy Rates" subtitle="Improving trend" delay={0.15}>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trends?.vacancy ?? []}>
                <defs>
                  <linearGradient id="vac" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-orange)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--color-orange)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="date" stroke="var(--color-muted-foreground)" fontSize={11} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="value" stroke="var(--color-orange)" strokeWidth={2.5} fill="url(#vac)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <ChartCard title="Investment Heatmap" subtitle="Score by region × month" className="lg:col-span-2" delay={0.05}>
          <Heatmap
            data={trends?.heatmap ?? []}
            xLabels={["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"]}
            yLabels={["Riyadh", "Jeddah", "Dammam", "Khobar", "NEOM", "Makkah", "Medinah", "Abha"]}
          />
        </ChartCard>

        <ChartCard title="Economic Indicators" subtitle="GDP · Inflation · Employment" delay={0.1}>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trends?.economicIndicators ?? []}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="date" stroke="var(--color-muted-foreground)" fontSize={11} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="gdp" stroke="var(--color-chart-1)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="inflation" stroke="var(--color-chart-3)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="employment" stroke="var(--color-chart-2)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </section>

      <section>
        <SectionHeader title="AI-Generated Insights" subtitle="Priority signals across your portfolio and pipeline." />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {insights?.slice(0, 6).map((ins, i) => <InsightCard key={ins.id} insight={ins} index={i} />)}
        </div>
      </section>
    </div>
  );
}

export const tooltipStyle = {
  background: "var(--color-popover)",
  border: "1px solid var(--color-border)",
  borderRadius: 10,
  fontSize: 12,
  boxShadow: "0 8px 24px oklch(0.2 0.05 258 / 0.12)",
};

function mergeSeries<A extends { date: string; value: number }, B extends { date: string; value: number }>(
  a: A[],
  b: B[],
  keyA: string,
  keyB: string,
) {
  return a.map((p, i) => ({ date: p.date, [keyA]: p.value, [keyB]: b[i]?.value ?? 0 }));
}

export default Dashboard;
