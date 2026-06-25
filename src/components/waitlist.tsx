"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useState, FormEvent } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";

const roadmapLevels = [
  { level: "Level 1", title: "Persistent Memory", desc: "Cross-session context caching and baseline state initialization." },
  { level: "Level 2", title: "Behavioral Continuity", desc: "Dynamic prompt assembly that preserves operational boundaries." },
  { level: "Level 3", title: "Decision Runtime", desc: "Out-of-model state checking before executing agent decisions." },
  { level: "Level 4", title: "Procedural Memory", desc: "Abstracting task execution history to skip redundant loops." },
  { level: "Level 5", title: "Behavior Contracts", desc: "Deterministic schema validation and boundary enforcement." },
  { level: "Level 6", title: "Runtime Governance", desc: "Hard safety gates and operational policy verification." },
  { level: "Level 7", title: "Multi-Agent State", desc: "Shared behavioral state ledger for agent-to-agent collaboration." },
  { level: "Level 8", title: "Behavior Versioning", desc: "Git-like branches, commits, and rollbacks for agent logic." },
  { level: "Level 9", title: "Distributed Runtime", desc: "Consensus-based behavioral execution across nodes." },
  { level: "Level 10", title: "Enterprise Governance", desc: "Enterprise auditing, RBAC state control, and compliance logs." },
];

export function Waitlist() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const shouldReduceMotion = useReducedMotion();

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="waitlist" className="relative overflow-hidden" ref={ref}>
      <div className="section-divider" />

      {/* Dramatic orbs */}
      <div className="orb orb-indigo w-[700px] h-[700px] top-[-200px] left-[10%] opacity-15" />
      <div className="orb orb-teal w-[500px] h-[500px] bottom-[-200px] right-[5%] opacity-12" />

      <div className="section-container max-w-5xl mx-auto">
        
        {/* Roadmap Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 1, ease: [0.2, 0, 0, 1] }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <p className="text-overline mb-6 font-mono tracking-[0.25em] text-white/35">Roadmap</p>
            <h2 className="heading-section">
              The Growth <span className="text-gradient">Milestones</span>
            </h2>
            <p className="text-body-lg max-w-2xl mx-auto mt-4">
              Building the infrastructure for continuous agent growth, from basic persistent context to multi-agent distributed runtimes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {roadmapLevels.map((item, i) => (
              <div 
                key={i} 
                className="glass-card p-6 border border-white/[0.03] flex items-start gap-5 hover:border-white/10 transition-all duration-300"
              >
                <span className="text-xs font-mono font-bold tracking-wider text-indigo-400 bg-indigo-950/40 border border-indigo-900/40 px-2.5 py-1 rounded">
                  {item.level}
                </span>
                <div>
                  <h4 className="font-semibold text-white/90 text-base mb-1">{item.title}</h4>
                  <p className="text-[14px] text-white/60 leading-relaxed font-light">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Section Divider */}
        <div className="section-divider mb-32" />

        {/* Waitlist Form Section */}
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={
              shouldReduceMotion ? { duration: 0 } : { duration: 1, ease: [0.2, 0, 0, 1] }
            }
          >
            <p className="text-overline mb-6">Early access</p>
            <h2 className="heading-section mb-8">
              Start using <span className="text-gradient">Samskriti.</span>
            </h2>
            <p className="text-body-lg mb-16 max-w-xl mx-auto">
              Join the early access list. We&apos;ll email you the moment the local app is ready to download — free to start, no card needed.
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.9, delay: 0.2, ease: [0.2, 0, 0, 1] }
            }
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-28"
          >
            <input
              type="email"
              id="waitlist-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              required
              disabled={status === "success"}
              className="flex-1 px-6 py-4 rounded-full bg-white/[0.03] border border-white/[0.06] text-white placeholder-white/15 text-[15px] font-light focus:outline-none focus:border-indigo/40 focus:ring-2 focus:ring-indigo/10 transition-all duration-300 disabled:opacity-40 min-h-[56px]"
              aria-label="Email address for waitlist"
            />

            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="btn-primary min-w-[180px] disabled:opacity-40"
            >
              {status === "loading" && <Loader2 className="w-4 h-4 animate-spin" />}
              {status === "success" && <Check className="w-4 h-4" />}
              {status === "idle" && <ArrowRight className="w-4 h-4" />}
              {status === "error" && <ArrowRight className="w-4 h-4" />}
              <span>{status === "success" ? "You're in" : "Get early access"}</span>
            </button>
          </motion.form>

          {status === "error" && (
            <p className="text-red-400/60 text-sm font-light -mt-24 mb-24">
              Something went wrong. Try again?
            </p>
          )}

          {/* Punchline / Footer statement */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={
              shouldReduceMotion ? { duration: 0 } : { duration: 1.5, delay: 0.5 }
            }
            className="border-t border-white/[0.03] pt-16"
          >
            <p className="font-display text-2xl sm:text-3xl font-light text-white/40 italic leading-relaxed">
              &ldquo;Separating reasoning from state.
              <br />
              Git for AI{" "}
              <span className="text-gradient not-italic font-medium">
                agent behaviors.
              </span>
              &rdquo;
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
