"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export function Navbar() {
  const shouldReduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={
        shouldReduceMotion ? { duration: 0 } : { duration: 1, delay: 2.5 }
      }
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled
          ? "bg-[#0a0a14]/80 backdrop-blur-2xl border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-[1200px] mx-auto flex items-center justify-between px-8 h-20">
        {/* Logo — minimal, elegant */}
        <a
          href="#"
          className="group flex items-center gap-3 cursor-pointer"
          aria-label="Samskriti home"
        >
          {/* Abstract logo mark */}
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-saffron/30 to-indigo/30 blur-sm group-hover:blur-md transition-all duration-500" />
            <div className="relative w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/20 transition-colors duration-300">
              <div className="w-2 h-2 rounded-full bg-gradient-to-br from-saffron to-teal" />
            </div>
          </div>
          <span className="font-display text-xl font-semibold text-white/85 group-hover:text-white transition-colors duration-300 tracking-wide">
            Samskriti
          </span>
        </a>

        {/* Links */}
        <div className="hidden md:flex items-center gap-9">
          <a
            href="#install"
            className="text-[13px] font-medium tracking-[0.12em] uppercase text-white/65 hover:text-white transition-colors duration-300"
          >
            Install
          </a>
          <a
            href="#compare"
            className="text-[13px] font-medium tracking-[0.12em] uppercase text-white/65 hover:text-white transition-colors duration-300"
          >
            Compare
          </a>
          <a
            href="#vision"
            className="text-[13px] font-medium tracking-[0.12em] uppercase text-white/65 hover:text-white transition-colors duration-300"
          >
            Where it's going
          </a>
        </div>

        {/* CTA */}
        <a
          href="#install"
          className="text-[13px] font-semibold tracking-[0.12em] uppercase text-white/90 hover:text-white transition-colors duration-300 border border-white/20 hover:border-white/40 rounded-full px-6 py-3 min-h-[44px] flex items-center cursor-pointer"
        >
          Get started free
        </a>
      </nav>
    </motion.header>
  );
}
