"use client";

import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { useRef, useState, FormEvent } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";

type PayAnswer = "yes" | "no" | "maybe";
const PAY_OPTIONS: { value: PayAnswer; label: string }[] = [
  { value: "yes", label: "Yes" },
  { value: "maybe", label: "Maybe" },
  { value: "no", label: "No" },
];

export function TestUserSurvey() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const shouldReduceMotion = useReducedMotion();

  const [email, setEmail] = useState("");
  const [payAnswer, setPayAnswer] = useState<PayAnswer | null>(null);
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const showAmount = payAnswer === "yes" || payAnswer === "maybe";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !payAnswer || status === "loading" || status === "success") return;

    setStatus("loading");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          pay_answer: payAnswer,
          amount: showAmount && amount ? amount : null,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
        setAmount("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="test-user" className="relative overflow-hidden" ref={ref}>
      <div className="section-divider" />

      {/* Dramatic orbs — matches the site's section palette */}
      <div className="orb orb-teal w-[600px] h-[600px] top-[-180px] right-[12%] opacity-12" />
      <div className="orb orb-indigo w-[480px] h-[480px] bottom-[-180px] left-[6%] opacity-12" />

      <div className="section-container max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 1, ease: [0.2, 0, 0, 1] }}
          className="text-center"
        >
          <p className="text-overline mb-6">Tried it?</p>
          <h2 className="heading-section mb-8">
            Would you pay for a <span className="text-gradient">hosted version?</span>
          </h2>
          <p className="text-body-lg mb-16 max-w-xl mx-auto">
            Installed it and given it a spin? Tell us one thing — would you pay for a fully
            hosted version, with nothing to install or run yourself? Leave your email if you
            want hosting updates.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={
            shouldReduceMotion ? { duration: 0 } : { duration: 0.9, delay: 0.2, ease: [0.2, 0, 0, 1] }
          }
          className="glass-card p-8 sm:p-10 border border-white/[0.05] max-w-xl mx-auto text-left"
        >
          {/* Email capture */}
          <label htmlFor="test-user-email" className="block text-sm font-light text-white/50 mb-3">
            Your email — for hosting updates
          </label>
          <input
            type="email"
            id="test-user-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            required
            disabled={status === "success"}
            className="w-full px-6 py-4 rounded-full bg-white/[0.03] border border-white/[0.06] text-white placeholder-white/15 text-[15px] font-light focus:outline-none focus:border-indigo/40 focus:ring-2 focus:ring-indigo/10 transition-all duration-300 disabled:opacity-40 min-h-[56px]"
            aria-label="Email address"
          />

          {/* Pay question */}
          <div className="mt-10">
            <p className="text-sm font-light text-white/50 mb-4">
              Would you pay for a hosted version?
            </p>
            <div className="grid grid-cols-3 gap-3" role="group" aria-label="Would you pay for a hosted version">
              {PAY_OPTIONS.map((opt) => {
                const selected = payAnswer === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setPayAnswer(opt.value)}
                    disabled={status === "success"}
                    aria-pressed={selected}
                    className={
                      "min-h-[52px] rounded-full text-[15px] font-light transition-all duration-300 disabled:opacity-40 border " +
                      (selected
                        ? "bg-indigo-950/50 border-indigo/50 text-white ring-2 ring-indigo/10"
                        : "bg-white/[0.03] border-white/[0.06] text-white/60 hover:border-white/15 hover:text-white/80")
                    }
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Optional dollar amount — revealed for Yes / Maybe */}
          <AnimatePresence initial={false}>
            {showAmount && (
              <motion.div
                key="amount"
                initial={shouldReduceMotion ? false : { opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0, marginTop: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4, ease: [0.2, 0, 0, 1] }}
                className="overflow-hidden"
              >
                <label htmlFor="test-user-amount" className="block text-sm font-light text-white/50 mb-3">
                  Roughly how much per month? <span className="text-white/25">(optional)</span>
                </label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30 text-[15px] font-light pointer-events-none">
                    $
                  </span>
                  <input
                    type="number"
                    id="test-user-amount"
                    inputMode="decimal"
                    min="0"
                    step="1"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="20"
                    disabled={status === "success"}
                    className="w-full pl-10 pr-6 py-4 rounded-full bg-white/[0.03] border border-white/[0.06] text-white placeholder-white/15 text-[15px] font-light focus:outline-none focus:border-indigo/40 focus:ring-2 focus:ring-indigo/10 transition-all duration-300 disabled:opacity-40 min-h-[56px]"
                    aria-label="Amount per month in dollars (optional)"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit */}
          <button
            type="submit"
            disabled={!email || !payAnswer || status === "loading" || status === "success"}
            className="btn-primary w-full mt-10 disabled:opacity-40"
          >
            {status === "loading" && <Loader2 className="w-4 h-4 animate-spin" />}
            {status === "success" && <Check className="w-4 h-4" />}
            {(status === "idle" || status === "error") && <ArrowRight className="w-4 h-4" />}
            <span>{status === "success" ? "Thank you" : "Send it in"}</span>
          </button>

          {status === "error" && (
            <p className="text-red-400/60 text-sm font-light mt-4 text-center">
              Something went wrong. Try again?
            </p>
          )}
          {status === "success" && (
            <p className="text-white/40 text-sm font-light mt-4 text-center">
              Thanks — your answer&apos;s in.
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
