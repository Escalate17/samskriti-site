"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const features = [
  "Local MCP server — runs entirely on your machine",
  "One shared project memory across every AI tool",
  "5 tools: record, read, list, search, update",
  "Unlimited projects and entries",
  "MIT licensed — open-source, no account, no cloud",
];

export function Pricing() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="pricing" className="relative overflow-hidden scroll-mt-24" ref={ref}>
      <div className="section-divider" />
      <div className="orb orb-saffron w-[500px] h-[500px] bottom-[-200px] right-[-150px] opacity-15" />

      <div className="section-container max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 1, ease: [0.2, 0, 0, 1] }}
          className="text-center mb-20"
        >
          <p className="text-overline mb-6 font-mono tracking-[0.25em] text-white/35">Pricing</p>
          <h2 className="heading-section">
            Free and <span className="text-gradient">open-source.</span>
          </h2>
          <p className="text-body-lg max-w-2xl mx-auto mt-4">
            The local runtime is free, MIT licensed, and yours to run. No account, no cloud.
          </p>
        </motion.div>

        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={
              shouldReduceMotion ? { duration: 0 } : { duration: 0.9, delay: 0.15, ease: [0.2, 0, 0, 1] }
            }
            className="glass-card gradient-border p-10 flex flex-col border border-white/[0.04]"
          >
            <p className="text-overline text-teal/60 mb-8">Local · Open-source</p>
            <div className="mb-2">
              <span className="text-6xl font-display font-medium text-white">Free</span>
            </div>
            <p className="text-[15px] text-white/20 font-light mb-10">
              Live now — MIT licensed, runs on your machine
            </p>

            <ul className="space-y-4 text-[16px] text-white/65 font-light mb-10 flex-1">
              {features.map((f, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-teal/50 mt-0.5 text-xs">✓</span>
                  {f}
                </li>
              ))}
            </ul>

            <a
              href="https://github.com/Escalate17/samskriti-project"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full text-center justify-center"
            >
              <span>Get Started Free</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
