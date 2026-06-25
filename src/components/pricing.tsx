"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Check, X } from "lucide-react";

const comparisonData = [
  {
    feature: "Remembers facts you tell it",
    chatgpt: true,
    samskriti: true,
    highlight: false,
  },
  {
    feature: "Grows a personality over time",
    chatgpt: false,
    samskriti: true,
    highlight: true,
  },
  {
    feature: "Picks the relationship back up where you left off",
    chatgpt: false,
    samskriti: true,
    highlight: true,
  },
  {
    feature: "Keeps its personality after a model upgrade",
    chatgpt: false,
    samskriti: true,
    highlight: false,
  },
  {
    feature: "Sticks to the rules you set, reliably",
    chatgpt: false,
    samskriti: true,
    highlight: false,
  },
  {
    feature: "Snapshot and roll back its state anytime",
    chatgpt: false,
    samskriti: true,
    highlight: false,
  },
  {
    feature: "Runs entirely on your own machine",
    chatgpt: false,
    samskriti: true,
    highlight: false,
  },
];

export function Pricing() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="compare" className="relative overflow-hidden" ref={ref}>
      <div className="section-divider" />
      <div className="orb orb-saffron w-[500px] h-[500px] bottom-[-200px] right-[-150px] opacity-15" />

      <div className="section-container max-w-5xl mx-auto">
        
        {/* Comparison Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 1, ease: [0.2, 0, 0, 1] }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <p className="text-overline mb-6 font-mono tracking-[0.25em] text-white/35">Compare</p>
            <h2 className="heading-section">
              Why Not <span className="text-gradient">Standard Memory?</span>
            </h2>
            <p className="text-body-lg max-w-2xl mx-auto mt-4">
              Traditional model memories recall simple text facts. Samskriti enables AI to build continuous behavior through experience.
            </p>
          </div>

          <div className="glass-card overflow-x-auto border border-white/[0.04] rounded-2xl">
            <table className="w-full min-w-[600px] border-collapse text-left text-[15px]">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.01]">
                  <th className="p-5 font-semibold text-white/65 text-[14px] uppercase tracking-wider">How they differ</th>
                  <th className="p-5 font-semibold text-white/65 text-[14px] uppercase tracking-wider text-center">ChatGPT / Claude Memory</th>
                  <th className="p-5 font-semibold text-white text-[13px] uppercase tracking-wider text-center bg-indigo/5 border-x border-white/[0.04]">Samskriti Runtime</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] font-light">
                {comparisonData.map((row, i) => (
                  <tr key={i} className={`hover:bg-white/[0.01] transition-colors ${row.highlight ? "bg-indigo/5" : ""}`}>
                    <td className={`p-5 font-medium ${row.highlight ? "text-white" : "text-white/80"}`}>{row.feature}</td>
                    
                    {/* ChatGPT */}
                    <td className="p-5 text-center">
                      {row.chatgpt ? (
                        <Check className="w-4 h-4 text-white/30 mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-white/10 mx-auto" />
                      )}
                    </td>
 
                    {/* Samskriti */}
                    <td className="p-5 text-center bg-indigo/5 border-x border-white/[0.04]">
                      {row.samskriti ? (
                        <span className="inline-flex items-center gap-1.5 text-teal text-sm font-mono font-semibold bg-teal/10 px-3 py-1 rounded-full border border-teal/20 mx-auto">
                          <Check className="w-3 h-3 text-teal" /> Supported
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-white/20 text-sm font-mono px-3 py-1 rounded-full border border-white/5 mx-auto">
                          <X className="w-3 h-3 text-white/10" /> Excluded
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Pricing Cards Section */}
        <div className="section-divider mb-32" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 1, ease: [0.2, 0, 0, 1] }}
          className="text-center mb-20"
        >
          <p className="text-overline mb-6 font-mono tracking-[0.25em] text-white/35">Pricing</p>
          <h2 className="heading-section">
            Simple. <span className="text-gradient">Developer-First.</span>
          </h2>
          <p className="text-body-lg max-w-2xl mx-auto mt-4">
            Free local-first development runtime. Scale behavior security rules seamlessly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-3xl mx-auto">
          {/* Sandbox / Early access */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.9, delay: 0.15, ease: [0.2, 0, 0, 1] }
            }
            className="glass-card gradient-border p-10 flex flex-col border border-white/[0.04]"
          >
            <p className="text-overline text-teal/60 mb-8">Developer Preview</p>
            <div className="mb-2">
              <span className="text-6xl font-display font-medium text-white">
                Free
              </span>
            </div>
            <p className="text-[15px] text-white/20 font-light mb-10">
              During early access preview
            </p>

            <ul className="space-y-4 text-[16px] text-white/65 font-light mb-10 flex-1">
              <li className="flex items-start gap-3">
                <span className="text-teal/50 mt-0.5 text-xs">✓</span>
                Full state enforcement engine
              </li>
              <li className="flex items-start gap-3">
                <span className="text-teal/50 mt-0.5 text-xs">✓</span>
                Unlimited local-first runtime instances
              </li>
              <li className="flex items-start gap-3">
                <span className="text-teal/50 mt-0.5 text-xs">✓</span>
                Up to 3 active agent sessions
              </li>
              <li className="flex items-start gap-3">
                <span className="text-teal/50 mt-0.5 text-xs">✓</span>
                Community support & SDK preview
              </li>
            </ul>

            <a href="#waitlist" className="btn-primary w-full text-center justify-center">
              <span>Join Developer Preview</span>
            </a>
          </motion.div>

          {/* Pro / Production */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.9, delay: 0.3, ease: [0.2, 0, 0, 1] }
            }
            className="glass-card p-10 flex flex-col border border-white/[0.04]"
          >
            <p className="text-overline mb-8">Production Tier</p>
            <div className="mb-2">
              <span className="text-6xl font-display font-medium text-white/70">
                $29
              </span>
              <span className="text-white/20 text-lg font-light ml-1">/mo</span>
            </div>
            <p className="text-[15px] text-white/20 font-light mb-10">
              Coming Q4
            </p>

            <ul className="space-y-4 text-[16px] text-white/55 font-light mb-10 flex-1">
              <li className="flex items-start gap-3">
                <span className="text-white/25 mt-0.5 text-xs">✓</span>
                Unlimited sessions & runtime scaling
              </li>
              <li className="flex items-start gap-3">
                <span className="text-white/25 mt-0.5 text-xs">✓</span>
                Auditable behavior version history
              </li>
              <li className="flex items-start gap-3">
                <span className="text-white/25 mt-0.5 text-xs">✓</span>
                State drift auto-rollback triggers
              </li>
              <li className="flex items-start gap-3">
                <span className="text-white/25 mt-0.5 text-xs">✓</span>
                Enterprise SLA and governance layer
              </li>
            </ul>

            <button
              className="btn-magnetic w-full opacity-40 cursor-default"
              disabled
              aria-label="Coming soon"
            >
              <span>Coming soon</span>
            </button>
            <p className="text-[13px] text-white/20 font-light mt-4 text-center leading-relaxed">
              Local-first deployment. Keep total control over your behavior database.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
