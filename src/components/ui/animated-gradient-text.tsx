"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedGradientTextProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedGradientText({
  children,
  className,
}: AnimatedGradientTextProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.span
      className={cn(
        "inline-block bg-gradient-to-r from-saffron via-indigo to-teal bg-[length:200%_auto] bg-clip-text text-transparent",
        className
      )}
      animate={
        shouldReduceMotion
          ? {}
          : {
              backgroundPosition: ["0% center", "100% center", "0% center"],
            }
      }
      transition={{
        duration: 6,
        ease: "linear",
        repeat: Infinity,
      }}
    >
      {children}
    </motion.span>
  );
}
