import { motion } from "framer-motion";
import { Building2, Star } from "lucide-react";
import type { Developer } from "@/types";
import { fmtNumber } from "@/utils/format";

export function DeveloperCard({ d, index = 0 }: { d: Developer; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="card-elevated card-elevated-hover flex flex-col gap-3 p-5"
    >
      <div className="flex items-center gap-3">
        <div
          className="grid h-12 w-12 shrink-0 place-items-center rounded-xl text-white"
          style={{ background: d.logoColor }}
        >
          <Building2 size={22} />
        </div>
        <div className="min-w-0">
          <p className="truncate font-display text-lg font-semibold">{d.name}</p>
          <p className="text-xs text-muted-foreground">
            HQ · {d.hq} · Est. {d.founded}
          </p>
        </div>
        <div className="ml-auto flex items-center gap-1 text-xs font-semibold text-[var(--color-orange)]">
          <Star size={12} fill="currentColor" /> {d.rating}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <Metric label="Projects" value={fmtNumber(d.projects)} />
        <Metric label="ROI" value={`${d.roi}%`} />
        <Metric label="Share" value={`${d.marketShare}%`} />
      </div>
      <span className="mt-1 inline-flex w-fit rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
        {d.pricingStrategy}
      </span>
    </motion.div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-muted/60 p-2.5">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="font-display text-sm font-semibold">{value}</p>
    </div>
  );
}
