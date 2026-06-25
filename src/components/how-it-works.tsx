"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Terminal, Code, Cpu, ArrowRight, User, ShieldAlert, GitCommit, HeartHandshake, Sparkles, MessageSquare, History } from "lucide-react";

const steps = [
  {
    icon: Terminal,
    num: "01",
    title: "Initialize the SDK",
    description: "Install the package and load the external runtime alongside your agent loop. Initializes in one line of code.",
    code: `import { SamskritiRuntime } from "@samskriti/sdk";

const runtime = new SamskritiRuntime({
  agentId: "customer_support_agent_1",
  storage: "local-encrypted",
  versioning: true
});`,
  },
  {
    icon: Code,
    num: "02",
    title: "Define State Schema",
    description: "Establish deterministic bounds, safety gates, and state variables that represent your agent's behavioral contract.",
    code: `const schema = runtime.registerSchema({
  behaviorRules: {
    maxResponseLength: 150,
    toneConstraints: ["concise", "technical"],
    forbiddenKeywords: ["guarantee", "always"]
  },
  allowDriftCorrection: true
});`,
  },
  {
    icon: Cpu,
    num: "03",
    title: "Execute & Enforce State",
    description: "Let the LLM handle reasoning. Samskriti manages the behavioral state, committing updates and correcting prompt drift dynamically.",
    code: `// Retrieve persistent state
const state = await runtime.getState();

// LLM Reasons based on current state
const decision = await llm.reason(userInput, state);

// Enforce limits and commit state
const result = await runtime.commit(decision);
console.log(result.state.behaviorScore); // 0.98`,
  },
];

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const shouldReduceMotion = useReducedMotion();

  // Loop nodes for the narrative story
  const loopNodes = [
    { label: "Conversation", sub: "Session begins", icon: MessageSquare },
    { label: "Experience", sub: "Context analyzed", icon: Sparkles },
    { label: "Samskriti", sub: "Behavior updated", icon: GitCommit, highlight: true },
    { label: "Growth", sub: "State persisted", icon: History },
    { label: "Next Chat", sub: "Resumes with memory", icon: HeartHandshake },
  ];

  return (
    <section id="vision" className="relative overflow-hidden scroll-mt-24" ref={ref}>
      <div className="section-divider" />
      <div className="orb orb-teal w-[500px] h-[500px] top-[10%] right-[-200px] opacity-20" />

      <div className="section-container max-w-5xl mx-auto">

        {/* Where this is going — the long-term vision */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 1, ease: [0.2, 0, 0, 1] }}
          className="text-center mb-20"
        >
          <p className="text-overline mb-6 font-mono tracking-[0.25em] text-white/35">Where this is going</p>
          <h2 className="heading-section">
            A shared memory layer
            <br />
            <span className="text-gradient">is just step one.</span>
          </h2>
          <p className="text-body-lg max-w-2xl mx-auto mt-6">
            A shared memory layer is step one. The goal is an AI that carries your context,
            your style, and your history across every tool you use — one continuous companion,
            not a dozen strangers.
          </p>
        </motion.div>

        {/* Animated Story Loop Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 1, delay: 0.2, ease: [0.2, 0, 0, 1] }}
          className="glass-card p-10 border border-white/[0.04] rounded-2xl mb-32"
        >
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4 items-center relative">
            {loopNodes.map((node, i) => {
              const Icon = node.icon;
              return (
                <div key={i} className="flex flex-col items-center text-center relative z-10">
                  {/* Node box */}
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-500 ${
                    node.highlight 
                      ? "bg-gradient-to-br from-saffron/20 to-indigo/20 border border-indigo/40 shadow-[0_0_20px_rgba(124,92,255,0.2)]" 
                      : "bg-white/[0.03] border border-white/[0.06] hover:border-white/20"
                  }`}>
                    <Icon className={`w-6 h-6 ${node.highlight ? "text-indigo-400" : "text-white/45"}`} />
                  </div>
                  <h4 className={`text-[17px] font-semibold ${node.highlight ? "text-white" : "text-white/80"}`}>{node.label}</h4>
                  <p className="text-[15px] text-white/55 mt-1 max-w-[120px]">{node.sub}</p>

                  {/* Connecting Arrow for desktop */}
                  {i < loopNodes.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[75%] translate-x-1/2 text-white/10">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Section Divider */}
        <div className="section-divider mb-32" />

        {/* Section 5: Developer Architecture */}
        <div id="architecture" className="scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 1, ease: [0.2, 0, 0, 1] }}
            className="text-center mb-20"
          >
            <p className="text-overline mb-6 font-mono tracking-[0.25em] text-white/35">Architecture</p>
            <h2 className="heading-section">
              An External <span className="text-gradient">Behavioral Layer</span>
            </h2>
            <p className="text-body-lg max-w-2xl mx-auto mt-4">
              Samskriti runs outside the model. The LLM handles the reasoning, while the Samskriti runtime governs and persists behavioral state.
            </p>
          </motion.div>

          {/* Architecture flow diagram */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 1, delay: 0.2, ease: [0.2, 0, 0, 1] }}
            className="glass-card p-10 border border-white/[0.04] rounded-2xl mb-24"
          >
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
              {/* User */}
              <div className="glass-card bg-white/[0.01] p-6 text-center border border-white/[0.04] rounded-2xl">
                <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mx-auto mb-4">
                  <User className="w-5 h-5 text-white/40" />
                </div>
                <h4 className="font-medium text-[17px] text-white/80">User Input</h4>
                <p className="text-[15px] text-white/55 mt-1">Prompt / Event</p>
              </div>

              {/* Arrow */}
              <div className="flex justify-center rotate-90 md:rotate-0 text-white/10">
                <ArrowRight className="w-6 h-6" />
              </div>

              {/* LLM */}
              <div className="glass-card bg-white/[0.01] p-6 text-center border border-white/[0.04] rounded-2xl">
                <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mx-auto mb-4">
                  <Cpu className="w-5 h-5 text-white/40" />
                </div>
                <h4 className="font-medium text-[17px] text-white/80">LLM</h4>
                <p className="text-[15px] text-white/55 mt-1">Reasoning (Stateless)</p>
              </div>

              {/* Arrow */}
              <div className="flex justify-center rotate-90 md:rotate-0 text-white/10">
                <ArrowRight className="w-6 h-6 animate-pulse" />
              </div>

              {/* Samskriti */}
              <div className="glass-card gradient-border p-6 text-center rounded-2xl relative shadow-[0_0_30px_rgba(124,92,255,0.1)]">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-saffron/20 to-indigo/20 border border-indigo/30 flex items-center justify-center mx-auto mb-4">
                  <GitCommit className="w-5 h-5 text-indigo-400" />
                </div>
                <h4 className="font-medium text-[17px] text-white">Samskriti Runtime</h4>
                <p className="text-[13px] text-indigo-300 mt-1 font-mono">Behavioral State</p>
              </div>
            </div>
          </motion.div>

          {/* Section Divider */}
          <div className="section-divider mb-24" />

          {/* SDK Steps */}
          <div className="text-center mb-16">
            <p className="text-overline mb-6 font-mono tracking-[0.25em] text-white/35">Implementation</p>
            <h3 className="heading-section !text-3xl sm:!text-4xl">
              Developer SDK Integration
            </h3>
          </div>

          <div className="space-y-10">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : { duration: 0.9, delay: i * 0.15, ease: [0.2, 0, 0, 1] }
                  }
                  className="glass-card gradient-border p-0 overflow-hidden"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Left — text */}
                    <div className="p-10 lg:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-5 mb-6">
                        <span className="text-[56px] font-display font-light text-white/[0.06] leading-none">
                          {step.num}
                        </span>
                        <div className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                          <Icon className="w-4 h-4 text-white/30" />
                        </div>
                      </div>
                      <h3 className="font-display text-2xl sm:text-3xl font-medium mb-4 text-white/90">
                        {step.title}
                      </h3>
                      <p className="text-body-lg !text-white/65">
                        {step.description}
                      </p>
                    </div>

                    {/* Right — code */}
                    <div className="border-t lg:border-t-0 lg:border-l border-white/[0.04] bg-white/[0.01] p-8 lg:p-10 flex flex-col justify-center">
                      <pre className="code-block !bg-transparent !border-0 !p-0 text-[15px] leading-[1.9]">
                        <code>{step.code}</code>
                      </pre>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
