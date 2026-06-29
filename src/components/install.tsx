"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { Copy, Check, Terminal, ArrowRight } from "lucide-react";

/* ── Copyable code block ─────────────────────────────────────────────── */
function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — no-op */
    }
  };

  return (
    <div className="relative group">
      <pre className="overflow-x-auto rounded-xl bg-black/40 border border-white/[0.06] p-5 pr-14 text-[13px] sm:text-[14px] font-mono text-white/85 leading-relaxed">
        <code>{code}</code>
      </pre>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy to clipboard"}
        className="absolute top-3 right-3 p-2.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-white/50 hover:text-white hover:border-white/20 transition-all duration-300 min-h-[40px] min-w-[40px] flex items-center justify-center"
      >
        {copied ? (
          <Check className="w-4 h-4 text-teal" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}

/* ── Step wrapper ────────────────────────────────────────────────────── */
function Step({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-5">
      <span className="shrink-0 w-10 h-10 rounded-full bg-indigo-950/50 border border-indigo/40 text-indigo-300 font-mono font-bold text-sm flex items-center justify-center ring-2 ring-indigo/10">
        {n}
      </span>
      <div className="flex-1 min-w-0">
        <h3 className="text-[17px] font-semibold text-white/90 mb-4 pt-1.5">{title}</h3>
        {children}
      </div>
    </div>
  );
}

export function Install() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="install" className="relative overflow-hidden scroll-mt-24" ref={ref}>
      <div className="section-divider" />

      {/* Bright, prominent orbs — this is the primary action of the page */}
      <div className="orb orb-saffron w-[680px] h-[680px] top-[-200px] left-[-120px] opacity-30" />
      <div className="orb orb-indigo w-[620px] h-[620px] top-[10%] right-[-160px] opacity-30" />
      <div className="orb orb-teal w-[440px] h-[440px] bottom-[-160px] left-[30%] opacity-20" />

      <div className="section-container max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 1, ease: [0.2, 0, 0, 1] }}
          className="text-center mb-16"
        >
          <p className="text-overline mb-6 inline-flex items-center gap-2 justify-center">
            <Terminal className="w-3.5 h-3.5" /> Install in two minutes
          </p>
          <h2 className="heading-section mb-6">
            How to <span className="text-gradient">Install.</span>
          </h2>
          <p className="text-body-lg max-w-xl mx-auto">
            Install it, run one command, restart your tool. That&apos;s it — no config files to
            mess with, and nothing leaves your machine.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={
            shouldReduceMotion ? { duration: 0 } : { duration: 0.9, delay: 0.2, ease: [0.2, 0, 0, 1] }
          }
          className="glass-card gradient-border p-8 sm:p-12 border border-white/[0.05] space-y-12"
        >
          {/* Step 1 */}
          <Step n={1} title="Install with pipx">
            <CodeBlock code="pipx install git+https://github.com/Escalate17/samskriti-project" />
            <p className="text-[14px] text-white/45 font-light mt-3 leading-relaxed">
              Don&apos;t have pipx? Run{" "}
              <code className="font-mono text-[13px] text-white/70 bg-white/[0.05] border border-white/[0.06] rounded px-1.5 py-0.5">
                python3 -m pip install --user pipx &amp;&amp; python3 -m pipx ensurepath
              </code>
              , then restart your terminal.
            </p>
          </Step>

          {/* Step 2 */}
          <Step n={2} title="Connect it — one command">
            <CodeBlock code="samskriti-project setup" />
            <p className="text-[14px] text-white/45 font-light mt-3 leading-relaxed">
              This writes the MCP config for you (and backs up any existing config). Use{" "}
              <code className="font-mono text-[13px] text-white/70 bg-white/[0.05] border border-white/[0.06] rounded px-1.5 py-0.5">
                --cursor
              </code>
              ,{" "}
              <code className="font-mono text-[13px] text-white/70 bg-white/[0.05] border border-white/[0.06] rounded px-1.5 py-0.5">
                --codex
              </code>
              , or{" "}
              <code className="font-mono text-[13px] text-white/70 bg-white/[0.05] border border-white/[0.06] rounded px-1.5 py-0.5">
                --all
              </code>{" "}
              for other tools.{" "}
              <a
                href="https://github.com/Escalate17/samskriti-project#connect"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white underline underline-offset-2 transition-colors"
              >
                Prefer to edit config by hand?
              </a>
            </p>
          </Step>

          {/* Step 3 */}
          <Step n={3} title="Restart your AI tool">
            <div className="rounded-xl bg-saffron/[0.06] border border-saffron/20 p-5">
              <p className="text-[15px] text-white/75 font-light leading-relaxed">
                Fully <span className="text-white font-medium">quit and reopen</span> Claude Code,
                Cursor, or Codex. A running session won&apos;t pick up the server — MCP servers
                load only when the tool starts.
              </p>
            </div>
          </Step>

          {/* Step 4 */}
          <Step n={4} title="Verify the connection">
            <p className="text-[15px] text-white/60 font-light leading-relaxed">
              In Claude Code, type{" "}
              <code className="font-mono text-[13px] text-white/80 bg-white/[0.05] border border-white/[0.06] rounded px-1.5 py-0.5">
                /mcp
              </code>{" "}
              — you should see{" "}
              <span className="text-white/85 font-normal">samskriti-project</span> listed with
              its <span className="text-teal">8 tools</span>.
            </p>
          </Step>
        </motion.div>

        {/* Helper commands */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={
            shouldReduceMotion ? { duration: 0 } : { duration: 0.9, delay: 0.3, ease: [0.2, 0, 0, 1] }
          }
          className="glass-card p-8 sm:p-10 border border-white/[0.05] mt-10"
        >
          <p className="text-overline mb-4">Helper commands</p>
          <p className="text-[15px] text-white/55 font-light mb-7 leading-relaxed">
            Three shortcuts for the most common actions. Trigger them with{" "}
            <code className="font-mono text-[13px] text-white/80 bg-white/[0.05] border border-white/[0.06] rounded px-1.5 py-0.5">
              /sam
            </code>{" "}
            plus plain English — there is no standalone{" "}
            <code className="font-mono text-[13px] text-white/60 bg-white/[0.04] border border-white/[0.06] rounded px-1.5 py-0.5">
              /catchup
            </code>{" "}
            command.
          </p>

          <ul className="space-y-3 mb-8">
            {[
              { name: "catchup", desc: "“catch me up” — recap of the latest entries plus how many tasks are open." },
              { name: "open", desc: "“what's open” — lists the active tasks." },
              { name: "log", desc: "quick-log a decision (title auto-derived from the text)." },
            ].map((t) => (
              <li key={t.name} className="flex items-start gap-3 text-[15px] text-white/65 font-light">
                <span className="shrink-0 text-xs font-mono font-bold tracking-wider text-indigo-300 bg-indigo-950/40 border border-indigo-900/40 px-2 py-0.5 rounded mt-0.5">
                  {t.name}
                </span>
                <span>{t.desc}</span>
              </li>
            ))}
          </ul>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="text-[13px] font-mono text-white/40 mb-2">Claude Code / Cursor</p>
              <pre className="overflow-x-auto rounded-xl bg-black/40 border border-white/[0.06] p-4 text-[13px] font-mono text-white/85 leading-relaxed">
                <code>{`/sam catch me up
/sam what's open
/sam log dropping the Redis cache`}</code>
              </pre>
            </div>
            <div>
              <p className="text-[13px] font-mono text-white/40 mb-2">Any tool (plain English)</p>
              <pre className="overflow-x-auto rounded-xl bg-black/40 border border-white/[0.06] p-4 text-[13px] font-mono text-white/85 leading-relaxed">
                <code>{`use samskriti-project
  to catch me up`}</code>
              </pre>
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, delay: 0.4 }}
          className="text-center mt-10"
        >
          <a
            href="https://github.com/Escalate17/samskriti-project"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[15px] font-light text-white/55 hover:text-white transition-colors duration-300"
          >
            Full documentation on GitHub
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.p>
      </div>
    </section>
  );
}
