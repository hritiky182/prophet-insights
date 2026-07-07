import { motion } from "framer-motion";
import { Download, Eye, FileSpreadsheet, Mail, FileText } from "lucide-react";
import { useMockData } from "@/hooks/useMockData";
import { api } from "@/mock/api";
import { SectionHeader } from "@/components/common/SectionHeader";
import { toast } from "sonner";

const typeColors: Record<string, string> = {
  Market: "var(--color-accent)",
  Location: "var(--color-emerald)",
  Property: "var(--color-purple)",
  Investment: "var(--color-orange)",
  Competitor: "var(--color-chart-5)",
};

function ReportsPage() {
  const { data } = useMockData(() => api.getReports());
  return (
    <div className="space-y-8">
      <SectionHeader title="Reports" subtitle="Curated intelligence reports across markets, locations, properties and competitors." />

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {(data ?? []).map((r, i) => (
          <motion.article
            key={r.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="card-elevated card-elevated-hover flex flex-col gap-4 p-5"
          >
            <div className="flex items-start justify-between">
              <div
                className="grid h-11 w-11 place-items-center rounded-xl text-white"
                style={{ background: typeColors[r.type] ?? "var(--color-accent)" }}
              >
                <FileText size={18} />
              </div>
              <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {r.type}
              </span>
            </div>
            <div>
              <h3 className="font-display text-base font-semibold leading-snug">{r.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{r.summary}</p>
            </div>
            <div className="mt-auto flex items-center justify-between text-[11px] text-muted-foreground">
              <span>Updated {r.updated}</span>
              <span>{r.pages} pages</span>
            </div>
            <div className="flex flex-wrap gap-2 border-t border-border pt-3">
              <BtnAction icon={<Eye size={12} />} label="View" title={r.title} />
              <BtnAction icon={<Download size={12} />} label="PDF" title={r.title} />
              <BtnAction icon={<FileSpreadsheet size={12} />} label="Excel" title={r.title} />
              <BtnAction icon={<Mail size={12} />} label="Email" title={r.title} />
            </div>
          </motion.article>
        ))}
      </section>
    </div>
  );
}

function BtnAction({ icon, label, title }: { icon: React.ReactNode; label: string; title: string }) {
  const handleClick = () => {
    if (label === "View") {
      toast(`Opening viewer for: ${title}`, {
        description: "Rendering high-fidelity interactive report..."
      });
    } else if (label === "PDF") {
      toast.success(`PDF downloaded: ${title}.pdf`, {
        description: "Check your browser downloads directory."
      });
    } else if (label === "Excel") {
      toast.success(`Excel sheet exported: ${title}.xlsx`, {
        description: "Formatted financial tables extracted."
      });
    } else if (label === "Email") {
      toast.info(`Sending email dispatch...`, {
        description: `Dispatched to chief-investments@vision-capital.sa`
      });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs font-semibold hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] cursor-pointer"
    >
      {icon} {label}
    </button>
  );
}

export default ReportsPage;
