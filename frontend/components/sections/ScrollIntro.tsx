"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function ScrollIntro({ onEnter }: { onEnter: () => void }) {
  const [leaving, setLeaving] = useState(false);

  const handleEnter = () => {
    setLeaving(true);
    setTimeout(onEnter, 900);
  };

  return (
    <AnimatePresence>
      {!leaving && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse at center, #1a0a0e 0%, #0d0508 50%, #060206 100%)",
          }}
        >
          {/* Atmospheric glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse at 20% 30%, rgba(201,169,110,0.04) 0%, transparent 50%),
                radial-gradient(ellipse at 80% 70%, rgba(160,40,60,0.05) 0%, transparent 50%),
                radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.75) 100%)
              `,
            }}
          />

          {/* Scroll */}
          <motion.div
            initial={{ scaleY: 0.05, scaleX: 0.8, opacity: 0 }}
            animate={{ scaleY: 1, scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "center top", width: "min(520px, 92vw)" }}
          >
            {/* Top Rod */}
            <Rod />

            {/* Parchment */}
            <div
              className="relative mx-3 -my-2 flex flex-col items-center px-12 py-12"
              style={{
                background: `
                  linear-gradient(160deg,
                    #f2e8c8 0%, #e8d9a8 12%, #ede0b0 25%, #dfd09a 38%,
                    #e5d5a0 52%, #d8c88a 65%, #e4d6a4 78%, #cfc290 100%)
                `,
                backgroundColor: "#e2d49a",
                boxShadow: "inset 0 0 40px rgba(100,70,20,0.25)",
                minHeight: 380,
              }}
            >
              {/* Ornamental SVG border */}
              <OrnamentBorder />

              {/* Age spots */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 8% 12%, rgba(100,70,20,0.18) 0%, transparent 12%),
                    radial-gradient(circle at 92% 88%, rgba(80,55,15,0.15) 0%, transparent 10%),
                    radial-gradient(circle at 30% 80%, rgba(120,80,25,0.1) 0%, transparent 8%)
                  `,
                }}
              />

              {/* Floating sparkles */}
              {([
                { top: "30%", left: "8%", right: undefined, delay: 0.5 },
                { top: "60%", left: undefined, right: "10%", delay: 1.8 },
                { top: "45%", left: "12%", right: undefined, delay: 3 },
              ] as const).map((s, i) => (
                <motion.span
                  key={i}
                  className="absolute pointer-events-none text-[#c9a96e] text-xs"
                  style={{ top: s.top, left: s.left, right: s.right }}
                  animate={{ opacity: [0, 0.7, 0], y: [0, -20, -32], scale: [0, 1, 0.6] }}
                  transition={{ duration: 4, delay: s.delay, repeat: Infinity }}
                >
                  ✦
                </motion.span>
              ))}

              {/* Content */}
              <div className="relative z-10 text-center w-full">
                <p
                  className="text-[10px] uppercase tracking-[0.45em] text-[#6b4a1a] opacity-75 mb-5"
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  Est. MMXXV · Portfolio Codex
                </p>

                <Divider />

                <h1
                  className="text-[#3a2008] leading-[1.55] mb-2"
                  style={{
                    fontFamily: "'IM Fell English', serif",
                    fontStyle: "italic",
                    fontSize: "clamp(1.35rem, 4vw, 1.8rem)",
                  }}
                >
                  Welcome to a world<br />
                  where dreams turn<br />
                  into reality…
                </h1>

                <Divider char="⸻" />

                <p
                  className="text-[#5a3515]"
                  style={{
                    fontFamily: "'IM Fell English', serif",
                    fontStyle: "italic",
                    fontSize: "clamp(0.95rem, 2.5vw, 1.15rem)",
                  }}
                >
                  Step into my story.
                </p>

                <p
                  className="text-[#6b4820] leading-[1.85] text-sm max-w-[290px] mx-auto mt-3 opacity-85"
                  style={{ fontFamily: "'IM Fell English', serif", letterSpacing: "0.02em" }}
                >
                  Herein lie the chronicles of a dreamer<br />
                  who dared to write in code —<br />
                  <em>Pretty Smart.</em> Powerful. Purposeful.
                </p>

                {/* Wax Seal */}
                <motion.div
                  className="my-6 cursor-pointer inline-block relative"
                  onClick={handleEnter}
                  whileHover={{ scale: 1.07, rotate: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="absolute inset-[-8px] rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(160,40,60,0.2) 0%, transparent 70%)",
                    }}
                    animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <WaxSeal />
                </motion.div>

                {/* Shimmer bar */}
                <div
                  className="w-14 h-px mx-auto mb-2"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, #c9a96e, transparent)",
                  }}
                />

                <motion.p
                  onClick={handleEnter}
                  className="cursor-pointer text-[#7a4a18] uppercase tracking-[0.38em] text-[10.5px]"
                  style={{ fontFamily: "Cinzel, serif" }}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 }}
                  whileHover={{ color: "#a06828", letterSpacing: "0.5em" }}
                >
                  Enter the World{" "}
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                    style={{ display: "inline-block" }}
                  >
                    →
                  </motion.span>
                </motion.p>
              </div>
            </div>

            {/* Bottom Rod */}
            <Rod />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Rod() {
  return (
    <div
      className="relative z-10 mx-3 h-11 rounded-full"
      style={{
        background:
          "linear-gradient(to bottom, #5a3a1a 0%, #8B5E2A 15%, #c9a96e 30%, #e8c99a 45%, #c9a96e 55%, #8B5E2A 70%, #4a2e0e 85%, #2d1a08 100%)",
        boxShadow:
          "0 6px 20px rgba(0,0,0,0.7), inset 0 2px 4px rgba(255,220,150,0.3)",
      }}
    >
      {["left-[-18px]", "right-[-18px]"].map((pos) => (
        <div
          key={pos}
          className={`absolute top-1/2 -translate-y-1/2 w-12 h-12 rounded-full ${pos}`}
          style={{
            background:
              "radial-gradient(circle at 35% 35%, #e8c99a, #8B5E2A 50%, #3a1e08 90%)",
            boxShadow:
              "0 4px 16px rgba(0,0,0,0.8), inset 0 2px 3px rgba(255,220,150,0.4)",
          }}
        />
      ))}
    </div>
  );
}

function Divider({ char = "✦" }: { char?: string }) {
  return (
    <div className="flex items-center gap-2 my-3 opacity-60" style={{ color: "#8B5E2A" }}>
      <div
        className="flex-1 h-px"
        style={{
          background: "linear-gradient(to right, transparent, #8B5E2A, transparent)",
        }}
      />
      <span className="text-[11px] tracking-[0.3em]">{char}</span>
      <div
        className="flex-1 h-px"
        style={{
          background: "linear-gradient(to right, transparent, #8B5E2A, transparent)",
        }}
      />
    </div>
  );
}

function OrnamentBorder() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 400 460"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c9a96e" />
          <stop offset="40%" stopColor="#f0d898" />
          <stop offset="70%" stopColor="#c9a96e" />
          <stop offset="100%" stopColor="#8B5E2A" />
        </linearGradient>
      </defs>
      {/* Top-left corner */}
      <g fill="none" stroke="url(#goldGrad)" strokeWidth="1.2" opacity="0.65">
        <path d="M30 30 Q60 20 80 40 Q100 60 80 80" />
        <path d="M30 30 Q20 60 40 80 Q60 100 80 80" />
        <path d="M50 30 Q70 15 90 35" />
        <path d="M30 50 Q15 70 35 90" />
        <circle cx="30" cy="30" r="5" fill="url(#goldGrad)" stroke="none" opacity="0.7" />
        <path d="M60 25 Q75 10 95 28 Q110 45 95 60" />
        <path d="M25 60 Q10 75 28 95 Q45 110 60 95" />
      </g>
      {/* Top-right */}
      <g fill="none" stroke="url(#goldGrad)" strokeWidth="1.2" opacity="0.65" transform="scale(-1,1) translate(-400,0)">
        <path d="M30 30 Q60 20 80 40 Q100 60 80 80" />
        <path d="M30 30 Q20 60 40 80 Q60 100 80 80" />
        <path d="M50 30 Q70 15 90 35" /><path d="M30 50 Q15 70 35 90" />
        <circle cx="30" cy="30" r="5" fill="url(#goldGrad)" stroke="none" opacity="0.7" />
      </g>
      {/* Bottom-left */}
      <g fill="none" stroke="url(#goldGrad)" strokeWidth="1.2" opacity="0.65" transform="scale(1,-1) translate(0,-460)">
        <path d="M30 30 Q60 20 80 40 Q100 60 80 80" />
        <path d="M30 30 Q20 60 40 80 Q60 100 80 80" />
        <path d="M50 30 Q70 15 90 35" /><path d="M30 50 Q15 70 35 90" />
        <circle cx="30" cy="30" r="5" fill="url(#goldGrad)" stroke="none" opacity="0.7" />
      </g>
      {/* Bottom-right */}
      <g fill="none" stroke="url(#goldGrad)" strokeWidth="1.2" opacity="0.65" transform="scale(-1,-1) translate(-400,-460)">
        <path d="M30 30 Q60 20 80 40 Q100 60 80 80" />
        <path d="M30 30 Q20 60 40 80 Q60 100 80 80" />
        <path d="M50 30 Q70 15 90 35" /><path d="M30 50 Q15 70 35 90" />
        <circle cx="30" cy="30" r="5" fill="url(#goldGrad)" stroke="none" opacity="0.7" />
      </g>
      {/* Inner frame */}
      <rect x="22" y="22" width="356" height="416" fill="none" stroke="url(#goldGrad)" strokeWidth="0.6" opacity="0.35" rx="2" />
    </svg>
  );
}

function WaxSeal() {
  return (
    <svg width="90" height="90" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 6px 20px rgba(80,10,20,0.6))" }}>
      <defs>
        <radialGradient id="waxG" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#c0304a" />
          <stop offset="35%" stopColor="#8b1a2a" />
          <stop offset="70%" stopColor="#6b0f1e" />
          <stop offset="100%" stopColor="#3d0810" />
        </radialGradient>
        <radialGradient id="goldM" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#f5e09a" />
          <stop offset="30%" stopColor="#d4a847" />
          <stop offset="65%" stopColor="#a07828" />
          <stop offset="100%" stopColor="#6b4e14" />
        </radialGradient>
      </defs>
      {/* Wax blob */}
      <path d="M50 4 C58 3 67 6 74 11 C81 16 87 23 91 31 C95 39 97 48 96 57 C95 66 91 74 85 80 C79 86 71 90 63 93 C55 96 46 97 38 94 C30 91 22 86 16 79 C10 72 6 63 5 54 C4 45 6 35 10 27 C14 19 21 12 29 8 C37 4 42 5 50 4Z" fill="url(#waxG)" />
      {/* Sheen */}
      <ellipse cx="38" cy="28" rx="14" ry="8" fill="rgba(220,80,100,0.15)" transform="rotate(-20 38 28)" />
      {/* Rings */}
      <circle cx="50" cy="50" r="33" fill="none" stroke="url(#goldM)" strokeWidth="1.5" opacity="0.75" />
      <circle cx="50" cy="50" r="29" fill="none" stroke="url(#goldM)" strokeWidth="0.7" opacity="0.5" />
      {/* Fleur-de-lis */}
      <g transform="translate(50,50)">
        <path d="M0,-22 C-3,-18 -5,-12 -3,-8 C-1,-4 0,-2 0,-2 C0,-2 1,-4 3,-8 C5,-12 3,-18 0,-22Z" fill="url(#goldM)" />
        <path d="M0,-6 C-4,-8 -10,-9 -16,-7 C-20,-5 -22,-2 -20,1 C-18,4 -14,4 -10,2 C-7,1 -4,-1 0,-2Z" fill="url(#goldM)" />
        <path d="M0,-6 C4,-8 10,-9 16,-7 C20,-5 22,-2 20,1 C18,4 14,4 10,2 C7,1 4,-1 0,-2Z" fill="url(#goldM)" />
        <rect x="-5" y="-2" width="10" height="3.5" rx="1" fill="url(#goldM)" />
        <path d="M-4,1.5 C-5,5 -4,10 -2,14 C-1,16 0,17 0,17 C0,17 1,16 2,14 C4,10 5,5 4,1.5Z" fill="url(#goldM)" />
        <path d="M-4,1.5 C-7,4 -12,6 -14,10 C-15,13 -13,16 -10,15 C-8,14 -7,11 -6,8 C-5,6 -4,3 -4,1.5Z" fill="url(#goldM)" />
        <path d="M4,1.5 C7,4 12,6 14,10 C15,13 13,16 10,15 C8,14 7,11 6,8 C5,6 4,3 4,1.5Z" fill="url(#goldM)" />
        <path d="M0,17 C-2,19 -3,22 -1,24 C0,25 1,24 3,22 C5,20 4,17 0,17Z" fill="url(#goldM)" />
      </g>
    </svg>
  );
}
