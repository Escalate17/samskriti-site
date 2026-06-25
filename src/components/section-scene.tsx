"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Distinct animated background scene per section. Transform/opacity only (cheap),
 * reduced-motion aware. Sits behind a section's content (absolute, -z, pointer-none).
 * Drop <SectionScene variant="..." /> as the first child of a `relative` section.
 */
type Variant = "hero" | "meme" | "how" | "privacy" | "pricing" | "waitlist";

const ORBS: Record<Variant, { cls: string; style: React.CSSProperties; drift: [number, number] }[]> = {
  hero: [
    { cls: "orb orb-indigo", style: { width: 720, height: 720, top: "-15%", left: "50%", marginLeft: -360, opacity: 0.35 }, drift: [40, 30] },
    { cls: "orb orb-saffron", style: { width: 520, height: 520, top: "10%", right: "-160px", opacity: 0.22 }, drift: [-30, 40] },
  ],
  meme: [
    { cls: "orb orb-indigo", style: { width: 600, height: 600, top: "18%", left: "-250px", opacity: 0.28 }, drift: [50, 40] },
    { cls: "orb orb-teal", style: { width: 560, height: 560, bottom: "5%", right: "-220px", opacity: 0.22 }, drift: [-40, -30] },
  ],
  how: [
    { cls: "orb orb-teal", style: { width: 640, height: 640, top: "-10%", right: "-200px", opacity: 0.2 }, drift: [-50, 30] },
    { cls: "orb orb-indigo", style: { width: 480, height: 480, bottom: "10%", left: "-180px", opacity: 0.18 }, drift: [40, -20] },
  ],
  privacy: [
    { cls: "orb orb-teal", style: { width: 820, height: 520, top: "50%", left: "50%", marginLeft: -410, marginTop: -260, opacity: 0.16 }, drift: [0, 24] },
  ],
  pricing: [
    { cls: "orb orb-saffron", style: { width: 620, height: 620, top: "5%", left: "50%", marginLeft: -310, opacity: 0.2 }, drift: [30, 36] },
  ],
  waitlist: [
    { cls: "orb orb-indigo", style: { width: 560, height: 560, top: "0%", left: "-160px", opacity: 0.26 }, drift: [44, 30] },
    { cls: "orb orb-saffron", style: { width: 460, height: 460, bottom: "-10%", right: "-140px", opacity: 0.2 }, drift: [-30, -34] },
    { cls: "orb orb-teal", style: { width: 420, height: 420, top: "40%", right: "20%", opacity: 0.16 }, drift: [26, -26] },
  ],
};

export function SectionScene({ variant }: { variant: Variant }) {
  const reduce = useReducedMotion();
  const orbs = ORBS[variant];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {orbs.map((o, i) => (
        <motion.div
          key={i}
          className={o.cls}
          style={o.style}
          animate={reduce ? undefined : { x: [0, o.drift[0], 0], y: [0, o.drift[1], 0] }}
          transition={reduce ? undefined : { duration: 18 + i * 6, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
