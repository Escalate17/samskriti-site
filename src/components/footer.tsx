"use client";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative">
      <div className="section-divider" />

      <div className="section-container !py-16 max-w-5xl mx-auto">
        {/* Honesty footnote */}
        <div className="glass-card p-8 mb-16 max-w-3xl mx-auto">
          <p className="text-[15px] text-white/60 leading-[1.8] text-center font-light">
            <span className="text-white/85 font-normal">An honest note:</span>{" "}
            Samskriti manages behavioral state — it does not make the LLM &ldquo;sentient&rdquo; or smarter. We believe separating reasoning from state is simply the most reliable way to build AI that grows.
          </p>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <a
            href="#"
            className="group flex items-center gap-3 cursor-pointer"
            aria-label="Samskriti home"
          >
            <div className="w-6 h-6 rounded-full border border-white/[0.06] flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-saffron/50 to-teal/50" />
            </div>
            <span className="font-display text-base text-white/50 group-hover:text-white/80 transition-colors duration-300">
              Samskriti
            </span>
          </a>

          <p className="text-[15px] text-white/40 font-light tracking-wide">
            © {year} Samskriti
          </p>
        </div>
      </div>
    </footer>
  );
}
