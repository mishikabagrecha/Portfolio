import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ barbieMode, setBarbieMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [recruiterModal, setRecruiterModal] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          padding: scrolled ? '0.8rem 3.5rem' : '1.15rem 3.5rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'rgba(253,246,240,0.88)',
          backdropFilter: 'blur(14px)',
          borderBottom: '1px solid rgba(201,116,138,0.15)',
          transition: 'padding 0.3s ease',
        }}
      >
        {/* Brand */}
        <span style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '1.45rem', color: '#c9748a', fontStyle: 'italic',
        }}>M.</span>

        {/* Desktop Links */}
        <ul style={{ display: 'flex', gap: '2.4rem', listStyle: 'none', margin: 0 }}
          className="nav-desktop">
          {navLinks.map(link => (
            <li key={link.href}>
              <button
                onClick={() => scrollTo(link.href)}
                style={{
                  background: 'none', border: 'none',
                  fontSize: '0.78rem', letterSpacing: '0.12em',
                  textTransform: 'uppercase', color: '#8a7075',
                  cursor: 'none', transition: 'color 0.2s',
                  padding: '4px 0', fontFamily: 'inherit',
                }}
                onMouseEnter={e => e.target.style.color = '#c9748a'}
                onMouseLeave={e => e.target.style.color = '#8a7075'}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Right buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button
            onClick={() => setBarbieMode(!barbieMode)}
            style={{
              background: 'rgba(255,255,255,0.6)',
              border: '1px solid rgba(201,116,138,0.25)',
              borderRadius: '50px', padding: '0.45rem 1rem',
              fontSize: '0.72rem', letterSpacing: '0.1em',
              textTransform: 'uppercase', color: '#c9748a',
              cursor: 'none', backdropFilter: 'blur(8px)',
              transition: 'all 0.2s', fontFamily: 'inherit',
            }}
            onMouseEnter={e => { e.target.style.background = '#c9748a'; e.target.style.color = '#fff'; }}
            onMouseLeave={e => { e.target.style.background = 'rgba(255,255,255,0.6)'; e.target.style.color = '#c9748a'; }}
          >
            {barbieMode ? '✦ Normal' : '✦ Barbie'}
          </button>

          <button
            onClick={() => setRecruiterModal(true)}
            style={{
              background: '#1a1014', color: '#fdf6f0',
              border: 'none', borderRadius: '50px',
              padding: '0.5rem 1.2rem', fontSize: '0.75rem',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              cursor: 'none', transition: 'background 0.2s',
              fontFamily: 'inherit',
            }}
            onMouseEnter={e => e.target.style.background = '#c9748a'}
            onMouseLeave={e => e.target.style.background = '#1a1014'}
          >
            Hire Me
          </button>
        </div>

        {/* Hamburger for mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none', background: 'none', border: 'none',
            fontSize: '1.4rem', cursor: 'none', color: '#1a1014',
          }}
          className="nav-ham"
        >☰</button>
      </motion.nav>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            position: 'fixed', top: '4.5rem', left: 0, right: 0,
            background: 'rgba(253,246,240,0.97)',
            backdropFilter: 'blur(14px)', zIndex: 999,
            padding: '1.5rem 2rem', display: 'flex',
            flexDirection: 'column', gap: '1.2rem',
            borderBottom: '1px solid rgba(201,116,138,0.15)',
          }}
        >
          {navLinks.map(link => (
            <button key={link.href} onClick={() => scrollTo(link.href)}
              style={{
                background: 'none', border: 'none',
                fontSize: '1rem', color: '#8a7075',
                textAlign: 'left', cursor: 'none',
                fontFamily: 'inherit', padding: '0.3rem 0',
              }}>
              {link.label}
            </button>
          ))}
        </motion.div>
      )}

      {/* Recruiter Modal */}
      {recruiterModal && (
        <div
          onClick={() => setRecruiterModal(false)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(26,16,20,0.6)',
            backdropFilter: 'blur(6px)',
            zIndex: 9999, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={e => e.stopPropagation()}
            style={{
              background: '#fdf6f0', borderRadius: '4px',
              padding: '2.5rem', maxWidth: '520px', width: '100%',
              border: '1px solid rgba(201,116,138,0.2)',
            }}
          >
            <div style={{ fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c9748a', marginBottom: '0.5rem' }}>✦ Recruiter Quick View</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', color: '#1a1014', marginBottom: '1.5rem' }}>Mishika — AI/ML Engineer</h2>
            {[
              ['Role', 'AI/ML Engineer · Full-Stack Capable'],
              ['Education', 'B.Tech Computer Science · 2025'],
              ['Top Skills', 'Python, TensorFlow, PyTorch, OpenCV, React, NLP'],
              ['Internships', '2 · Full-Stack + AI/ML Research'],
              ['Projects', '5+ end-to-end AI/ML systems shipped'],
              ['LeetCode', 'Knight Badge · 350+ problems solved'],
              ['Hackathon', 'National Finalist · Top 10 / 500+ teams'],
              ['Status', '✅ Actively looking for SDE / AI roles'],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', gap: '1rem', padding: '0.6rem 0', borderBottom: '1px solid rgba(201,116,138,0.1)' }}>
                <span style={{ color: '#8a7075', fontSize: '0.83rem', minWidth: '100px' }}>{k}</span>
                <span style={{ fontSize: '0.83rem', color: '#1a1014', fontWeight: 500 }}>{v}</span>
              </div>
            ))}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <a href="mailto:mishika@email.com" style={{
                background: '#1a1014', color: '#fdf6f0',
                padding: '0.7rem 1.5rem', borderRadius: '50px',
                fontSize: '0.78rem', textDecoration: 'none',
                letterSpacing: '0.1em', textTransform: 'uppercase',
              }}>Email Me</a>
              <button onClick={() => setRecruiterModal(false)}
                style={{
                  background: 'transparent', color: '#8a7075',
                  border: '1px solid rgba(201,116,138,0.3)',
                  padding: '0.7rem 1.5rem', borderRadius: '50px',
                  fontSize: '0.78rem', cursor: 'none',
                  fontFamily: 'inherit',
                }}>Close</button>
            </div>
          </motion.div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .nav-desktop { display: none !important; }
          .nav-ham { display: block !important; }
        }
      `}</style>
    </>
  );
}
