"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";

function WordReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(" ");

  return (
    <>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", rotateX: -40 }}
            animate={{ y: 0, rotateX: 0 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : {
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    delay: delay + i * 0.08,
                  }
            }
          >
            {word}
          </motion.span>
        </span>
      ))}
    </>
  );
}

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.8], [0, 100]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[100vh] py-24 sm:py-32 lg:py-40 flex items-center justify-center overflow-hidden"
    >
      {/* Ambient gradient orbs — large and dramatic */}
      <div className="orb orb-saffron w-[800px] h-[800px] -top-[300px] -left-[300px] animate-[float_12s_ease-in-out_infinite] opacity-70" />
      <div className="orb orb-indigo w-[700px] h-[700px] top-[15%] right-[-200px] animate-[float_12s_ease-in-out_4s_infinite] opacity-60" />
      <div className="orb orb-teal w-[500px] h-[500px] bottom-[-150px] left-[25%] animate-[pulse-soft_8s_ease-in-out_infinite] opacity-40" />

      {/* Subtle radial light from center */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(124, 92, 255, 0.15) 0%, transparent 60%)",
        }}
      />

      <motion.div
        style={shouldReduceMotion ? {} : { opacity, scale, y }}
        className="relative z-10 section-container text-center max-w-5xl mx-auto"
      >
        {/* Overline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={
            shouldReduceMotion ? { duration: 0 } : { duration: 1, delay: 0.2 }
          }
          className="text-overline mb-12"
        >
          Memory that grows with you
        </motion.p>

        {/* Main headline — cinematic serif with word-by-word reveal */}
        <h1 className="heading-hero mb-8">
          <WordReveal text="Your AI" delay={0.4} />
          <br />
          <WordReveal text="shouldn't forget" delay={0.8} />
          <br />
          <span className="text-gradient">
            <WordReveal text="who it becomes." delay={1.2} />
          </span>
        </h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 0.8, delay: 1.8, ease: "easeOut" }
          }
          className="text-body-lg max-w-3xl mx-auto mb-14"
        >
          Samskriti helps AI systems grow through experience, so every conversation builds on the last. A local-first behavioral runtime.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 0.8, delay: 2.2, ease: "easeOut" }
          }
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <a href="#waitlist" className="btn-primary">
            <span>Get Started</span>
          </a>
          <a href="#story" className="btn-magnetic">
            <span>See How It Works</span>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={
          shouldReduceMotion ? { duration: 0 } : { duration: 1, delay: 3 }
        }
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <span className="text-overline text-[10px]">Scroll</span>
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-white/20" />
        </motion.div>
      </motion.div>
    </section>
  );
}
