import { Bar, BarChart, CartesianGrid, Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useMockData } from "@/hooks/useMockData";
import { api } from "@/mock/api";
import { DeveloperCard } from "@/components/property/DeveloperCard";
import { ChartCard } from "@/components/common/ChartCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import { tooltipStyle } from "./_app.index";
import { competitorGrowth } from "@/mock/data";
import { fmtNumber } from "@/utils/format";
import { Line, LineChart } from "recharts";


function CompetitorPage() {
  const { data } = useMockData(() => api.getDevelopers());
  const devs = data ?? [];

  const radarData = ["Luxury", "Commercial", "Residential", "ROI", "Growth", "Share"].map((k) => {
    const row: Record<string, number | string> = { k };
    devs.forEach((d) => {
      const map: Record<string, number> = {
        Luxury: d.luxury,
        Commercial: d.commercial,
        Residential: d.residential,
        ROI: d.roi * 4,
        Growth: d.growth * 3,
        Share: d.marketShare * 4,
      };
      row[d.name] = map[k];
    });
    return row;
  });

  const radarColors = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)", "var(--color-chart-4)"];

  return (
    <div className="space-y-8">
      <SectionHeader title="Competitor Intelligence" subtitle="Benchmark developers head-to-head." />

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {devs.map((d, i) => <DeveloperCard key={d.id} d={d} index={i} />)}
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChartCard title="Head-to-Head Radar">
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="var(--color-border)" />
                <PolarAngleAxis dataKey="k" fontSize={11} />
                <PolarRadiusAxis fontSize={9} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                {devs.map((d, i) => (
                  <Radar key={d.id} name={d.name} dataKey={d.name} stroke={radarColors[i]} fill={radarColors[i]} fillOpacity={0.15} />
                ))}
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Growth Trajectory" subtitle="Indexed to 100">
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={competitorGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="date" fontSize={11} />
                <YAxis fontSize={11} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                {(["A", "B", "C", "D"] as const).map((k, i) => (
                  <Line key={k} type="monotone" dataKey={k} name={devs[i]?.name ?? k} stroke={radarColors[i]} strokeWidth={2.5} dot={false} />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChartCard title="Market Share">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={devs}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="name" fontSize={11} />
                <YAxis fontSize={11} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="marketShare" fill="var(--color-accent)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
        <ChartCard title="Land Holdings" subtitle="Millions of m²">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={devs}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="name" fontSize={11} />
                <YAxis fontSize={11} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="landHoldings" fill="var(--color-emerald)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </section>

      <section className="card-elevated overflow-hidden">
        <div className="border-b border-border p-4">
          <h3 className="font-display text-lg font-semibold">Developer Benchmark</h3>
        </div>
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
              <tr>
                {["Developer", "HQ", "Projects", "Upcoming", "ROI", "Growth", "Share", "Strategy"].map((h) => (
                  <th key={h} className="whitespace-nowrap px-4 py-3 text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {devs.map((d) => (
                <tr key={d.id} className="hover:bg-muted/40">
                  <td className="px-4 py-3 font-semibold">{d.name}</td>
                  <td className="px-4 py-3">{d.hq}</td>
                  <td className="px-4 py-3">{fmtNumber(d.projects)}</td>
                  <td className="px-4 py-3">{d.upcomingProjects}</td>
                  <td className="px-4 py-3 font-semibold text-[var(--color-emerald)]">{d.roi}%</td>
                  <td className="px-4 py-3 text-[var(--color-accent)]">{d.growth}%</td>
                  <td className="px-4 py-3">{d.marketShare}%</td>
                  <td className="px-4 py-3">{d.pricingStrategy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default CompetitorPage;
