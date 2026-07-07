import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, BedDouble, Building2, Car, MapPin, Ruler } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
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
import { GaugeChart } from "@/components/charts/GaugeChart";
import { tooltipStyle } from "./_app.index";
import { fmtCurrency, fmtNumber } from "@/utils/format";
import { useState } from "react";

export const colors = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)", "var(--color-chart-4)", "var(--color-chart-5)", "var(--color-purple)", "var(--color-orange)", "var(--color-emerald)"];

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: p } = useMockData(() => api.getProperty(id), [id]);
  const [loanAmount, setLoanAmount] = useState(70);
  const [rate, setRate] = useState(5.5);
  const [years, setYears] = useState(20);

  if (!p) return <div className="p-8 text-muted-foreground">Loading…</div>;

  const loan = p.price * (loanAmount / 100);
  const monthly = (loan * (rate / 100 / 12)) / (1 - Math.pow(1 + rate / 100 / 12, -years * 12));
  const annualRent = p.price * (p.rentalYield / 100);
  const breakEven = (p.price - loan) / (annualRent - monthly * 12);

  const renovationBreakdown = [
    { name: "Structural", value: p.renovation.structural },
    { name: "Interior", value: p.renovation.interior },
    { name: "Exterior", value: p.renovation.exterior },
    { name: "Electrical", value: p.renovation.electrical },
    { name: "Plumbing", value: p.renovation.plumbing },
    { name: "HVAC", value: p.renovation.hvac },
    { name: "Painting", value: p.renovation.painting },
    { name: "Landscaping", value: p.renovation.landscaping },
  ];

  const cashflow = Array.from({ length: 10 }, (_, i) => ({
    year: `Y${i + 1}`,
    cashflow: Math.round((annualRent - monthly * 12) * (1 + i * 0.035)),
  }));

  return (
    <div className="space-y-6">
      <Link to="/property" className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground">
        <ArrowLeft size={14} /> Back to properties
      </Link>

      <motion.header
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-elevated overflow-hidden"
      >
        <div className="relative h-64 w-full">
          <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="mb-2 flex flex-wrap gap-2">
              <span className="rounded-md bg-[var(--color-accent)] px-2 py-0.5 text-xs font-semibold">{p.investmentGrade}</span>
              <span className="rounded-md bg-white/20 px-2 py-0.5 text-xs font-semibold backdrop-blur">{p.type}</span>
              <span className="rounded-md bg-white/20 px-2 py-0.5 text-xs font-semibold backdrop-blur">{p.completion}</span>
            </div>
            <h1 className="font-display text-3xl font-bold sm:text-4xl">{p.name}</h1>
            <p className="mt-1 flex flex-wrap items-center gap-3 text-sm text-white/85">
              <span className="flex items-center gap-1"><Building2 size={14} /> {p.developer}</span>
              <span className="flex items-center gap-1"><MapPin size={14} /> {p.location}</span>
              <span>· {p.coordinates[0].toFixed(2)}, {p.coordinates[1].toFixed(2)}</span>
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 border-t border-border p-6 md:grid-cols-4 lg:grid-cols-6">
          <Metric label="Price" value={fmtCurrency(p.price)} />
          <Metric label="Est. Value" value={fmtCurrency(p.estimatedValue)} />
          <Metric label="Size" value={`${p.size} m²`} icon={<Ruler size={12} />} />
          <Metric label="Bedrooms" value={`${p.bedrooms}`} icon={<BedDouble size={12} />} />
          <Metric label="Parking" value={`${p.parking}`} icon={<Car size={12} />} />
          <Metric label="Legal" value={p.legalStatus} />
        </div>
      </motion.header>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <MiniStat label="Rental Yield" value={`${p.rentalYield}%`} tone="emerald" />
        <MiniStat label="ROI" value={`${p.roi}%`} tone="blue" />
        <MiniStat label="Cap. Appreciation" value={`${p.capitalAppreciation}%`} tone="purple" />
        <MiniStat label="Demand Score" value={`${p.demandScore}`} tone="emerald" />
        <MiniStat label="Risk Score" value={`${p.riskScore}`} tone="orange" />
        <MiniStat label="Liquidity" value={`${p.liquidityScore}`} tone="blue" />
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <ChartCard title="Price History & Appreciation" className="lg:col-span-2">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={p.pastPrices}>
                <defs>
                  <linearGradient id="ph" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-accent)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="date" fontSize={11} />
                <YAxis fontSize={11} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="value" stroke="var(--color-accent)" strokeWidth={2.5} fill="url(#ph)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Investment Score">
          <div className="h-72"><GaugeChart value={p.demandScore} label="AI Score" /></div>
        </ChartCard>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChartCard title="10-Year Cash Flow Projection">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cashflow}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="year" fontSize={11} />
                <YAxis fontSize={11} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="cashflow" fill="var(--color-emerald)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <div className="card-elevated p-5">
          <h3 className="font-display text-base font-semibold">Loan Calculator</h3>
          <p className="text-xs text-muted-foreground">Simulate mortgage and break-even.</p>
          <div className="mt-4 space-y-4">
            <Slider label={`Loan-to-Value: ${loanAmount}%`} value={loanAmount} min={20} max={90} step={5} onChange={setLoanAmount} />
            <Slider label={`Interest Rate: ${rate.toFixed(1)}%`} value={rate} min={2} max={10} step={0.1} onChange={setRate} />
            <Slider label={`Term: ${years} years`} value={years} min={5} max={30} step={1} onChange={setYears} />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3 border-t border-border pt-4 text-center">
            <Kv label="Monthly Payment" value={fmtCurrency(monthly)} />
            <Kv label="Annual Rent" value={fmtCurrency(annualRent)} />
            <Kv label="Break-even" value={`${breakEven.toFixed(1)}y`} />
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <ChartCard title="Renovation Cost Breakdown" className="lg:col-span-2">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => fmtCurrency(v)} />
                <Pie data={renovationBreakdown} dataKey="value" nameKey="name" innerRadius={55} outerRadius={110} paddingAngle={2}>
                  {renovationBreakdown.map((_, i) => (
                    <Cell key={i} fill={colors[i % colors.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <div className="card-elevated space-y-3 p-5">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Renovation Intelligence</p>
          <div className="space-y-2 text-sm">
            <RowKv label="Total Renovation Cost" value={fmtCurrency(p.renovation.total)} />
            <RowKv label="Value After Renovation" value={fmtCurrency(p.renovation.valueAfter)} />
            <RowKv label="Investment Required" value={fmtCurrency(p.price + p.renovation.total)} />
            <RowKv label="Expected ROI" value={`${p.renovation.expectedRoi}%`} tone="emerald" />
            <RowKv label="Profit Margin" value={`${p.renovation.profitMargin}%`} tone="emerald" />
            <RowKv label="Timeline" value={`${p.renovation.timelineWeeks} weeks`} />
          </div>
          <div>
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Risk Factors</p>
            <ul className="space-y-1 text-xs">
              {p.renovation.risks.map((r) => <li key={r}>• {r}</li>)}
            </ul>
          </div>
          <div className="rounded-lg bg-[var(--color-accent)]/10 p-3 text-xs text-foreground">
            <p className="mb-1 font-semibold text-[var(--color-accent)]">AI Recommendation</p>
            {p.renovation.recommendation}
          </div>
        </div>
      </section>

      <section className="card-elevated p-5">
        <h3 className="font-display text-base font-semibold">Ownership History</h3>
        <ul className="mt-3 divide-y divide-border">
          {p.ownershipHistory.map((o) => (
            <li key={o.year} className="flex items-center justify-between py-2 text-sm">
              <span>{o.owner}</span>
              <span className="text-muted-foreground">{o.year}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function Metric({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div>
      <p className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground">{icon} {label}</p>
      <p className="mt-0.5 font-display text-base font-bold">{value}</p>
    </div>
  );
}
function MiniStat({ label, value, tone }: { label: string; value: string; tone: "emerald" | "blue" | "purple" | "orange" }) {
  const bg = {
    emerald: "bg-[var(--color-emerald)]",
    blue: "bg-[var(--color-accent)]",
    purple: "bg-[var(--color-purple)]",
    orange: "bg-[var(--color-orange)]",
  }[tone];
  return (
    <div className="card-elevated relative overflow-hidden p-4">
      <span className={`absolute inset-y-0 left-0 w-1 ${bg}`} />
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-xl font-bold">{value}</p>
    </div>
  );
}
function Slider({ label, value, min, max, step, onChange }: { label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold">{label}</label>
      <input type="range" value={value} min={min} max={max} step={step} onChange={(e) => onChange(Number(e.target.value))} className="w-full accent-[var(--color-accent)]" />
    </div>
  );
}
function Kv({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase text-muted-foreground">{label}</p>
      <p className="font-display text-sm font-semibold">{value}</p>
    </div>
  );
}
function RowKv({ label, value, tone }: { label: string; value: string; tone?: "emerald" }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={`font-semibold ${tone === "emerald" ? "text-[var(--color-emerald)]" : ""}`}>{value}</span>
    </div>
  );
}
// prevent unused import removal
void fmtNumber;
