import { Award, Briefcase, Mail, MapPin, Phone } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";


function ProfilePage() {
  return (
    <div className="space-y-6">
      <SectionHeader title="Profile" />
      <div className="card-elevated overflow-hidden">
        <div className="h-32" style={{ background: "var(--gradient-accent)" }} />
        <div className="p-6">
          <div className="-mt-16 flex flex-wrap items-end gap-6">
            <div className="grid h-24 w-24 place-items-center rounded-2xl border-4 border-background bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-purple)] text-2xl font-bold text-white shadow-xl">
              AK
            </div>
            <div className="flex-1">
              <h2 className="font-display text-2xl font-bold">Amir Khan</h2>
              <p className="text-sm text-muted-foreground">Chief Investment Officer · Vision Capital</p>
              <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Mail size={12} /> amir@visioncapital.sa</span>
                <span className="flex items-center gap-1"><Phone size={12} /> +966 5X XXX XXXX</span>
                <span className="flex items-center gap-1"><MapPin size={12} /> Riyadh, KSA</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge icon={<Award size={12} />} label="Platinum Member" tone="purple" />
              <Badge icon={<Briefcase size={12} />} label="12 Active Portfolios" tone="blue" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <StatMini label="Portfolios" value="12" />
        <StatMini label="Watchlist Items" value="34" />
        <StatMini label="Reports Generated" value="128" />
      </div>
    </div>
  );
}

function Badge({ icon, label, tone }: { icon: React.ReactNode; label: string; tone: "purple" | "blue" }) {
  const t = tone === "purple"
    ? "bg-[var(--color-purple)]/15 text-[var(--color-purple)]"
    : "bg-[var(--color-accent)]/15 text-[var(--color-accent)]";
  return <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${t}`}>{icon} {label}</span>;
}
function StatMini({ label, value }: { label: string; value: string }) {
  return (
    <div className="card-elevated p-5">
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-3xl font-bold">{value}</p>
    </div>
  );
}

export default ProfilePage;
