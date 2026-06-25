"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import Image from "next/image";

const shots = [
  {
    src: "/demo/demo-record.png",
    tool: "Claude Code",
    caption: "Records a decision into the shared project memory.",
    alt: "Claude Code recording a project decision through Samskriti",
  },
  {
    src: "/demo/demo-readback.png",
    tool: "Gemini",
    caption: "Reads the same decision back — attributed to claude-code.",
    alt: "Gemini reading back a decision recorded by claude-code via Samskriti",
  },
];

export function Demo() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="demo" className="relative overflow-hidden scroll-mt-24" ref={ref}>
      <div className="section-divider" />
      <div className="orb orb-teal w-[560px] h-[560px] top-[5%] left-[-180px] opacity-15" />
      <div className="orb orb-indigo w-[520px] h-[520px] bottom-[-160px] right-[-140px] opacity-15" />

      <div className="section-container max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 1, ease: [0.2, 0, 0, 1] }}
          className="text-center mb-16"
        >
          <p className="text-overline mb-6 font-mono tracking-[0.25em] text-white/35">See it work</p>
          <h2 className="heading-section">
            One decision, <span className="text-gradient">two tools.</span>
          </h2>
          <p className="text-body-lg max-w-2xl mx-auto mt-4">
            Record something in one AI tool, read it back in another — no copy-paste, no
            re-explaining. Here is the handoff happening for real.
          </p>
        </motion.div>

        <div className="flex flex-col items-center gap-8">
          {shots.map((shot, i) => (
            <div key={shot.src} className="w-full">
              <motion.figure
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 0.9, delay: 0.15 + i * 0.2, ease: [0.2, 0, 0, 1] }
                }
                className="glass-card p-3 sm:p-4 border border-white/[0.05] rounded-2xl"
              >
                <figcaption className="flex items-center gap-3 px-2 pb-3">
                  <span className="text-xs font-mono font-bold tracking-wider text-indigo-300 bg-indigo-950/40 border border-indigo-900/40 px-2.5 py-1 rounded">
                    {i + 1}
                  </span>
                  <span className="text-[14px] text-white/85 font-medium">{shot.tool}</span>
                  <span className="text-[14px] text-white/45 font-light">— {shot.caption}</span>
                </figcaption>
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={2880}
                  height={1800}
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="w-full h-auto rounded-xl border border-white/[0.06]"
                  priority={i === 0}
                />
              </motion.figure>

              {/* Handoff connector between the two shots */}
              {i === 0 && (
                <div className="flex flex-col items-center gap-1.5 py-6 text-white/40">
                  <span className="text-overline text-[10px]">Same shared memory</span>
                  <ArrowDown className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
