"use client";

import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { SectionScene } from "@/components/section-scene";

function MemeImage({
  src,
  alt,
  fallbackText,
}: {
  src: string;
  alt: string;
  fallbackText: string;
}) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-indigo/5 to-teal/5 border border-white/[0.04] flex items-center justify-center">
        <span className="text-xs text-white/15 italic font-light">{fallbackText}</span>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/[0.04]">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        onError={() => setError(true)}
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
}

interface StageData {
  day: string;
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  rightTag?: string;
}

function Stage({ stage, index }: { stage: StageData; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });
  const shouldReduceMotion = useReducedMotion();
  // Subtle, premium scroll-linked 3D: cards rise + tilt flat as they enter view.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 88%", "center 58%"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [7, 0]);
  const ty = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [44, 0]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 1 }}
      className="relative"
    >
      {/* Day label */}
      <div className="flex items-center gap-6 mb-10">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
        <span className="text-overline">{stage.day}</span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
      </div>

      {/* Two columns — subtle scroll-driven 3D */}
      <motion.div
        style={{ rotateX, y: ty, transformPerspective: 1400 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 [transform-style:preserve-3d]"
      >
        {/* Without */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 0.8, delay: index * 0.1 + 0.2, ease: [0.2, 0, 0, 1] }
          }
          className="glass-card p-8"
        >
          {stage.leftContent}
        </motion.div>

        {/* With Samskriti */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 0.8, delay: index * 0.1 + 0.4, ease: [0.2, 0, 0, 1] }
          }
          className="glass-card gradient-border p-8 relative"
        >
          {stage.rightTag && (
            <span className="absolute top-4 right-4 text-[11px] font-semibold tracking-[0.18em] uppercase text-teal/70 bg-teal/10 px-3 py-1.5 rounded-full">
              {stage.rightTag}
            </span>
          )}
          {stage.rightContent}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function MemeComparison() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-10%" });
  const shouldReduceMotion = useReducedMotion();

  const stages: StageData[] = [
    {
      day: "Picking up where you left off",
      rightTag: "remembers & evolves",
      leftContent: (
        <div>
          <div className="chat-bubble chat-bubble-ai">
            Hi! How can I help you today?
          </div>
          <p className="mt-6 text-[15px] text-white/55 font-light leading-relaxed">
            <strong className="text-white/80">A normal AI:</strong> May recall a few saved facts, but resets its tone and forgets how you actually like to talk every new chat. You re-explain yourself constantly.
          </p>
        </div>
      ),
      rightContent: (
        <div>
          <div className="chat-bubble chat-bubble-ai-warm">
            Hey, back to chapter 3 of your novel — want to keep the darker tone we landed on last night?
          </div>
          <p className="mt-6 text-[15px] text-white/55 font-light leading-relaxed">
            <strong className="text-white/90">With Samskriti:</strong> It carries your shared history and the personality it has grown into, so it continues the relationship instead of starting over.
          </p>
        </div>
      ),
    },
    {
      day: "When you upgrade the model",
      leftContent: (
        <div>
          <div className="chat-bubble chat-bubble-ai">
            You&apos;re on a new model now. Hi! How can I help you today?
          </div>
          <p className="mt-6 text-[15px] text-white/55 font-light leading-relaxed">
            <strong className="text-white/80">A normal AI:</strong> Swap to a newer model and its behavior resets — the voice you got used to is gone, and you train it on your preferences from scratch.
          </p>
        </div>
      ),
      rightContent: (
        <div>
          <div className="chat-bubble chat-bubble-ai-warm">
            Upgraded my engine under the hood — still me. Same voice, same memories, same in-jokes.
          </div>
          <div className="mt-6">
            <MemeImage
              src="/memes/wait-a-minute.jpg"
              alt="Realizing memory is not the same as a continuous personality"
              fallbackText="drop wait-a-minute.jpg here"
            />
          </div>
          <p className="mt-4 text-[14px] text-white/55 italic font-light text-center">
            Its personality lives outside the model, so it survives the upgrade.
          </p>
        </div>
      ),
    },
    {
      day: "Staying consistent over a long chat",
      leftContent: (
        <div>
          <div className="chat-bubble chat-bubble-ai">
            Sure, I&apos;ll keep it short! …and then writes six long paragraphs anyway.
          </div>
          <p className="mt-6 text-[15px] text-white/55 font-light leading-relaxed">
            <strong className="text-white/80">A normal AI:</strong> The longer the conversation runs, the more it drifts and forgets the boundaries you set earlier.
          </p>
        </div>
      ),
      rightContent: (
        <div>
          <div className="chat-bubble chat-bubble-ai-warm">
            Keeping it to three lines, like you asked — every time.
          </div>
          <div className="mt-6">
            <MemeImage
              src="/memes/best-friends.jpg"
              alt="The model and Samskriti working together"
              fallbackText="drop best-friends.jpg here"
            />
          </div>
          <p className="mt-4 text-[14px] text-white/55 italic font-light text-center">
            Your rules are kept as real state — not a fading line in the prompt.
          </p>
        </div>
      ),
    },
  ];

  return (
    <section id="comparison" className="relative overflow-hidden">
      <SectionScene variant="meme" />

      <div className="section-container max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 1, ease: [0.2, 0, 0, 1] }
          }
          className="text-center mb-20"
        >
          <p className="text-overline mb-6">A normal AI vs. Samskriti</p>
          <h2 className="heading-section mb-6">
            Same Conversation.
            <br />
            <span className="text-gradient">One Actually Remembers.</span>
          </h2>
        </motion.div>

        {/* Column headers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="text-center">
            <span className="text-overline">A normal AI</span>
          </div>
          <div className="text-center">
            <span className="text-overline text-gradient">With Samskriti</span>
          </div>
        </div>

        {/* Three stages */}
        <div className="space-y-16">
          {stages.map((stage, i) => (
            <Stage key={i} stage={stage} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
