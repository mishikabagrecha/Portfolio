"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MUSIC_SRC = "/barbie-theme.mp3";
const DEFAULT_VOLUME = 0.3;

export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const audio = new Audio(MUSIC_SRC);
    audio.loop = true;
    audio.volume = DEFAULT_VOLUME;
    audio.preload = "auto";
    audioRef.current = audio;

    setVisible(true);

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggle = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().catch(() => { });
      setPlaying(true);
    }
  }, [playing]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="music-btn"
          initial={{ opacity: 0, y: 28, scale: 0.82 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 28, scale: 0.82 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          onClick={toggle}
          className={`music-toggle-v2 ${playing ? "playing" : ""}`}
          aria-label={playing ? "Pause music" : "Play vibe music"}
          data-hover
        >
          {/* Outer pulse rings when playing */}
          {playing && (
            <>
              <motion.span className="mt-pulse mt-pulse-1"
                animate={{ scale: [1, 1.6, 1], opacity: [0.45, 0, 0.45] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }} />
              <motion.span className="mt-pulse mt-pulse-2"
                animate={{ scale: [1, 2.0, 1], opacity: [0.25, 0, 0.25] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} />
              <motion.span className="mt-pulse mt-pulse-3"
                animate={{ scale: [1, 2.4, 1], opacity: [0.15, 0, 0.15] }}
                transition={{ duration: 4.0, repeat: Infinity, ease: "easeInOut", delay: 1.0 }} />
            </>
          )}

          {/* Inner glow when playing */}
          {playing && (
            <motion.span className="mt-glow"
              animate={{ opacity: [0.15, 0.55, 0.15] }}
              transition={{ duration: 2.0, repeat: Infinity, ease: "easeInOut" }} />
          )}

          {/* Music icon */}
          <motion.span className="mt-icon"
            animate={playing
              ? { rotate: [0, 6, -4, 6, 0], scale: [1, 1.1, 1.04, 1.1, 1] }
              : { rotate: 0, scale: 1 }
            }
            transition={{ duration: 1.8, repeat: playing ? Infinity : 0, ease: "easeInOut" }}
          >
            {playing ? "🎵" : "🎶"}
          </motion.span>

          {/* Waveform bars */}
          <div className="mt-bars" aria-hidden>
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`mt-bar ${playing ? "mt-bar-active" : ""}`} style={{
                animationDelay: `${i * 0.1}s`,
                animationDuration: `${0.6 + i * 0.15}s`,
              }} />
            ))}
          </div>

          {/* Label */}
          <span className="mt-label">
            {playing ? "Vibe On" : "Play Vibe"}
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
