"use client";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { FileDown, Eye } from "lucide-react";
import { personal } from "@/lib/data";

const resumeLines = [
  { dot: true, text: "B.Tech Computer Science (RL) — 2023 – 2027" },
  { dot: true, text: "AI/ML Engineer · 2 Internships (IBM & YuvaIntern)" },
  { dot: true, text: "Python · PyTorch · Scikit-Learn · OpenCV" },
  { dot: true, text: "5+ End-to-End AI/ML Systems Shipped" },
  { dot: true, text: "2+ Hackathon Winner (International & National)" },
  { dot: true, text: "Open to AI/ML & Agentic AI Roles" },
];

export default function Resume() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="resume" className="py-28 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label">✦ Section 05</p>
          <h2 className="section-title">Career Blueprint</h2>
          <div className="section-line" />
        </motion.div>

        <div
          className="rounded-sm overflow-hidden grid grid-cols-1 lg:grid-cols-2"
          style={{ background: "#1a1014" }}
        >
          {/* Left — fake resume preview */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="p-10 border-r border-white/5 flex flex-col justify-center"
          >
            <p className="font-playfair italic text-cream font-bold text-base mb-6 border-b border-white/15 pb-4">
              Mishika — AI/ML & Agentic AI Engineer
            </p>
            <div className="space-y-1">
              {resumeLines.map((l, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
                  className="flex items-center gap-3 py-3 border-b border-white/10 last:border-0"
                >
                  <span className="w-2 h-2 rounded-full bg-rose flex-shrink-0 shadow-sm" />
                  <span className="text-cream/90 font-medium text-sm">{l.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="p-10 flex flex-col justify-center"
          >
            <p className="text-rose font-bold text-[0.72rem] tracking-[0.28em] uppercase mb-3">✦ Career Blueprint</p>
            <h3 className="font-playfair text-cream font-bold text-3xl leading-tight mb-4">
              Ready to build<br />the future with you.
            </h3>
            <div className="w-12 h-px bg-gradient-to-r from-rose to-gold mb-6" />
            <p className="text-cream/80 text-sm leading-relaxed mb-8">
              My résumé is a story — not just a document. Every line represents a problem solved,
              a product shipped, and a lesson learned. I&apos;m actively seeking roles in AI/ML engineering
              and software development where I can create real impact.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={personal.resume}
                download
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full
                  bg-rose text-white text-xs tracking-widest uppercase
                  hover:bg-white hover:text-rose transition-all duration-300"
              >
                <FileDown size={15} /> Download PDF
              </a>
              <a
                href={personal.resume}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full
                  border border-white/20 text-cream text-xs tracking-widest uppercase
                  hover:border-rose hover:text-rose transition-all duration-300"
              >
                <Eye size={15} /> Preview
              </a>
            </div>

            {/* Easter egg */}
            <p
              className="mt-8 text-white/10 text-xs cursor-default select-none hover:text-rose/60
                transition-colors duration-500 italic"
              title="🎉 You found the easter egg!"
            >
              ✦ Pink. Powerful. Programmable.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
