import { motion } from "framer-motion";
import { MapPin, Users } from "lucide-react";
import type { City } from "@/types";
import { fmtCompact } from "@/utils/format";

export function LocationCard({ c, index = 0, onClick }: { c: City; index?: number; onClick?: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="card-elevated card-elevated-hover text-left p-5"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin size={12} /> {c.region} Region
          </p>
          <h4 className="mt-1 font-display text-xl font-semibold">{c.name}</h4>
        </div>
        <div className="rounded-lg bg-[var(--color-accent)]/10 px-2.5 py-1 text-xs font-semibold text-[var(--color-accent)]">
          Score {c.investmentScore}
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
        <Cell label="Pop." value={fmtCompact(c.population)} icon={<Users size={11} />} />
        <Cell label="ROI" value={`${c.roi}%`} />
        <Cell label="Yield" value={`${c.rentalYield}%`} />
      </div>
    </motion.button>
  );
}

function Cell({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="rounded-md bg-muted/60 p-2">
      <p className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground">
        {icon} {label}
      </p>
      <p className="font-display text-sm font-semibold">{value}</p>
    </div>
  );
}
