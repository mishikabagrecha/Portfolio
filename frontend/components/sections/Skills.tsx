"use client";
import { motion } from "framer-motion";
import { skills } from "@/lib/data";
import ScrollReveal from "@/components/ui/ScrollReveal";
import AmbientParticles from "@/components/ui/AmbientParticles";

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-28 px-6 bg-charcoal relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-rose/5 blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-lavender/5 blur-[80px]" />
      <AmbientParticles count={10} />

      <div className="max-w-6xl mx-auto relative z-10">
        <ScrollReveal variant="blurUp">
          <p className="section-label font-bold text-rose">✦ Section 02</p>
          <h2 className="section-title section-title-light font-playfair font-bold text-cream text-3xl sm:text-4xl">My Tech Wardrobe</h2>
          <div className="section-line" />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-4">
          {skills.map((s, i) => (
            <ScrollReveal key={s.category} variant="scaleIn" delay={i * 0.09} threshold={0.05}>
              <motion.div
                className="group relative border border-rose/15 rounded-sm p-7 bg-white/[0.03]
                  transition-all duration-400 overflow-hidden h-full"
                whileHover={{ y: -6, backgroundColor: "rgba(201,116,138,0.06)" }}
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-rose-gold
                  scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />

                {/* Glow orb */}
                <motion.div
                  className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: "radial-gradient(circle, rgba(201,116,138,0.15) 0%, transparent 70%)",
                    filter: "blur(12px)",
                  }}
                />

                <div className="flex items-start gap-3 mb-4">
                  <motion.span
                    className="text-2xl"
                    whileHover={{ scale: 1.3, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {s.icon}
                  </motion.span>
                  <div>
                    <p className="text-[0.7rem] tracking-[0.25em] uppercase font-semibold text-rose mb-1">
                      {s.subtitle}
                    </p>
                    <h3 className="font-playfair italic font-bold text-cream text-xl leading-tight">
                      {s.category}
                    </h3>
                  </div>
                </div>

                <motion.div
                  className="flex flex-wrap gap-2"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
                >
                  {s.tags.map(tag => (
                    <motion.span
                      key={tag}
                      variants={{
                        hidden:  { opacity: 0, scale: 0.8 },
                        visible: { opacity: 1, scale: 1 },
                      }}
                      transition={{ type: "spring", stiffness: 350, damping: 20 }}
                      className="text-xs font-medium px-3 py-1.5 rounded-full border border-white/20
                        bg-white/10 text-cream hover:bg-rose hover:text-white
                        hover:border-rose transition-all duration-200 cursor-default shadow-sm"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
