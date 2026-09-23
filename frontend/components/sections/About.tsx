"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { personal } from "@/lib/data";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function About() {
  return (
    <section id="about" className="py-28 px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

        {/* ── Visual side ──────────────────────────────────────── */}
        <ScrollReveal variant="fadeLeft">
          <div className="relative">
            {/* Main photo box */}
            <div
              className="relative w-full aspect-[3/4] rounded-sm overflow-hidden"
              style={{ background: "linear-gradient(135deg,#f4d4db,#d4c5e8)" }}
            >
              <Image
                src="/mishika-photo.jpg"
                alt="Mishika — AI/ML Engineer"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rose/20 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md rounded-sm px-4 py-2.5 border border-rose/25 shadow-md">
                <p className="font-playfair italic font-bold text-charcoal text-sm">AI / ML Engineer</p>
                <p className="text-rose font-semibold text-xs tracking-widest uppercase mt-0.5">Agentic AI & Computer Vision</p>
              </div>
            </div>

            {/* Decorative border */}
            <div className="absolute -inset-3 border border-rose/30 rounded-sm -z-10" />

            {/* Floating stat cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-8 top-12 bg-white/95 backdrop-blur-md border border-rose/25 shadow-md rounded-sm px-4 py-3 text-center"
            >
              <p className="font-playfair font-bold text-2xl text-rose">2+</p>
              <p className="text-charcoal font-semibold text-[0.65rem] tracking-wider uppercase">Hackathon Wins</p>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
              className="absolute -left-8 bottom-20 bg-white/95 backdrop-blur-md border border-rose/25 shadow-md rounded-sm px-4 py-3 text-center"
            >
              <p className="font-playfair font-bold text-2xl text-rose">5+</p>
              <p className="text-charcoal font-semibold text-[0.65rem] tracking-wider uppercase">AI Products</p>
            </motion.div>
          </div>
        </ScrollReveal>

        {/* ── Text side ────────────────────────────────────────── */}
        <ScrollReveal variant="fadeRight" delay={0.15}>
          <p className="section-label font-bold text-rose">✦ Section 01</p>
          <h2 className="section-title font-bold text-charcoal">Behind The Code</h2>
          <div className="section-line" />

          <p className="font-cormorant italic font-semibold text-[1.4rem] text-rose leading-relaxed mb-6">
            &ldquo;{personal.about.quote}&rdquo;
          </p>

          {personal.about.paragraphs.map((p, i) => (
            <ScrollReveal key={i} variant="fadeUp" delay={i * 0.1 + 0.2} threshold={0.05}>
              <p className="text-charcoal/90 font-normal text-[0.96rem] leading-[1.95] mb-4">{p}</p>
            </ScrollReveal>
          ))}

          {/* Badges */}
          <motion.div
            className="flex flex-wrap gap-2 mt-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
          >
            {personal.about.badges.map(b => (
              <motion.span
                key={b}
                variants={{
                  hidden:  { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1 },
                }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="inline-flex px-3.5 py-1.5 rounded-full text-xs font-semibold bg-rose/10 text-rose border border-rose/25 shadow-sm"
              >
                {b}
              </motion.span>
            ))}
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
