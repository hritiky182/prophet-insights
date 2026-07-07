import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles } from "lucide-react";
import { useMockData } from "@/hooks/useMockData";
import { api } from "@/mock/api";
import { InsightCard } from "@/components/common/InsightCard";
import { SectionHeader } from "@/components/common/SectionHeader";


type Msg = { role: "user" | "assistant"; text: string };

const suggestions = [
  "Which cities offer the highest ROI right now?",
  "Show me undervalued neighborhoods in Riyadh.",
  "How should I rebalance my portfolio for 2026?",
  "What's the risk of over-supply in Jeddah?",
];

const cannedReplies = [
  "Based on Q3 signals, NEOM (24% growth prediction), Riyadh (18%) and Jeddah waterfront (15%) top the ROI ranking. NEOM's coastal cluster carries the strongest asymmetry — pricing has not yet caught up with the 3-year demand forecast.",
  "Riyadh districts within 800m of Metro Line 4 stations trade at ~12% discount to comparable corridors. Historical arbitrage window closes 6–9 months post-opening.",
  "Rotate 8% of capital from luxury residential to hospitality-adjacent retail. Tourism inflows +19% YoY and F&B rents compounding 4.1% quarterly support the shift.",
  "Jeddah oversupply risk is moderate — supply pipeline exceeds absorption by 12% in mid-market residential. Commercial and mixed-use remain supply-constrained.",
];

function AiPage() {
  const { data: insights } = useMockData(() => api.getAiInsights());
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "assistant", text: "I'm your Terravue AI Copilot. Ask me about markets, locations, opportunities or portfolio strategy." },
  ]);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    if (!text.trim()) return;
    const next: Msg[] = [...msgs, { role: "user", text }];
    setMsgs(next);
    setInput("");
    setTimeout(() => {
      const reply = cannedReplies[Math.floor(Math.random() * cannedReplies.length)];
      setMsgs((m) => [...m, { role: "assistant", text: reply }]);
    }, 600);
  };

  return (
    <div className="space-y-8">
      <SectionHeader title="AI Insights" subtitle="Real-time signals, portfolio recommendations and market synthesis." />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="card-elevated flex h-[600px] flex-col lg:col-span-2">
          <div className="flex items-center gap-2 border-b border-border p-4">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-purple)] text-white">
              <Sparkles size={16} />
            </div>
            <div>
              <p className="font-display font-semibold">Terravue Copilot</p>
              <p className="text-[10px] text-muted-foreground">Model: intel-4-executive · 92% confidence</p>
            </div>
          </div>
          <div className="flex-1 space-y-4 overflow-y-auto scrollbar-thin p-4">
            {msgs.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                    m.role === "user"
                      ? "bg-[var(--color-accent)] text-white"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {m.text}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="border-t border-border p-3">
            <div className="mb-2 flex flex-wrap gap-1.5">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-border px-2.5 py-1 text-xs hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                >
                  {s}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="flex items-center gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Terravue Copilot…"
                className="h-11 flex-1 rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-[var(--color-accent)]"
              />
              <button type="submit" className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--color-accent)] text-white hover:opacity-90">
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-3">
          <div className="card-elevated p-5">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Market Summary</p>
            <p className="mt-2 text-sm">
              Saudi RE market compounding at +11.9% YoY. Investment score at all-time high (87/100). Rotate toward
              hospitality-adjacent assets and NEOM coastal land.
            </p>
          </div>
          <div className="card-elevated p-5">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Emerging Markets</p>
            <ul className="mt-2 space-y-1.5 text-sm">
              <li>• NEOM coastal cluster</li>
              <li>• Riyadh Metro Line 4 corridor</li>
              <li>• Jeddah waterfront revitalization</li>
              <li>• Al Ula heritage-tourism corridor</li>
            </ul>
          </div>
          <div className="card-elevated p-5">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Portfolio Optimization</p>
            <ul className="mt-2 space-y-1.5 text-sm">
              <li>• Reduce luxury residential −8%</li>
              <li>• Increase hospitality retail +5%</li>
              <li>• Add NEOM land +3%</li>
            </ul>
          </div>
        </div>
      </div>

      <section>
        <SectionHeader title="All AI Insights" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {insights?.map((i, idx) => <InsightCard key={i.id} insight={i} index={idx} />)}
        </div>
      </section>
    </div>
  );
}

export default AiPage;
