"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Check, X } from "lucide-react";

// These describe where Samskriti is headed — the long-term goal, not what ships today.
// Today's shipping product is the local pipx MCP server (shared project memory) above.
const goalRows = [
  { feature: "Remembers facts you tell it", chatgpt: true },
  { feature: "Carries project context across different AI tools", chatgpt: false, highlight: true },
  { feature: "Grows a personality over time", chatgpt: false, highlight: true },
  { feature: "Picks the relationship back up where you left off", chatgpt: false, highlight: true },
  { feature: "Keeps its personality after a model upgrade", chatgpt: false },
  { feature: "Sticks to the rules you set, reliably", chatgpt: false },
  { feature: "Snapshot and roll back its state anytime", chatgpt: false },
  { feature: "Runs entirely on your own machine", chatgpt: false },
];

export function ComparisonTable() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="compare" className="relative overflow-hidden scroll-mt-24" ref={ref}>
      <div className="section-divider" />
      <div className="orb orb-saffron w-[500px] h-[500px] bottom-[-200px] right-[-150px] opacity-15" />

      <div className="section-container max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 1, ease: [0.2, 0, 0, 1] }}
        >
          <div className="text-center mb-16">
            <p className="text-overline mb-6 font-mono tracking-[0.25em] text-white/35">The goal</p>
            <h2 className="heading-section">
              More than memory. <span className="text-gradient">A companion that carries you.</span>
            </h2>
            <p className="text-body-lg max-w-2xl mx-auto mt-4">
              Standard model memory recalls text facts. This is the direction we&apos;re building
              toward — most of these are goals, not features that ship today. Shared project
              memory across tools is the first step, live now above.
            </p>
          </div>

          <div className="overflow-x-auto border border-white/[0.08] rounded-2xl bg-[#070710]">
            <table className="w-full min-w-[600px] border-collapse text-left text-[15px]">
              <thead>
                <tr className="border-b border-white/[0.08] bg-black/40">
                  <th className="p-5 font-semibold text-white/65 text-[14px] uppercase tracking-wider">Where this is going</th>
                  <th className="p-5 font-semibold text-white/65 text-[14px] uppercase tracking-wider text-center">ChatGPT / Claude Memory</th>
                  <th className="p-5 font-semibold text-white text-[13px] uppercase tracking-wider text-center bg-indigo/5 border-x border-white/[0.04]">The Samskriti goal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] font-light">
                {goalRows.map((row, i) => (
                  <tr key={i} className={`hover:bg-white/[0.01] transition-colors ${row.highlight ? "bg-indigo/5" : ""}`}>
                    <td className={`p-5 font-medium ${row.highlight ? "text-white" : "text-white/80"}`}>{row.feature}</td>

                    {/* ChatGPT */}
                    <td className="p-5 text-center">
                      {row.chatgpt ? (
                        <Check className="w-6 h-6 text-emerald-400/80 mx-auto" strokeWidth={2.5} />
                      ) : (
                        <X className="w-6 h-6 text-rose-400/80 mx-auto" strokeWidth={2.5} />
                      )}
                    </td>

                    {/* Samskriti — the goal */}
                    <td className="p-5 text-center bg-indigo/5 border-x border-white/[0.04]">
                      <span className="inline-flex items-center gap-1.5 text-indigo-300 text-sm font-mono font-semibold bg-indigo-950/40 px-3 py-1 rounded-full border border-indigo-900/40 mx-auto">
                        The goal
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
