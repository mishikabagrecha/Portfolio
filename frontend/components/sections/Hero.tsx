"use client";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { ArrowDown, Github, Linkedin, FileDown } from "lucide-react";
import { personal } from "@/lib/data";
import MusicToggle from "@/components/ui/MusicToggle";
import AuroraBackground from "@/components/ui/AuroraBackground";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero() {
  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="aurora-hero hero-reveal-section relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 px-6"
    >
      {/* ── Digital Aurora Canvas Background ──────────────────────── */}
      <AuroraBackground />

      {/* ── Content layer ─────────────────────────────────────────── */}
      <div className="aurora-content max-w-4xl w-full text-center relative" style={{ zIndex: 10 }}>

        {/* Name with subtle radiant glow */}
        <div className="relative inline-block mb-5">
          <motion.div
            className="absolute inset-0 -z-10 rounded-full"
            style={{
              background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(212, 83, 126, 0.25) 0%, rgba(217, 164, 65, 0.12) 45%, transparent 75%)",
              filter: "blur(24px)",
              transform: "scale(1.4)",
            }}
          />
          <motion.h1
            {...fadeUp(0.2)}
            className="font-playfair text-[clamp(3.2rem,10vw,6rem)] font-bold leading-[1.05] text-cream tracking-tight drop-shadow-md"
          >
            <span className="shimmer-text italic font-bold">Mishika Bagrecha</span>
          </motion.h1>
        </div>

        {/* AI / ML Engineer Pill (placed between Name and Subtitle) */}
        <motion.div {...fadeUp(0.4)} className="mb-5 block">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/[0.08] backdrop-blur-md border border-rose/35 text-cream text-[0.74rem] tracking-[0.25em] font-bold uppercase shadow-lg shadow-rose/10">
            <motion.span
              animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.3, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              className="text-gold"
            >✦</motion.span>
            AI / ML Engineer
            <motion.span
              animate={{ rotate: [0, -20, 20, 0], scale: [1, 1.3, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              className="text-gold"
            >✦</motion.span>
          </span>
        </motion.div>

        {/* Typed subtitle */}
        <motion.div {...fadeUp(0.6)} className="mb-4">
          <div className="inline-block bg-white/[0.07] backdrop-blur-md border border-white/15 rounded-full px-5 py-1.5 shadow-sm">
            <span className="text-cream/90 text-xs sm:text-[0.78rem] tracking-[0.18em] uppercase font-semibold">
              <TypeAnimation
                sequence={[
                  "AI/ML Engineer · Computer Vision · Agentic AI",      3200,
                  "Software Engineer · Problem Solver · Dream Builder", 3200,
                  "Tech Founder Energy · Breaking Stereotypes",          3200,
                  "Building Intelligent Software That Matters",          2500,
                ]}
                wrapper="span"
                speed={55}
                repeat={Infinity}
              />
            </span>
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          {...fadeUp(0.85)}
          className="font-cormorant italic font-semibold text-[1.75rem] sm:text-[2rem] text-cream/90 mb-8 leading-relaxed drop-shadow-md max-w-2xl mx-auto"
        >
          &ldquo;{personal.tagline}&rdquo;
        </motion.p>

        {/* CTA buttons */}
        <motion.div {...fadeUp(1.05)} className="flex flex-wrap gap-3.5 justify-center mb-8">
          <button onClick={() => scrollTo("#projects")} className="btn-primary shadow-lg shadow-rose/25">
            <span>View Projects</span>
          </button>
          <button
            onClick={() => scrollTo("#contact")}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-cream/35 text-cream text-xs tracking-widest uppercase transition-all duration-300 bg-white/[0.06] backdrop-blur-sm hover:bg-rose hover:border-rose hover:text-white hover:scale-102 hover:-translate-y-0.5"
          >
            <span>Hire Me</span>
          </button>
          <a
            href={personal.resume}
            download
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-cream/35 text-cream text-xs tracking-widest uppercase transition-all duration-300 bg-white/[0.06] backdrop-blur-sm hover:bg-rose hover:border-rose hover:text-white hover:scale-102 hover:-translate-y-0.5"
          >
            <FileDown size={14} />
            <span>Resume</span>
          </a>
        </motion.div>

        {/* Social row */}
        <motion.div {...fadeUp(1.25)} className="flex gap-4 justify-center">
          {[
            { href: personal.github,   icon: <Github size={16} />,   label: "GitHub"   },
            { href: personal.linkedin, icon: <Linkedin size={16} />, label: "LinkedIn" },
          ].map(s => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-cream/90 bg-white/[0.08] hover:bg-white hover:text-charcoal backdrop-blur-md px-4 py-2 rounded-full border border-white/15 shadow-sm text-xs font-semibold uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 group"
            >
              <span className="group-hover:scale-110 transition-transform text-gold group-hover:text-rose">{s.icon}</span>
              {s.label}
            </a>
          ))}
        </motion.div>
      </div>

      {/* ── Scroll hint ────────────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-cream/60 text-[0.65rem] tracking-[0.2em] uppercase z-10"
        animate={{ opacity: [0.35, 0.85, 0.35] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        Scroll
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-rose to-transparent"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, transformOrigin: "top" }}
        />
        <ArrowDown size={11} className="text-gold" />
      </motion.div>

      {/* ── Seamless transition to next section ────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none z-[3]"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, rgba(10, 4, 7, 0.4) 40%, rgba(253, 246, 240, 0.6) 80%, #fdf6f0 100%)",
        }}
      />

      {/* ── Hero bottom right Music Toggle ───────────────────────── */}
      <MusicToggle />
    </section>
  );
}
