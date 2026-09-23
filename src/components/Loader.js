import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const styles = {
  overlay: {
    position: 'fixed', inset: 0, background: '#1a1014',
    zIndex: 999999, display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
  },
  logo: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(3rem, 8vw, 5rem)',
    color: '#fdf6f0', letterSpacing: '0.06em',
    marginBottom: '0.4rem',
  },
  logoSpan: { color: '#c9748a', fontStyle: 'italic' },
  tag: {
    color: '#c9748a', fontSize: '0.78rem',
    letterSpacing: '0.4em', textTransform: 'uppercase',
  },
  barWrap: {
    width: '220px', height: '1px',
    background: 'rgba(255,255,255,0.1)',
    marginTop: '2.5rem', overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #c9748a, #c9a96e)',
  },
  pct: {
    color: 'rgba(253,246,240,0.3)', fontSize: '0.72rem',
    letterSpacing: '0.2em', marginTop: '1rem',
  },
  sparkle: {
    position: 'absolute', fontSize: '1rem',
    color: '#c9748a', opacity: 0.3,
  },
};

const sparklePositions = [
  { top: '15%', left: '10%' }, { top: '25%', right: '15%' },
  { bottom: '20%', left: '20%' }, { bottom: '30%', right: '10%' },
  { top: '50%', left: '5%' }, { top: '45%', right: '5%' },
];

export default function Loader() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPct(p => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + Math.floor(Math.random() * 8) + 3;
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      style={styles.overlay}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Sparkles */}
      {sparklePositions.map((pos, i) => (
        <motion.span
          key={i} style={{ ...styles.sparkle, ...pos }}
          animate={{ opacity: [0.1, 0.5, 0.1], scale: [1, 1.4, 1] }}
          transition={{ duration: 2 + i * 0.3, repeat: Infinity }}
        >✦</motion.span>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div style={styles.logo}>
          M<span style={styles.logoSpan}>i</span>shika
        </div>
      </motion.div>

      <motion.div
        style={styles.tag}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Pretty Smart.
      </motion.div>

      <motion.div
        style={styles.barWrap}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          style={styles.barFill}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(pct, 100)}%` }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>

      <motion.div
        style={styles.pct}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {Math.min(pct, 100)}%
      </motion.div>
    </motion.div>
  );
}
