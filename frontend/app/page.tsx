"use client";
import { useState } from "react";
import Navbar         from "@/components/sections/Navbar";
import Hero           from "@/components/sections/Hero";
import FantasyQuote   from "@/components/sections/FantasyQuote";
import About          from "@/components/sections/About";
import Skills         from "@/components/sections/Skills";
import Projects       from "@/components/sections/Projects";
import Achievements   from "@/components/sections/Achievements";
import Resume         from "@/components/sections/Resume";
import Contact        from "@/components/sections/Contact";
import Footer         from "@/components/sections/Footer";
import Chatbot        from "@/components/ui/Chatbot";
import Loader         from "@/components/ui/Loader";

import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence onExitComplete={() => {}}>
        {loading && (
          <Loader key="loader" onDone={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0, filter: "blur(8px) brightness(1.3)", scale: 1.02 }}
          animate={{ opacity: 1, filter: "blur(0px) brightness(1)", scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Navbar />
          <main>
            <Hero />
            <FantasyQuote />
            <About />
            <Skills />
            <Projects />
            <Achievements />
            <Resume />
            <Contact />
          </main>
          <Footer />
          <Chatbot />
        </motion.div>
      )}
    </>
  );
}

