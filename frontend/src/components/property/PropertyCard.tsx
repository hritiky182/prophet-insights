import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BedDouble, MapPin, Ruler, TrendingUp } from "lucide-react";
import type { Property } from "@/types";
import { fmtCurrency } from "@/utils/format";

export function PropertyCard({ p, index = 0 }: { p: Property; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="card-elevated card-elevated-hover group overflow-hidden"
    >
      <Link to={`/property/${p.id}`} className="block">
        <div className="relative h-40 w-full overflow-hidden">
          <img
            src={p.image}
            alt={p.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />
          <div className="absolute left-3 top-3 flex gap-2">
            <span className="rounded-md bg-white/90 px-2 py-0.5 text-xs font-semibold text-[var(--color-navy-deep)]">
              {p.type}
            </span>
            <span className="rounded-md bg-[var(--color-accent)] px-2 py-0.5 text-xs font-semibold text-white">
              {p.investmentGrade}
            </span>
          </div>
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <p className="font-display text-lg font-semibold leading-tight">{p.name}</p>
            <p className="mt-0.5 flex items-center gap-1 text-xs opacity-90">
              <MapPin size={12} /> {p.location}
            </p>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Price</p>
              <p className="font-display text-xl font-bold">{fmtCurrency(p.price)}</p>
            </div>
            <div className="flex items-center gap-1 text-sm font-semibold text-[var(--color-emerald)]">
              <TrendingUp size={14} /> {p.roi}% ROI
            </div>
          </div>
          <div className="mt-3 flex items-center gap-4 border-t border-border pt-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Ruler size={12} /> {p.size} m²</span>
            <span className="flex items-center gap-1"><BedDouble size={12} /> {p.bedrooms} bd</span>
            <span className="ml-auto text-foreground">Yield {p.rentalYield}%</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
