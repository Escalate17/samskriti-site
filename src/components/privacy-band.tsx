"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Shield, HardDrive, FileJson } from "lucide-react";

const stats = [
  { value: "0", label: "chat messages logged", icon: Shield },
  { value: "100%", label: "local-first runtime", icon: HardDrive },
  { value: "JSON", label: "portable state schemas", icon: FileJson },
];

export function PrivacyBand() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="privacy" className="relative overflow-hidden" ref={ref}>
      <div className="section-divider" />

      <div className="section-container max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={
            shouldReduceMotion ? { duration: 0 } : { duration: 1, ease: [0.2, 0, 0, 1] }
          }
        >
          <p className="text-overline mb-6">Deterministic & Auditable</p>
          <h2 className="heading-section mb-8">
            Distilled state.
            <br />
            <span className="text-gradient">Zero conversation logs.</span>
          </h2>
          <p className="text-body-lg max-w-2xl mx-auto mb-20">
            Samskriti does not store, upload, or process raw chat logs. Instead, it extracts abstract behavioral rules and maintains them in local-first JSON state contracts. This ensures compliance, auditability, and complete model portability.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 0.9, delay: 0.2 + i * 0.12, ease: [0.2, 0, 0, 1] }
                }
                className="glass-card p-10 flex flex-col items-center border border-white/[0.04] rounded-2xl"
              >
                <Icon className="w-5 h-5 text-white/10 mb-6" />
                <span className="text-5xl sm:text-6xl font-display font-medium text-gradient mb-3">
                  {stat.value}
                </span>
                <span className="text-[15px] text-white/60 font-light tracking-wide">
                  {stat.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
