import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Award, Briefcase, Save, User, Shield, Calendar, Building, CheckCircle2, History } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { toast } from "sonner";
import { motion } from "framer-motion";

function ProfilePage() {
  // Load values from localStorage, fallback to defaults
  const [name, setName] = useState(() => localStorage.getItem("user_name") || "Amir Khan");
  const [email, setEmail] = useState(() => localStorage.getItem("user_email") || "amir.khan@visioncapital.com");
  const [phone, setPhone] = useState(() => localStorage.getItem("user_phone") || "+966 50 123 4567");
  const [location, setLocation] = useState(() => localStorage.getItem("user_location") || "Riyadh, KSA");
  const [title, setTitle] = useState(() => localStorage.getItem("user_title") || "Chief Investment Officer");
  const [company, setCompany] = useState(() => localStorage.getItem("user_company") || "Vision Capital");
  const [dept, setDept] = useState(() => localStorage.getItem("user_dept") || "Capital Markets & Acquisitions");

  const [isSaving, setIsSaving] = useState(false);

  // Derive initials
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      localStorage.setItem("user_name", name);
      localStorage.setItem("user_email", email);
      localStorage.setItem("user_phone", phone);
      localStorage.setItem("user_location", location);
      localStorage.setItem("user_title", title);
      localStorage.setItem("user_company", company);
      localStorage.setItem("user_dept", dept);

      // Dispatch event to sync TopBar
      window.dispatchEvent(new Event("profile-update"));

      setIsSaving(false);
      toast.success("Profile settings updated successfully!");
    }, 800);
  };

  return (
    <div className="space-y-6">
      <SectionHeader title="User Profile" />

      {/* Header Banner Card */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-elevated overflow-hidden border border-border/50 shadow-xl relative"
      >
        {/* Banner with Riyadh skyline accent */}
        <div className="h-36 relative overflow-hidden bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-purple)] to-[oklch(0.25_0.1_250)]">
          <div className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-overlay" style={{ backgroundImage: "url('/login_bg.png')" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
        </div>
        <div className="p-6 relative">
          <div className="-mt-20 flex flex-col md:flex-row items-center md:items-end gap-6 text-center md:text-left">
            {/* Dynamic Avatar */}
            <div className="grid h-28 w-28 place-items-center rounded-2xl border-4 border-background bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-purple)] text-3xl font-bold text-white shadow-2xl">
              {initials}
            </div>
            <div className="flex-1 space-y-1">
              <h2 className="font-display text-2xl font-extrabold text-white">{name}</h2>
              <p className="text-sm font-semibold text-muted-foreground flex items-center justify-center md:justify-start gap-2">
                <Building size={14} className="text-[var(--color-accent)]" /> {title} &middot; {company}
              </p>
              <div className="mt-3 flex flex-wrap justify-center md:justify-start gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><Mail size={12} /> {email}</span>
                <span className="flex items-center gap-1.5"><Phone size={12} /> {phone}</span>
                <span className="flex items-center gap-1.5"><MapPin size={12} /> {location}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 md:self-end">
              <Badge icon={<Award size={12} />} label="Executive Member" tone="purple" />
              <Badge icon={<Briefcase size={12} />} label="12 Active Funds" tone="blue" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left 2 Columns: Edit Details Form */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 card-elevated p-6 border border-border/50 space-y-6"
        >
          <div>
            <h3 className="text-lg font-bold text-foreground">Profile Information</h3>
            <p className="text-xs text-muted-foreground">Update your corporate identification details and regional parameters.</p>
          </div>

          <form onSubmit={handleSave} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground" htmlFor="prof-name">
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/60"><User size={14} /></span>
                  <input
                    id="prof-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background/30 py-2 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-[var(--color-accent)] focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground" htmlFor="prof-email">
                  Corporate Email
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/60"><Mail size={14} /></span>
                  <input
                    id="prof-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background/30 py-2 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-[var(--color-accent)] focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground" htmlFor="prof-phone">
                  Phone Number
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/60"><Phone size={14} /></span>
                  <input
                    id="prof-phone"
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background/30 py-2 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-[var(--color-accent)] focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground" htmlFor="prof-loc">
                  Office Location
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/60"><MapPin size={14} /></span>
                  <input
                    id="prof-loc"
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background/30 py-2 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-[var(--color-accent)] focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground" htmlFor="prof-title">
                  Corporate Title
                </label>
                <input
                  id="prof-title"
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background/30 py-2 px-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-[var(--color-accent)] focus:outline-none transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground" htmlFor="prof-dept">
                  Department
                </label>
                <input
                  id="prof-dept"
                  type="text"
                  required
                  value={dept}
                  onChange={(e) => setDept(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background/30 py-2 px-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-[var(--color-accent)] focus:outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex justify-end pt-3">
              <button
                type="submit"
                disabled={isSaving}
                className="cursor-pointer flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-purple)] px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-accent/20 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {isSaving ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    <Save size={15} /> Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Right 1 Column: Security Card & Activity Log */}
        <div className="space-y-6">
          {/* Security & Access Card */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card-elevated p-6 border border-border/50 space-y-4"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-lg bg-[var(--color-emerald)]/10 text-[var(--color-emerald)]"><Shield size={16} /></span>
              <div>
                <h4 className="text-sm font-bold text-foreground">Security & Status</h4>
                <p className="text-[10px] text-muted-foreground">Session authority parameters</p>
              </div>
            </div>

            <div className="divide-y divide-border/60 text-xs">
              <div className="flex justify-between py-2.5">
                <span className="text-muted-foreground">Account Status</span>
                <span className="flex items-center gap-1 font-semibold text-[var(--color-emerald)]"><CheckCircle2 size={12} /> Active</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-muted-foreground">Clearing Clearance</span>
                <span className="font-semibold text-foreground">Executive Tier-1</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-muted-foreground">Session Expiration</span>
                <span className="font-medium text-foreground flex items-center gap-1"><Calendar size={12} /> 24 Hours</span>
              </div>
            </div>
          </motion.div>

          {/* Recent Activity Log */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card-elevated p-6 border border-border/50 space-y-4"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-lg bg-[var(--color-accent)]/10 text-[var(--color-accent)]"><History size={16} /></span>
              <div>
                <h4 className="text-sm font-bold text-foreground">Recent Activity Log</h4>
                <p className="text-[10px] text-muted-foreground">Audit feed of recent operations</p>
              </div>
            </div>

            <div className="space-y-3 pt-1">
              {[
                { title: "Generated intelligence report", detail: "Riyadh Al-Malqa District", time: "2h ago" },
                { title: "Added property to watchlist", detail: "NEOM Commercial Hub A", time: "1d ago" },
                { title: "Workspace Switch", detail: "Vision Capital · Global", time: "2d ago" },
              ].map((act, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                  <div className="flex-1">
                    <p className="font-semibold text-foreground leading-none">{act.title}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{act.detail}</p>
                  </div>
                  <span className="text-[9px] text-muted-foreground/60">{act.time}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Badge({ icon, label, tone }: { icon: React.ReactNode; label: string; tone: "purple" | "blue" }) {
  const t = tone === "purple"
    ? "bg-[var(--color-purple)]/15 text-[var(--color-purple)] border border-[var(--color-purple)]/25"
    : "bg-[var(--color-accent)]/15 text-[var(--color-accent)] border border-[var(--color-accent)]/25";
  return <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${t}`}>{icon} {label}</span>;
}

export default ProfilePage;
