"use client";

import { useEffect, useRef, useCallback } from "react";
import { useReducedMotion } from "framer-motion";
import { NatureScene } from "./nature-scene";

/** Custom cursor — glow + dot */
function CinematicCursor() {
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (glowRef.current) {
      glowRef.current.style.left = `${e.clientX}px`;
      glowRef.current.style.top = `${e.clientY}px`;
    }
    if (dotRef.current) {
      dotRef.current.style.left = `${e.clientX}px`;
      dotRef.current.style.top = `${e.clientY}px`;
    }
  }, []);

  useEffect(() => {
    if (shouldReduceMotion) return;
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [shouldReduceMotion, handleMouseMove]);

  if (shouldReduceMotion) return null;

  return (
    <>
      <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}

/** Film grain + vignette overlays */
function CinematicOverlays() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      <div className="grain-overlay" aria-hidden="true" />
      {!shouldReduceMotion && <div className="vignette" aria-hidden="true" />}
    </>
  );
}

export function CinematicEffects() {
  return (
    <>
      <CinematicCursor />
      <NatureScene />
      <CinematicOverlays />
    </>
  );
}
