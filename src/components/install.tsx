"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { Copy, Check, Terminal } from "lucide-react";

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

const MCP_TABS = [
  {
    key: "claude",
    label: "Claude Code",
    path: "~/.claude.json",
    code: `{
  "mcpServers": {
    "samskriti-project": {
      "command": "samskriti-project",
      "args": []
    }
  }
}`,
  },
  {
    key: "cursor",
    label: "Cursor",
    path: "~/.cursor/mcp.json",
    code: `{
  "mcpServers": {
    "samskriti-project": {
      "command": "samskriti-project",
      "args": []
    }
  }
}`,
  },
  {
    key: "codex",
    label: "Codex",
    path: "~/.codex/config.toml",
    code: `[mcp_servers.samskriti-project]
command = "samskriti-project"
args = []`,
  },
] as const;

export function Install() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const shouldReduceMotion = useReducedMotion();
  const [tab, setTab] = useState<(typeof MCP_TABS)[number]["key"]>("claude");

  const active = MCP_TABS.find((t) => t.key === tab)!;

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
            How to <span className="text-gradient">install.</span>
          </h2>
          <p className="text-body-lg max-w-xl mx-auto">
            One command to install, one config block to connect it to your AI tool.
            Runs entirely on your machine.
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
          <Step n={2} title="Verify the install">
            <CodeBlock code="samskriti-project --help" />
          </Step>

          {/* Step 3 */}
          <Step n={3} title="Connect it to your AI tool">
            <p className="text-[15px] text-white/55 font-light mb-5">
              Add this to your MCP config, then restart the tool.
            </p>

            {/* Tabs */}
            <div className="flex gap-2 mb-4" role="tablist" aria-label="AI tool config">
              {MCP_TABS.map((t) => {
                const selected = tab === t.key;
                return (
                  <button
                    key={t.key}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setTab(t.key)}
                    className={
                      "min-h-[44px] px-5 rounded-full text-[14px] font-light transition-all duration-300 border " +
                      (selected
                        ? "bg-indigo-950/50 border-indigo/50 text-white ring-2 ring-indigo/10"
                        : "bg-white/[0.03] border-white/[0.06] text-white/55 hover:border-white/15 hover:text-white/80")
                    }
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>

            <p className="text-[13px] font-mono text-white/40 mb-3">{active.path}</p>
            <CodeBlock code={active.code} />
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
              its <span className="text-teal">5 tools</span>.
            </p>
          </Step>
        </motion.div>
      </div>
    </section>
  );
}
