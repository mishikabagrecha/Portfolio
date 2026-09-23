"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Linkedin, Download } from "lucide-react";
import { personal } from "@/lib/data";

const rows = [
  { label: "Role",        value: "AI/ML Engineer · Agentic AI Builder",              icon: "💼" },
  { label: "Education",   value: "B.Tech CSE (RL) · 2023 – 2027",                     icon: "🎓" },
  { label: "Core Skills", value: "Python · PyTorch · Scikit-Learn · OpenCV · GenAI", icon: "⚡" },
  { label: "Internships", value: "2 · IBM SkillsBuild (AI) + YuvaIntern (ML)",        icon: "🚀" },
  { label: "Projects",    value: "Armmadio (AI Closet) · Drowsiness Detection · Mentara", icon: "🛠" },
  { label: "Hackathons",  value: "Winner — Innovik 6.0 & 5.0 (2+ Wins, Top 5 Int./Nat.)", icon: "🥇" },
  { label: "Status",      value: "✅ Actively seeking AI/ML & Agentic AI roles",      icon: "✨" },
];

const stats = [
  { number: "2+",  label: "Hackathons Won" },
  { number: "2",   label: "AI Internships" },
  { number: "5+",  label: "Certifications" },
  { number: "4+",  label: "AI Systems"     },
];

export default function RecruiterModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4"
          onClick={onClose}
        >
          {/* Premium dark overlay */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, rgba(20,12,16,0.92) 0%, rgba(38,22,30,0.96) 100%)",
              backdropFilter: "blur(20px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal card — perfectly fitted to viewport, no scroll needed */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="relative w-full max-w-xl z-10 rounded-sm overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(38,24,31,0.96) 0%, rgba(22,14,18,0.98) 100%)",
              border: "1px solid rgba(201,116,138,0.3)",
              boxShadow: "0 0 0 1px rgba(201,116,138,0.15), 0 25px 60px rgba(0,0,0,0.6), 0 0 70px rgba(201,116,138,0.12)",
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Top accent line */}
            <div
              className="w-full h-[2px]"
              style={{ background: "linear-gradient(90deg, transparent, #c9748a, #c9a96e, #c9748a, transparent)" }}
            />

            <div className="p-5 sm:p-6">
              {/* Close */}
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute top-4 right-4 text-white/40 hover:text-rose transition-colors p-1"
              >
                <X size={18} />
              </button>

              {/* Header */}
              <div className="mb-4">
                <p
                  className="text-[0.62rem] tracking-[0.3em] uppercase mb-1 font-medium"
                  style={{ color: "#c9748a" }}
                >
                  ✦ Recruiter Quick View
                </p>
                <div className="flex items-baseline gap-3">
                  <h2 className="font-playfair text-2xl sm:text-3xl text-cream">
                    {personal.name}
                  </h2>
                  <p
                    className="font-cormorant italic text-sm sm:text-base"
                    style={{ color: "rgba(201,116,138,0.9)" }}
                  >
                    AI/ML & Agentic AI Specialist
                  </p>
                </div>
              </div>

              {/* Stats row — compact */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-sm text-center py-2 px-1"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(201,116,138,0.18)",
                    }}
                  >
                    <p
                      className="font-playfair text-lg sm:text-xl font-medium leading-tight mb-0.5"
                      style={{ color: "#c9748a" }}
                    >
                      {s.number}
                    </p>
                    <p className="text-[0.52rem] tracking-wider uppercase text-white/40 leading-tight">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div
                className="w-full h-px mb-3"
                style={{ background: "linear-gradient(90deg, transparent, rgba(201,116,138,0.25), transparent)" }}
              />

              {/* Rows */}
              <div className="space-y-1 mb-5">
                {rows.map(({ label, value, icon }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2.5 py-1.5"
                    style={{ borderBottom: "1px solid rgba(201,116,138,0.06)" }}
                  >
                    <span className="text-xs w-4 flex-shrink-0">{icon}</span>
                    <span
                      className="text-[0.58rem] tracking-wider uppercase w-20 flex-shrink-0 font-medium"
                      style={{ color: "rgba(201,116,138,0.7)" }}
                    >
                      {label}
                    </span>
                    <span className="text-xs text-cream/90 leading-snug truncate">{value}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-2.5 pt-1">
                <a
                  href={`mailto:${personal.email}`}
                  className="flex items-center gap-2 px-5 py-2 rounded-full text-xs tracking-wider uppercase text-cream transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: "linear-gradient(135deg, #c9748a, #b76e79)",
                    boxShadow: "0 4px 15px rgba(201,116,138,0.3)",
                  }}
                >
                  <Mail size={13} /> Email Me
                </a>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2 rounded-full text-xs tracking-wider uppercase transition-all duration-200 hover:-translate-y-0.5 hover:border-rose hover:text-rose"
                  style={{
                    border: "1px solid rgba(201,116,138,0.35)",
                    color: "rgba(201,116,138,0.9)",
                  }}
                >
                  <Linkedin size={13} /> LinkedIn
                </a>
                <a
                  href={personal.resume}
                  download
                  className="flex items-center gap-2 px-5 py-2 rounded-full text-xs tracking-wider uppercase transition-all duration-200 hover:-translate-y-0.5 hover:border-cream/40 hover:text-cream"
                  style={{
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  <Download size={13} /> Resume PDF
                </a>
              </div>
            </div>

            {/* Bottom accent line */}
            <div
              className="w-full h-[1px]"
              style={{ background: "linear-gradient(90deg, transparent, rgba(201,169,110,0.3), transparent)" }}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

