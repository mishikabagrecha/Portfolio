"use client";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { personal } from "@/lib/data";

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-charcoal py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/8 pb-8 mb-8">
          <div>
            <span className="font-playfair italic font-bold text-2xl text-rose">M.</span>
            <p className="text-cream/75 text-xs font-semibold tracking-widest uppercase mt-1">
              {personal.brand} &nbsp;✦&nbsp; {personal.role}
            </p>
          </div>

          <div className="flex items-center gap-5">
            {[
              { icon: <Github size={18} />,   href: personal.github   },
              { icon: <Linkedin size={18} />, href: personal.linkedin },
              { icon: <Mail size={18} />,     href: `mailto:${personal.email}` },
            ].map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center
                  text-cream/80 hover:border-rose hover:text-rose transition-all duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>

          <button
            onClick={scrollTop}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center
              text-cream/80 hover:border-rose hover:text-rose transition-all duration-200"
          >
            <ArrowUp size={18} />
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center">
          <p className="text-cream/80 text-xs font-medium tracking-widest uppercase">
            Crafted with love & logic by{" "}
            <span className="text-rose font-bold">Mishika</span>
          </p>
          <p className="text-cream/60 text-xs italic font-medium">
            Pink. Powerful. Programmable. &nbsp;✦
          </p>
        </div>
      </div>
    </footer>
  );
}
