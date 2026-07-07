import { RadialBar, RadialBarChart, ResponsiveContainer, PolarAngleAxis } from "recharts";

export function GaugeChart({ value, label, color = "var(--color-accent)" }: {
  value: number;
  label?: string;
  color?: string;
}) {
  const data = [{ name: "v", value, fill: color }];
  return (
    <div className="relative h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          innerRadius="70%"
          outerRadius="100%"
          data={data}
          startAngle={210}
          endAngle={-30}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar dataKey="value" cornerRadius={12} background={{ fill: "oklch(0.94 0.01 250)" }} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-3xl font-bold">{value}</span>
        {label && <span className="text-xs text-muted-foreground">{label}</span>}
      </div>
    </div>
  );
}
