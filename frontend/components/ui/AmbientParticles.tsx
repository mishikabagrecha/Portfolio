"use client";
import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  char: string;
  color: string;
  life: number;
  maxLife: number;
}

const CHARS  = ["✦", "✧", "◇", "·", "✦", "◦", "✧"];
const COLORS = [
  "rgba(201,116,138,",
  "rgba(201,169,110,",
  "rgba(212,197,232,",
  "rgba(183,110,121,",
];

interface AmbientParticlesProps {
  count?: number;
}

export default function AmbientParticles({ count = 16 }: AmbientParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = canvas.offsetWidth;
    let H = canvas.offsetHeight;
    canvas.width  = W;
    canvas.height = H;

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = W;
      canvas.height = H;
    };
    window.addEventListener("resize", resize);

    const particles: Particle[] = [];

    function spawn(): Particle {
      const maxLife = 180 + Math.random() * 220;
      return {
        x:       Math.random() * W,
        y:       Math.random() * H,
        vx:      (Math.random() - 0.5) * 0.35,
        vy:      -0.3 - Math.random() * 0.5,
        alpha:   0,
        size:    8 + Math.random() * 10,
        char:    CHARS[Math.floor(Math.random() * CHARS.length)],
        color:   COLORS[Math.floor(Math.random() * COLORS.length)],
        life:    0,
        maxLife,
      };
    }

    for (let i = 0; i < count; i++) {
      const p = spawn();
      p.life = Math.random() * p.maxLife; // stagger initial ages
      particles.push(p);
    }

    let raf: number;

    function draw() {
      ctx!.clearRect(0, 0, W, H);
      for (const p of particles) {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

        // fade in / fade out
        const progress = p.life / p.maxLife;
        p.alpha = progress < 0.15
          ? progress / 0.15
          : progress > 0.75
          ? (1 - progress) / 0.25
          : 1;

        ctx!.font       = `${p.size}px serif`;
        ctx!.fillStyle  = `${p.color}${(p.alpha * 0.55).toFixed(2)})`;
        ctx!.fillText(p.char, p.x, p.y);

        if (p.life >= p.maxLife) {
          Object.assign(p, spawn());
          p.life = 0;
        }
      }
      raf = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
      aria-hidden
    />
  );
}
