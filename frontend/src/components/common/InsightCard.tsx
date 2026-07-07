import { motion } from "framer-motion";
import { Sparkles, TrendingUp, AlertTriangle, Compass } from "lucide-react";
import type { AiInsight } from "@/types";
import { cls } from "@/utils/format";

const iconMap = {
  Opportunity: Sparkles,
  Risk: AlertTriangle,
  Trend: TrendingUp,
  Recommendation: Compass,
};

const colorMap: Record<AiInsight["category"], string> = {
  Opportunity: "text-[var(--color-emerald)] bg-[color-mix(in_oklab,var(--color-emerald)_15%,transparent)]",
  Risk: "text-[var(--color-orange)] bg-[color-mix(in_oklab,var(--color-orange)_15%,transparent)]",
  Trend: "text-[var(--color-accent)] bg-[color-mix(in_oklab,var(--color-accent)_15%,transparent)]",
  Recommendation: "text-[var(--color-purple)] bg-[color-mix(in_oklab,var(--color-purple)_15%,transparent)]",
};

export function InsightCard({ insight, index = 0 }: { insight: AiInsight; index?: number }) {
  const Icon = iconMap[insight.category];
  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="card-elevated card-elevated-hover flex flex-col gap-3 p-5"
    >
      <div className="flex items-center justify-between">
        <span className={cls("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold", colorMap[insight.category])}>
          <Icon size={12} /> {insight.category}
        </span>
        <span className="text-xs text-muted-foreground">{insight.timestamp}</span>
      </div>
      <h4 className="font-display text-base font-semibold leading-snug">{insight.title}</h4>
      <p className="text-sm text-muted-foreground">{insight.body}</p>
      <div className="mt-auto flex items-center justify-between pt-2">
        <div className="flex flex-wrap gap-1.5">
          {insight.tags.map((t) => (
            <span key={t} className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
              {t}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-muted-foreground">Confidence</span>
          <span className="font-semibold text-foreground">{insight.confidence}%</span>
        </div>
      </div>
    </motion.article>
  );
}
