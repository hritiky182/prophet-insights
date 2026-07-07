import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  LineChart,
  MapPinned,
  Building2,
  Target,
  Users2,
  Sparkles,
  FileText,
  Bookmark,
  Star,
  Settings,
  Gem,
} from "lucide-react";
import { cls } from "@/utils/format";

const nav: { to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean }[] = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/market", label: "Market Intelligence", icon: LineChart },
  { to: "/location", label: "Location Analytics", icon: MapPinned },
  { to: "/property", label: "Property Intelligence", icon: Building2 },
  { to: "/investment", label: "Investment Opportunities", icon: Target },
  { to: "/competitor", label: "Competitor Analysis", icon: Users2 },
  { to: "/ai-insights", label: "AI Insights", icon: Sparkles },
  { to: "/reports", label: "Reports", icon: FileText },
];

const secondary: { to: string; label: string; icon: typeof LayoutDashboard }[] = [
  { to: "/saved-searches", label: "Saved Searches", icon: Bookmark },
  { to: "/watchlist", label: "Watchlist", icon: Star },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function AppSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const { pathname } = useLocation();

  const isActive = (to: string, exact?: boolean) =>
    exact ? pathname === to : pathname === to || pathname.startsWith(to + "/");

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-purple)] text-white">
          <Gem size={18} />
        </div>
        <div className="min-w-0">
          <p className="font-display text-sm font-bold leading-tight">Terravue</p>
          <p className="truncate text-[10px] uppercase tracking-wider text-sidebar-foreground/60">
            Real Estate Intelligence
          </p>
        </div>
      </div>

      <div className="px-3">
        <div className="rounded-lg border border-sidebar-border bg-sidebar-accent/50 px-3 py-2.5">
          <p className="text-[10px] uppercase tracking-wider text-sidebar-foreground/60">Workspace</p>
          <p className="mt-0.5 truncate text-sm font-semibold">Vision Capital · KSA</p>
        </div>
      </div>

      <nav className="mt-4 flex-1 overflow-y-auto scrollbar-thin px-3 pb-4">
        <p className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/50">
          Intelligence
        </p>
        <ul className="space-y-0.5">
          {nav.map((n) => {
            const active = isActive(n.to, n.exact);
            return (
              <li key={n.to}>
                <Link
                  to={n.to}
                  onClick={onNavigate}
                  className={cls(
                    "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    active
                      ? "bg-sidebar-accent text-white shadow-[inset_2px_0_0_var(--color-accent)]"
                      : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-white",
                  )}
                >
                  <n.icon size={16} className={active ? "text-[var(--color-accent)]" : ""} />
                  <span className="truncate">{n.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <p className="mt-6 px-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/50">
          Workspace
        </p>
        <ul className="space-y-0.5">
          {secondary.map((n) => {
            const active = isActive(n.to);
            return (
              <li key={n.to}>
                <Link
                  to={n.to}
                  onClick={onNavigate}
                  className={cls(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    active
                      ? "bg-sidebar-accent text-white"
                      : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-white",
                  )}
                >
                  <n.icon size={16} />
                  <span className="truncate">{n.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <div className="rounded-lg bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-purple)]/20 p-3">
          <p className="text-xs font-semibold">AI Copilot</p>
          <p className="mt-0.5 text-[11px] text-sidebar-foreground/70">92% confidence · Live signals</p>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-sidebar-border">
            <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-purple)]" />
          </div>
        </div>
      </div>
    </aside>
  );
}
