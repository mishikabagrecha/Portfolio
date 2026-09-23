"use client";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { stats } from "@/lib/data";
import AmbientParticles from "@/components/ui/AmbientParticles";

export default function Achievements() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="achievements"
      className="py-28 px-6 relative overflow-hidden bg-charcoal"
      ref={ref}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-rose/5 blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-lavender/5 blur-[80px]" />
      <AmbientParticles count={8} />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label font-bold text-rose">✦ Section 04</p>
          <h2 className="section-title section-title-light font-playfair font-bold text-cream text-3xl sm:text-4xl">Trophy Shelf</h2>
          <div className="section-line" />
        </motion.div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="border border-rose/15 rounded-sm p-6 text-center bg-white/[0.03]
                hover:-translate-y-1.5 hover:bg-white/[0.07] hover:border-rose/30 transition-all duration-300"
            >
              <div className="text-3xl mb-2.5">{s.icon}</div>
              <div className="font-playfair text-3xl font-bold text-rose leading-none mb-1.5">{s.number}</div>
              <div className="text-cream/80 text-[0.72rem] font-semibold tracking-widest uppercase">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
