import { SectionHeader } from "@/components/common/SectionHeader";


function SettingsPage() {
  const sections = [
    {
      title: "Workspace",
      fields: [
        { label: "Organization Name", value: "Vision Capital" },
        { label: "Region", value: "Saudi Arabia" },
        { label: "Currency", value: "SAR" },
        { label: "Time Zone", value: "GMT+3 · Riyadh" },
      ],
    },
    {
      title: "Notifications",
      toggles: [
        { label: "Investment alerts", on: true },
        { label: "Market changes", on: true },
        { label: "Price alerts", on: false },
        { label: "AI recommendations", on: true },
      ],
    },
    {
      title: "AI Preferences",
      toggles: [
        { label: "Aggressive opportunity scoring", on: false },
        { label: "Include off-plan properties", on: true },
        { label: "Prioritize ESG-aligned assets", on: true },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <SectionHeader title="Settings" subtitle="Configure workspace, notifications, and AI preferences." />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {sections.map((s) => (
          <div key={s.title} className="card-elevated p-5">
            <h3 className="font-display text-base font-semibold">{s.title}</h3>
            <div className="mt-4 space-y-3">
              {s.fields?.map((f) => (
                <label key={f.label} className="block">
                  <span className="text-xs font-semibold text-muted-foreground">{f.label}</span>
                  <input defaultValue={f.value} className="mt-1 h-9 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-[var(--color-accent)]" />
                </label>
              ))}
              {s.toggles?.map((t) => (
                <div key={t.label} className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2 text-sm">
                  <span>{t.label}</span>
                  <Toggle initial={t.on} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useState } from "react";
function Toggle({ initial }: { initial: boolean }) {
  const [on, setOn] = useState(initial);
  return (
    <button
      onClick={() => setOn((v) => !v)}
      className={`relative h-5 w-9 rounded-full transition-colors ${on ? "bg-[var(--color-accent)]" : "bg-border"}`}
    >
      <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${on ? "translate-x-4" : "translate-x-0.5"}`} />
    </button>
  );
}

export default SettingsPage;
