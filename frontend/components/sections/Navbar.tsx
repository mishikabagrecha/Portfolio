"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FileDown } from "lucide-react";
import { personal } from "@/lib/data";

const links = [
  { label:"About",        href:"#about" },
  { label:"Skills",       href:"#skills" },
  { label:"Projects",     href:"#projects" },
  { label:"Achievements", href:"#achievements" },
  { label:"Contact",      href:"#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior:"smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y:-80, opacity:0 }}
        animate={{ y:0, opacity:1 }}
        transition={{ duration:0.7, ease:"easeOut" }}
        className={`fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between transition-all duration-300
          ${scrolled
            ? "bg-cream/95 backdrop-blur-xl border-b border-rose/15 shadow-sm py-3 px-8 md:px-12"
            : "bg-[#170810]/70 backdrop-blur-md border-b border-rose/20 py-4 px-8 md:px-14"}`}
      >
        {/* Brand */}
        <a
          href={personal.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="font-playfair text-2xl font-bold text-rose italic select-none hover:opacity-80 transition-opacity cursor-pointer inline-block"
          aria-label="Mishika on LinkedIn"
        >
          Mishika.
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-8 list-none items-center">
          {links.map(l => (
            <li key={l.href}>
              <button
                onClick={() => scrollTo(l.href)}
                className={`text-[0.74rem] tracking-[0.14em] uppercase font-semibold hover:text-rose transition-colors relative group ${
                  scrolled ? "text-charcoal" : "text-cream/90"
                }`}
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose group-hover:w-full transition-all duration-300" />
              </button>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          className={`md:hidden p-1 transition-colors ${scrolled ? "text-charcoal" : "text-cream"}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity:0, y:-10 }}
            animate={{ opacity:1, y:0 }}
            exit={{ opacity:0, y:-10 }}
            className="fixed top-[4.2rem] left-0 right-0 z-[999] bg-cream/98 backdrop-blur-xl
              border-b border-rose/15 px-8 py-6 flex flex-col gap-4 shadow-lg"
          >
            {links.map(l => (
              <button key={l.href} onClick={() => scrollTo(l.href)}
                className="text-sm font-semibold text-charcoal hover:text-rose text-left transition-colors">
                {l.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

