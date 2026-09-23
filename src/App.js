import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [barbieMode, setBarbieMode] = useState(false);
  const cursorRef = useRef(null);
  const ringRef = useRef(null);

  // Custom cursor
  useEffect(() => {
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursor-ring');
    let raf;
    let rx = 0, ry = 0, mx = 0, my = 0;

    const move = (e) => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.left = mx - 5 + 'px';
      cursor.style.top = my - 5 + 'px';
    };
    const animate = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx - 19 + 'px';
      ring.style.top = ry - 19 + 'px';
      raf = requestAnimationFrame(animate);
    };
    const hoverIn = () => document.body.classList.add('cursor-hover');
    const hoverOut = () => document.body.classList.remove('cursor-hover');

    window.addEventListener('mousemove', move);
    raf = requestAnimationFrame(animate);

    document.querySelectorAll('a, button, [data-hover]').forEach(el => {
      el.addEventListener('mouseenter', hoverIn);
      el.addEventListener('mouseleave', hoverOut);
    });

    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf);
    };
  }, [loading]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={barbieMode ? { filter: 'hue-rotate(340deg) saturate(1.3)' } : {}}>
      <AnimatePresence>
        {loading && <Loader key="loader" />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Navbar
            barbieMode={barbieMode}
            setBarbieMode={setBarbieMode}
          />
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Achievements />
          <Resume />
          <Contact />
          <Footer />
          <Chatbot />
        </motion.div>
      )}
    </div>
  );
}
