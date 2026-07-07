import { MapPin } from "lucide-react";

interface Marker {
  x: number; // 0-100
  y: number; // 0-100
  label: string;
  intensity?: number; // 0-1
}

export function MapPlaceholder({
  markers = [],
  height = 360,
  title = "Interactive Map",
}: {
  markers?: Marker[];
  height?: number;
  title?: string;
}) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-xl border border-border grid-bg"
      style={{
        height,
        background:
          "radial-gradient(1200px 400px at 50% -20%, oklch(0.62 0.19 250 / 0.14), transparent 60%), linear-gradient(180deg, oklch(0.98 0.008 250), oklch(0.94 0.02 250))",
      }}
    >
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
      <div className="absolute left-3 top-3 rounded-md bg-white/80 px-2 py-1 text-xs font-medium backdrop-blur">
        {title}
      </div>
      {markers.map((m, i) => {
        const size = 10 + (m.intensity ?? 0.5) * 24;
        return (
          <div
            key={i}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${m.x}%`, top: `${m.y}%` }}
          >
            <div
              className="animate-ping-slow rounded-full bg-[var(--color-accent)]/30"
              style={{ width: size, height: size }}
            />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-accent)] p-1 text-white shadow-lg">
              <MapPin size={10} />
            </div>
            <span className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded bg-[var(--color-navy-deep)] px-1.5 py-0.5 text-[10px] font-medium text-white shadow">
              {m.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
