import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { useMockData } from "@/hooks/useMockData";
import { api } from "@/mock/api";
import { PropertyCard } from "@/components/property/PropertyCard";
import { SectionHeader } from "@/components/common/SectionHeader";

export default function PropertyLayout() {
  return <Outlet />;
}

export function PropertyIndex() {
  const { data } = useMockData(() => api.getProperties());
  const [q, setQ] = useState("");
  const [type, setType] = useState("All");
  const filtered = (data ?? []).filter(
    (p) =>
      (type === "All" || p.type === type) &&
      (!q || p.name.toLowerCase().includes(q.toLowerCase()) || p.location.toLowerCase().includes(q.toLowerCase())),
  );

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Property Intelligence"
        subtitle="Search assets. Get AI valuation, comparables and investment grade."
      />

      <div className="card-elevated flex flex-wrap items-center gap-3 p-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search properties by name or location"
            className="h-10 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-sm outline-none focus:border-[var(--color-accent)]"
          />
        </div>
        <select value={type} onChange={(e) => setType(e.target.value)} className="h-10 rounded-lg border border-border bg-background px-3 text-sm">
          {["All", "Villa", "Apartment", "Office", "Retail", "Mixed-Use", "Land"].map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <button className="flex h-10 items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm font-semibold hover:bg-muted">
          <SlidersHorizontal size={14} /> More filters
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((p, i) => <PropertyCard key={p.id} p={p} index={i} />)}
      </div>
    </div>
  );
}
