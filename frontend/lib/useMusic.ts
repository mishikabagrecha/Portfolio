"use client";
import { useRef, useState, useCallback, useEffect, createContext, useContext } from "react";

const MUSIC_SRC = "/barbie-theme.mp3";
const DEFAULT_VOLUME = 0.3;

/* ── Shared singleton audio — one instance for the whole app ── */
let globalAudio: HTMLAudioElement | null = null;
let globalReady = false;
const listeners = new Set<(playing: boolean) => void>();

function getAudio() {
  if (typeof window === "undefined") return null;
  if (!globalAudio) {
    globalAudio = new Audio(MUSIC_SRC);
    globalAudio.loop = true;
    globalAudio.volume = DEFAULT_VOLUME;
    globalAudio.preload = "auto";
    globalAudio.addEventListener("canplaythrough", () => { globalReady = true; });
  }
  return globalAudio;
}

function notifyAll(playing: boolean) {
  listeners.forEach((fn) => fn(playing));
}

export function useMusic() {
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const audio = getAudio();
    if (!audio) return;

    // Sync initial state
    setPlaying(!audio.paused);
    setReady(globalReady);

    const onReady = () => setReady(true);
    audio.addEventListener("canplaythrough", onReady);

    // Subscribe to cross-component sync
    const listener = (p: boolean) => setPlaying(p);
    listeners.add(listener);

    return () => {
      audio.removeEventListener("canplaythrough", onReady);
      listeners.delete(listener);
    };
  }, []);

  const play = useCallback(() => {
    const audio = getAudio();
    if (!audio) return;
    audio.play().catch(() => {});
    notifyAll(true);
  }, []);

  const pause = useCallback(() => {
    const audio = getAudio();
    if (!audio) return;
    audio.pause();
    notifyAll(false);
  }, []);

  const toggle = useCallback(() => {
    const audio = getAudio();
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => {});
      notifyAll(true);
    } else {
      audio.pause();
      notifyAll(false);
    }
  }, []);

  return { playing, ready, play, pause, toggle };
}
