"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

/* ── Pool of fantasy quotes — a new one each time you scroll past ── */
const QUOTES = [
  "Every step you take writes your own fairytale.",
  "She believed she could, so she coded it into existence.",
  "In a world of algorithms, dare to be the magic.",
  "Behind every great product is a dreamer who refused to quit.",
  "Code is poetry — and this is my verse.",
  "The future belongs to those who build it beautifully.",
  "Dream in code. Ship in style. Inspire by default.",
  "Not all who wander are lost — some are debugging.",
  "She turned 'what if' into 'what is.'",
  "A line of code can change the world — write yours.",
  "Elegance is not optional — it's engineered.",
  "Where creativity meets logic, magic happens.",
  "The best interfaces feel like fairy tales — effortless and enchanting.",
  "Pretty smart. Pretty powerful. Pretty unstoppable.",
  "Build things that make people believe in magic again.",
];

const SIDE_SPARKS = ["✦", "✧", "✩", "✿", "❋"];

export default function FantasyQuote() {
  /* Pick a random quote on each mount / re-render into view */
  const [quote, setQuote] = useState("");

  useEffect(() => {
    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  }, []);

  /* Re-randomize every time the section scrolls into view */
  const handleInView = () => {
    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  };

  return (
    <section id="fantasy-quote" className="fantasy-quote-section">
      {/* Ambient glow behind */}
      <div className="fq-glow" />

      {/* Floating micro-sparkles */}
      {[...Array(10)].map((_, i) => (
        <motion.span
          key={i}
          className="fq-spark"
          style={{
            left:  `${8 + i * 9}%`,
            top:   i % 2 === 0 ? "18%" : "72%",
            fontSize: 10 + (i % 3) * 4,
          }}
          animate={{
            opacity: [0, 0.8, 0, 0.6, 0],
            y:       [0, -14, 3, -9, 0],
            scale:   [0.7, 1.3, 0.9, 1.1, 0.7],
          }}
          transition={{
            duration: 3.5 + i * 0.3,
            repeat: Infinity,
            delay: i * 0.35,
            ease: "easeInOut",
          }}
        >
          {SIDE_SPARKS[i % SIDE_SPARKS.length]}
        </motion.span>
      ))}

      {/* Decorative rule */}
      <motion.div
        className="fq-rule"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: false, margin: "-80px" }}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Crown decoration */}
      <motion.div
        className="fq-crown"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        onViewportEnter={handleInView}
        viewport={{ once: false, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        ✦ ✧ ✦
      </motion.div>

      {/* Main quote — changes every time you scroll past */}
      <motion.blockquote
        className="fq-quote"
        key={quote}
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-60px" }}
        transition={{ duration: 1.0, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        &ldquo;{quote}&rdquo;
      </motion.blockquote>

      {/* Closing rule */}
      <motion.div
        className="fq-rule"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: false, margin: "-80px" }}
        transition={{ duration: 1.0, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
    </section>
  );
}
