"use client";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, X, Zap } from "lucide-react";
import { projects } from "@/lib/data";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Projects() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const [selected, setSelected] = useState<typeof projects[0] | null>(null);

  return (
    <section id="projects" className="py-28 px-6 max-w-6xl mx-auto" ref={ref}>
      <ScrollReveal variant="blurUp">
        <p className="section-label">✦ Section 03</p>
        <h2 className="section-title">Dream Projects</h2>
        <div className="section-line" />
      </ScrollReveal>

      {/* Project grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-4">
        {projects.map((p, i) => (
          <ScrollReveal key={p.id} variant="scaleIn" delay={i * 0.1} threshold={0.05}>
            <motion.div
              className="glass-card rounded-sm overflow-hidden cursor-none h-full"
              onClick={() => setSelected(p)}
              data-hover
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
            >
              {/* Card header image */}
              <div
                className="h-44 flex items-center justify-center text-5xl relative overflow-hidden"
                style={{ background: p.bgHex }}
              >
                <motion.span
                  className="z-10 select-none"
                  whileHover={{ scale: 1.2, rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  {p.emoji}
                </motion.span>
                <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent" />

                {/* Shimmer sweep on hover */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)",
                    backgroundSize: "200% 100%",
                  }}
                  initial={{ backgroundPosition: "-100% 0" }}
                  whileHover={{ backgroundPosition: "200% 0" }}
                  transition={{ duration: 0.6 }}
                />

                {p.featured && (
                  <span className="absolute top-3 right-3 text-[0.62rem] tracking-widest uppercase
                    bg-charcoal/90 text-cream px-2.5 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm">
                    <Zap size={10} /> Featured
                  </span>
                )}
              </div>

              {/* Card body */}
              <div className="p-5">
                <h3 className="font-playfair font-bold text-xl text-charcoal mb-1.5">{p.title}</h3>
                <p className="text-rose font-semibold text-xs tracking-wider italic mb-3">{p.tagline}</p>
                <p className="text-charcoal/85 text-sm leading-relaxed mb-4 line-clamp-3">{p.desc}</p>

                {/* Tech chips */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.tech.slice(0, 4).map(t => (
                    <span key={t} className="inline-flex px-2.5 py-1 rounded-full text-[0.68rem] font-semibold bg-rose/10 text-rose border border-rose/20">{t}</span>
                  ))}
                  {p.tech.length > 4 && (
                    <span className="inline-flex px-2 py-1 rounded-full text-[0.68rem] font-semibold bg-rose/10 text-rose border border-rose/20">+{p.tech.length - 4}</span>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="w-full flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase py-2.5 px-4 rounded-full
                      bg-charcoal text-cream hover:bg-rose transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <Github size={14} /> GitHub Code
                  </a>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>

      {/* ── Project detail modal ─────────────────────────────── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[8000] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                background: "rgba(26,16,20,0.75)",
                backdropFilter: "blur(20px)",
              }}
            />

            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
              className="relative rounded-sm shadow-luxury max-w-2xl w-full max-h-[90vh] overflow-y-auto z-10"
              style={{
                background: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(24px)",
                border: "1px solid rgba(201,116,138,0.25)",
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* Top accent */}
              <div
                className="w-full h-[2px]"
                style={{ background: "linear-gradient(90deg, #c9748a, #c9a96e, #d4c5e8)" }}
              />

              {/* Modal header */}
              <div
                className="h-52 flex items-center justify-center text-7xl relative overflow-hidden"
                style={{ background: selected.bgHex }}
              >
                {selected.emoji}
                <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent" />
              </div>

              <div className="p-8">
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-5 right-5 text-muted hover:text-rose transition-colors"
                  data-hover
                >
                  <X size={20} />
                </button>

                <p className="text-rose text-xs tracking-wider italic mb-1">{selected.tagline}</p>
                <h2 className="font-playfair text-2xl text-charcoal mb-4">{selected.title}</h2>
                <p className="text-muted leading-relaxed mb-5 text-sm">{selected.desc}</p>

                <div className="bg-blush/50 border-l-2 border-rose px-4 py-3 rounded-r-sm mb-5">
                  <p className="text-xs tracking-widest uppercase text-rose mb-1">Problem Solved</p>
                  <p className="text-sm text-charcoal">{selected.problem}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  {selected.highlights.map(h => (
                    <div
                      key={h}
                      className="glass border border-rose/15 rounded-sm px-3 py-2.5 text-center
                        hover:border-rose/30 transition-colors"
                    >
                      <p className="text-sm font-medium text-charcoal">{h}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {selected.tech.map(t => (
                    <span key={t} className="tag-chip">{t}</span>
                  ))}
                </div>

                <div className="flex">
                  <a href={selected.github} target="_blank" rel="noopener noreferrer"
                    className="btn-primary w-full justify-center flex items-center gap-2 text-xs">
                    <Github size={14} /><span>View on GitHub</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
