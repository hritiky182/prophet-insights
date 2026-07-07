import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import type { Kpi } from "@/types";
import { AnimatedCounter } from "./AnimatedCounter";
import { cls } from "@/utils/format";

const accentBar: Record<NonNullable<Kpi["accent"]>, string> = {
  blue: "bg-[var(--color-accent)]",
  emerald: "bg-[var(--color-emerald)]",
  orange: "bg-[var(--color-orange)]",
  purple: "bg-[var(--color-purple)]",
  navy: "bg-[var(--color-navy)]",
};

export function StatCard({ kpi, index = 0 }: { kpi: Kpi; index?: number }) {
  const trendColor =
    kpi.trend === "up"
      ? "text-[var(--color-emerald)]"
      : kpi.trend === "down"
      ? "text-[var(--color-orange)]"
      : "text-muted-foreground";

  const TrendIcon = kpi.trend === "up" ? ArrowUpRight : kpi.trend === "down" ? ArrowDownRight : Minus;
  const decimals = Math.abs(kpi.value) < 100 && !Number.isInteger(kpi.value) ? 1 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="card-elevated card-elevated-hover relative overflow-hidden p-5"
    >
      <div className={cls("absolute left-0 top-0 h-full w-1", accentBar[kpi.accent ?? "blue"])} />
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {kpi.label}
        </p>
        <div
          className={cls(
            "flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold",
            trendColor,
            "bg-muted",
          )}
        >
          <TrendIcon size={12} />
          {Math.abs(kpi.change).toFixed(1)}%
        </div>
      </div>
      <div className="mt-3 font-display text-3xl font-bold tracking-tight">
        <AnimatedCounter
          value={kpi.value}
          decimals={decimals}
          prefix={kpi.prefix}
          suffix={kpi.suffix}
        />
      </div>
    </motion.div>
  );
}
