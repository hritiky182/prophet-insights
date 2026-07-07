import { Bookmark, ExternalLink, Search } from "lucide-react";
import { useMockData } from "@/hooks/useMockData";
import { api } from "@/mock/api";
import { SectionHeader } from "@/components/common/SectionHeader";


function SavedPage() {
  const { data } = useMockData(() => api.getSavedSearches());
  return (
    <div className="space-y-6">
      <SectionHeader title="Saved Searches" subtitle="Reopen or subscribe to searches for automated alerts." />
      <div className="card-elevated divide-y divide-border">
        {(data ?? []).map((s) => (
          <div key={s.id} className="flex flex-wrap items-center gap-4 p-4">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
              <Bookmark size={16} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold">{s.query}</p>
              <p className="text-xs text-muted-foreground">Updated {s.updated} · {s.results} results</p>
            </div>
            <button className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-semibold hover:border-[var(--color-accent)]">
              <Search size={12} /> Run
            </button>
            <button className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-semibold hover:border-[var(--color-accent)]">
              <ExternalLink size={12} /> Open
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SavedPage;
