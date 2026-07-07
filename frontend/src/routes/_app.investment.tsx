import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from "recharts";
import { motion } from "framer-motion";
import { Target, TrendingUp, Shield, Clock } from "lucide-react";
import { useMockData } from "@/hooks/useMockData";
import { api } from "@/mock/api";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ChartCard } from "@/components/common/ChartCard";
import { tooltipStyle } from "./_app.index";
import { fmtCurrency } from "@/utils/format";


function InvestmentPage() {
  const { data } = useMockData(() => api.getOpportunities());
  const opps = data ?? [];

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Investment Opportunities"
        subtitle="AI-ranked opportunities across your investable universe."
      />

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {opps.map((o, i) => (
          <motion.article
            key={o.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="card-elevated card-elevated-hover relative overflow-hidden p-6"
          >
            <div className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-purple)] text-sm font-bold text-white">
              #{o.rank}
            </div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{o.type} · {o.location}</p>
            <h3 className="mt-1 font-display text-lg font-bold leading-snug">{o.title}</h3>
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Investment Score</span>
                <span className="font-bold text-[var(--color-accent)]">{o.score}</span>
              </div>
              <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${o.score}%` }}
                  transition={{ duration: 1, delay: i * 0.05 }}
                  className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-emerald)]"
                />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <Stat icon={<TrendingUp size={12} />} label="ROI" value={`${o.roi}%`} tone="emerald" />
              <Stat icon={<Shield size={12} />} label="Risk" value={`${o.risk}`} tone="orange" />
              <Stat icon={<Target size={12} />} label="Growth" value={`${o.growth}%`} tone="purple" />
              <Stat icon={<Clock size={12} />} label="Payback" value={`${o.paybackYears}y`} tone="blue" />
            </div>
            <div className="mt-4 border-t border-border pt-4 text-xs">
              <p className="text-muted-foreground">Capital Required</p>
              <p className="font-display text-lg font-bold">{fmtCurrency(o.capitalRequired)}</p>
              <p className="mt-2 text-muted-foreground">{o.summary}</p>
            </div>
          </motion.article>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChartCard title="Score Comparison">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={opps} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis type="number" fontSize={11} />
                <YAxis type="category" dataKey="title" fontSize={10} width={180} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="score" fill="var(--color-accent)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Risk vs Return" subtitle="Bubble = capital required">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart>
                <CartesianGrid stroke="var(--color-border)" />
                <XAxis type="number" dataKey="risk" name="Risk" fontSize={11} />
                <YAxis type="number" dataKey="roi" name="ROI" fontSize={11} unit="%" />
                <ZAxis type="number" dataKey="capitalRequired" range={[80, 400]} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ strokeDasharray: "3 3" }} />
                <Scatter data={opps} fill="var(--color-purple)" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </section>

      <section className="card-elevated overflow-hidden">
        <div className="border-b border-border p-4">
          <h3 className="font-display text-lg font-semibold">Opportunity Comparison Table</h3>
        </div>
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
              <tr>
                {["#", "Title", "Location", "Type", "Score", "ROI", "Risk", "Growth", "Payback", "Capital"].map((h) => (
                  <th key={h} className="whitespace-nowrap px-4 py-3 text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {opps.map((o) => (
                <tr key={o.id} className="hover:bg-muted/40">
                  <td className="px-4 py-3 font-semibold">#{o.rank}</td>
                  <td className="px-4 py-3 font-medium">{o.title}</td>
                  <td className="px-4 py-3">{o.location}</td>
                  <td className="px-4 py-3">{o.type}</td>
                  <td className="px-4 py-3 font-semibold text-[var(--color-accent)]">{o.score}</td>
                  <td className="px-4 py-3 font-semibold text-[var(--color-emerald)]">{o.roi}%</td>
                  <td className="px-4 py-3">{o.risk}</td>
                  <td className="px-4 py-3">{o.growth}%</td>
                  <td className="px-4 py-3">{o.paybackYears}y</td>
                  <td className="whitespace-nowrap px-4 py-3">{fmtCurrency(o.capitalRequired)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="card-elevated p-6">
        <h3 className="font-display text-lg font-semibold">AI Explanation</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Rankings blend forward-looking demand signals, competitor gap analysis, macro tailwinds, and Vision 2030
          infrastructure spend. Top opportunities offer &gt;20% ROI with sub-25 risk score, concentrated in NEOM and
          Riyadh commercial corridors. Rebalance recommended: rotate ~8% from mid-market residential toward
          hospitality-adjacent assets.
        </p>
      </section>
    </div>
  );
}

function Stat({ label, value, icon, tone }: { label: string; value: string; icon: React.ReactNode; tone: "emerald" | "orange" | "purple" | "blue" }) {
  const t = {
    emerald: "text-[var(--color-emerald)]",
    orange: "text-[var(--color-orange)]",
    purple: "text-[var(--color-purple)]",
    blue: "text-[var(--color-accent)]",
  }[tone];
  return (
    <div className="rounded-lg bg-muted/50 p-2.5">
      <p className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground">
        {icon} {label}
      </p>
      <p className={`font-display text-sm font-bold ${t}`}>{value}</p>
    </div>
  );
}

export default InvestmentPage;
