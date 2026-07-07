import { Bell, Menu, Search, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/mock/api";
import { popularSearches, recentSearches } from "@/mock/data";
import { Link } from "react-router-dom";

interface Props {
  onOpenSidebar: () => void;
}

export function TopBar({ onOpenSidebar }: Props) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<Awaited<ReturnType<typeof api.search>> | null>(null);
  const [notifOpen, setNotifOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!q) {
      setResults(null);
      return;
    }
    let alive = true;
    api.search(q).then((r) => alive && setResults(r));
    return () => {
      alive = false;
    };
  }, [q]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/70 px-4 backdrop-blur-md">
      <button
        onClick={onOpenSidebar}
        className="grid h-9 w-9 place-items-center rounded-lg border border-border hover:bg-muted lg:hidden"
        aria-label="Open menu"
      >
        <Menu size={18} />
      </button>

      <div ref={wrapRef} className="relative flex-1 max-w-xl">
        <div className="relative">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onFocus={() => setOpen(true)}
            placeholder="Search locations, properties, developers…"
            className="h-10 w-full rounded-lg border border-border bg-muted/40 pl-9 pr-3 text-sm outline-none transition-colors focus:border-[var(--color-accent)] focus:bg-background"
          />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="absolute left-0 right-0 top-12 z-40 max-h-[70vh] overflow-y-auto scrollbar-thin rounded-xl border border-border bg-popover p-3 shadow-2xl"
            >
              {!q && (
                <div className="space-y-4">
                  <SearchGroup label="Recent">
                    {recentSearches.map((r) => (
                      <SearchChip key={r} label={r} onClick={() => setQ(r)} />
                    ))}
                  </SearchGroup>
                  <SearchGroup label="Popular">
                    {popularSearches.map((r) => (
                      <SearchChip key={r} label={r} onClick={() => setQ(r)} />
                    ))}
                  </SearchGroup>
                </div>
              )}
              {q && results && (
                <div className="space-y-3">
                  <ResultBlock title="Locations">
                    {results.cities.slice(0, 5).map((c) => (
                      <div key={c.id} className="rounded-lg px-2 py-1.5 text-sm hover:bg-muted">{c.name} · {c.region}</div>
                    ))}
                    {results.cities.length === 0 && <Empty />}
                  </ResultBlock>
                  <ResultBlock title="Properties">
                    {results.properties.slice(0, 5).map((p) => (
                      <Link key={p.id} to={`/property/${p.id}`} onClick={() => setOpen(false)} className="block rounded-lg px-2 py-1.5 text-sm hover:bg-muted">{p.name} · {p.location}</Link>
                    ))}
                    {results.properties.length === 0 && <Empty />}
                  </ResultBlock>
                  <ResultBlock title="Developers">
                    {results.developers.slice(0, 5).map((d) => (
                      <div key={d.id} className="rounded-lg px-2 py-1.5 text-sm hover:bg-muted">{d.name}</div>
                    ))}
                    {results.developers.length === 0 && <Empty />}
                  </ResultBlock>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button className="hidden items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:bg-muted md:flex">
          Vision Capital <ChevronDown size={14} />
        </button>

        <div className="relative">
          <button
            onClick={() => setNotifOpen((v) => !v)}
            className="relative grid h-9 w-9 place-items-center rounded-lg border border-border hover:bg-muted"
            aria-label="Notifications"
          >
            <Bell size={16} />
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-[var(--color-orange)] ring-2 ring-background" />
          </button>
          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className="absolute right-0 top-11 z-40 w-80 overflow-hidden rounded-xl border border-border bg-popover shadow-2xl"
              >
                <div className="border-b border-border px-4 py-3 text-sm font-semibold">Notifications</div>
                <NotificationList onClose={() => setNotifOpen(false)} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-border bg-background pl-1 pr-2 py-1">
          <div className="grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-purple)] text-xs font-bold text-white">
            AK
          </div>
          <div className="hidden text-left md:block">
            <p className="text-xs font-semibold leading-tight">Amir Khan</p>
            <p className="text-[10px] text-muted-foreground">Chief Investment Officer</p>
          </div>
        </div>
      </div>
    </header>
  );
}

function NotificationList({ onClose }: { onClose: () => void }) {
  const [items, setItems] = useState<Awaited<ReturnType<typeof api.getNotifications>>>([]);
  useEffect(() => {
    api.getNotifications().then(setItems);
  }, []);
  return (
    <ul className="max-h-96 divide-y divide-border overflow-y-auto scrollbar-thin">
      {items.map((n) => (
        <li key={n.id} className="px-4 py-3 hover:bg-muted">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm font-semibold">{n.title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{n.body}</p>
            </div>
            {!n.read && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--color-accent)]" />}
          </div>
          <p className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">{n.time}</p>
        </li>
      ))}
      <li className="px-4 py-2 text-center">
        <button onClick={onClose} className="text-xs font-semibold text-[var(--color-accent)]">Close</button>
      </li>
    </ul>
  );
}

function SearchGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-1.5 px-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}
function SearchChip({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="rounded-md bg-muted px-2 py-1 text-xs font-medium hover:bg-[var(--color-accent)]/10 hover:text-[var(--color-accent)]">
      {label}
    </button>
  );
}
function ResultBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-1 px-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{title}</p>
      <div>{children}</div>
    </div>
  );
}
function Empty() {
  return <div className="px-2 py-1.5 text-xs text-muted-foreground">No results</div>;
}
