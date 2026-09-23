"use client";
import { useEffect, useRef } from "react";

export default function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number;
    let W = window.innerWidth;
    let H = window.innerHeight;

    function resize() {
      if (!canvas) return;
      const parent = canvas.parentElement;
      W = parent ? parent.clientWidth || window.innerWidth : window.innerWidth;
      H = parent ? parent.clientHeight || window.innerHeight : window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener("resize", resize);

    let t = 0;

    // upward-drifting sparks
    const SPARK_COUNT = 40;
    const sparks: Array<{
      x: number;
      y: number;
      speed: number;
      r: number;
      drift: number;
    }> = [];

    for (let i = 0; i < SPARK_COUNT; i++) {
      sparks.push({
        x: Math.random() * W,
        y: H + Math.random() * H,
        speed: 0.15 + Math.random() * 0.35,
        r: Math.random() * 1.6 + 0.5,
        drift: (Math.random() - 0.5) * 0.2,
      });
    }

    // one wavy gradient "aurora" band
    function band(
      yBase: number,
      amp: number,
      freq: number,
      rgb: string,
      alpha: number,
      phase: number
    ) {
      if (!ctx) return;
      ctx.beginPath();
      ctx.moveTo(0, H);
      for (let x = 0; x <= W; x += 8) {
        const y =
          yBase +
          Math.sin(x * freq + t * 0.6 + phase) * amp +
          Math.sin(x * freq * 0.5 - t * 0.3 + phase) * amp * 0.5;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(W, H);
      ctx.closePath();
      const grad = ctx.createLinearGradient(0, yBase - amp * 2, 0, H);
      grad.addColorStop(0, `rgba(${rgb},${alpha})`);
      grad.addColorStop(1, `rgba(${rgb},0)`);
      ctx.fillStyle = grad;
      ctx.fill();
    }

    function draw() {
      if (!ctx) return;
      t += 0.01;

      const bg = ctx.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, "#170810");
      bg.addColorStop(1, "#0a0407");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      band(H * 0.35, 60, 0.004, "217,164,65", 0.16, 0);  // gold band
      band(H * 0.50, 80, 0.003, "212,83,126", 0.14, 2);  // pink band
      band(H * 0.65, 50, 0.005, "150,60,90",  0.12, 4);  // plum band

      for (let i = 0; i < sparks.length; i++) {
        const sp = sparks[i];
        sp.y -= sp.speed;
        sp.x += sp.drift;
        if (sp.y < -10) {
          sp.y = H + 10;
          sp.x = Math.random() * W;
        }
        const tw = 0.5 + 0.5 * Math.sin(t * 40 + i * 10);
        ctx.fillStyle = `rgba(232,200,132,${0.25 + 0.5 * tw})`;
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.r, 0, Math.PI * 2);
        ctx.fill();
      }

      animFrameId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="aurora-canvas absolute inset-0 w-full h-full block pointer-events-none"
      aria-hidden="true"
    />
  );
}
