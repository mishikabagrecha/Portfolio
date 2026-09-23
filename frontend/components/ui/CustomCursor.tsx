"use client";
import { useEffect, useRef } from "react";

export function CustomCursor() {
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Don't render cursor on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = document.createElement("div");
    const ring   = document.createElement("div");
    cursor.id = "cursor";
    ring.id   = "cursor-ring";
    document.body.appendChild(cursor);
    document.body.appendChild(ring);

    let mx = 0, my = 0, rx = 0, ry = 0;
    let raf: number;

    /* ═══════════════════════════════════════════════════════
       MAGICAL TRAIL CANVAS — Soft glowing sparkle particles
       Performance-optimised: single canvas, object pool
    ═══════════════════════════════════════════════════════ */
    const trailCanvas = document.createElement("canvas");
    trailCanvas.style.cssText =
      "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:99996;";
    document.body.appendChild(trailCanvas);
    const tctx = trailCanvas.getContext("2d")!;
    let CW = window.innerWidth, CH = window.innerHeight;
    trailCanvas.width = CW;
    trailCanvas.height = CH;

    const onResize = () => {
      CW = window.innerWidth;
      CH = window.innerHeight;
      trailCanvas.width = CW;
      trailCanvas.height = CH;
    };
    window.addEventListener("resize", onResize);

    /* Trail particle pool */
    interface TrailPart {
      x: number; y: number;
      vx: number; vy: number;
      size: number; alpha: number;
      life: number; maxLife: number;
      hue: number; sat: number; lum: number;
      active: boolean;
      type: 0 | 1 | 2; // 0=glow, 1=sparkle, 2=dust
    }

    const POOL = 120;
    const pool: TrailPart[] = [];
    for (let i = 0; i < POOL; i++) {
      pool.push({
        x: 0, y: 0, vx: 0, vy: 0,
        size: 0, alpha: 0, life: 0, maxLife: 0,
        hue: 340, sat: 50, lum: 70, active: false, type: 0,
      });
    }

    let poolIdx = 0;
    function emit(x: number, y: number, count: number) {
      for (let i = 0; i < count; i++) {
        const p = pool[poolIdx % POOL];
        poolIdx++;

        const angle = Math.random() * Math.PI * 2;
        const speed = 0.3 + Math.random() * 1.2;
        const typeRoll = Math.random();
        const type: 0 | 1 | 2 = typeRoll < 0.45 ? 0 : typeRoll < 0.8 ? 1 : 2;

        // Color palette: pink, lavender, rose-gold, soft gold
        const hues = [340, 280, 350, 320, 38];
        const h = hues[Math.floor(Math.random() * hues.length)];

        p.x = x + (Math.random() - 0.5) * 6;
        p.y = y + (Math.random() - 0.5) * 6;
        p.vx = Math.cos(angle) * speed;
        p.vy = Math.sin(angle) * speed - 0.3;
        p.size = type === 1 ? 1 + Math.random() * 1.8 : 1.5 + Math.random() * 3;
        p.alpha = 0.7 + Math.random() * 0.3;
        p.life = 0;
        p.maxLife = type === 0 ? 30 + Math.random() * 25 : 20 + Math.random() * 30;
        p.hue = h;
        p.sat = type === 2 ? 30 + Math.random() * 20 : 45 + Math.random() * 35;
        p.lum = 68 + Math.random() * 22;
        p.active = true;
        p.type = type;
      }
    }

    /* ── Draw trail particles ─────────────────────────── */
    function drawTrail() {
      tctx.clearRect(0, 0, CW, CH);

      for (const p of pool) {
        if (!p.active) continue;
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;

        const progress = p.life / p.maxLife;
        const fade = progress < 0.15
          ? progress / 0.15
          : 1 - ((progress - 0.15) / 0.85);
        const a = p.alpha * Math.max(fade, 0);

        if (a <= 0.01) { p.active = false; continue; }

        if (p.type === 1) {
          // Sparkle — tiny 4-point star
          const s = p.size;
          tctx.save();
          tctx.translate(p.x, p.y);
          tctx.rotate(p.life * 0.08);

          // Glow
          const g = tctx.createRadialGradient(0, 0, 0, 0, 0, s * 4);
          g.addColorStop(0, `hsla(${p.hue}, ${p.sat}%, ${p.lum}%, ${a * 0.5})`);
          g.addColorStop(0.4, `hsla(${p.hue}, ${p.sat}%, ${p.lum}%, ${a * 0.12})`);
          g.addColorStop(1, `hsla(${p.hue}, ${p.sat}%, ${p.lum}%, 0)`);
          tctx.fillStyle = g;
          tctx.beginPath();
          tctx.arc(0, 0, s * 4, 0, Math.PI * 2);
          tctx.fill();

          // Star shape
          tctx.fillStyle = `hsla(${p.hue}, ${Math.min(p.sat + 15, 90)}%, ${Math.min(p.lum + 10, 95)}%, ${a * 0.85})`;
          tctx.beginPath();
          for (let j = 0; j < 4; j++) {
            const ang = (j / 4) * Math.PI * 2;
            tctx.lineTo(Math.cos(ang) * s * 1.8, Math.sin(ang) * s * 1.8);
            tctx.lineTo(Math.cos(ang + Math.PI / 4) * s * 0.35, Math.sin(ang + Math.PI / 4) * s * 0.35);
          }
          tctx.closePath();
          tctx.fill();

          // Core dot
          tctx.fillStyle = `hsla(${p.hue}, 20%, 96%, ${a})`;
          tctx.beginPath();
          tctx.arc(0, 0, s * 0.3, 0, Math.PI * 2);
          tctx.fill();
          tctx.restore();

        } else {
          // Glow / Dust — soft radial circle
          const r = p.size * (p.type === 0 ? 3 : 2);
          const g = tctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
          g.addColorStop(0, `hsla(${p.hue}, ${p.sat}%, ${p.lum}%, ${a * (p.type === 0 ? 0.35 : 0.5)})`);
          g.addColorStop(0.4, `hsla(${p.hue}, ${p.sat}%, ${p.lum}%, ${a * 0.1})`);
          g.addColorStop(1, `hsla(${p.hue}, ${p.sat}%, ${p.lum}%, 0)`);
          tctx.fillStyle = g;
          tctx.beginPath();
          tctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          tctx.fill();
        }
      }
    }

    /* ── Mouse move handler ───────────────────────────── */
    let emitTimer = 0;
    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      mx = e.clientX;
      my = e.clientY;
      lastPos.current = { x: mx, y: my };

      cursor.style.left = mx - 5 + "px";
      cursor.style.top  = my - 5 + "px";

      // Emit trail particles based on speed
      const now = Date.now();
      if (speed > 3 && now - emitTimer > 25) {
        emitTimer = now;
        const count = speed > 20 ? 4 : speed > 10 ? 3 : 2;
        emit(mx, my, count);
      }
    };

    /* ── Animation loop ───────────────────────────────── */
    const animate = () => {
      rx += (mx - rx) * 0.08;
      ry += (my - ry) * 0.08;
      ring.style.left = rx - 19 + "px";
      ring.style.top  = ry - 19 + "px";
      drawTrail();
      raf = requestAnimationFrame(animate);
    };

    /* ── Hover detection ──────────────────────────────── */
    const hoverIn  = () => document.body.classList.add("cur-hover");
    const hoverOut = () => document.body.classList.remove("cur-hover");

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(animate);

    const observer = new MutationObserver(() => {
      document.querySelectorAll("a,button,[data-hover]").forEach(el => {
        if (el.hasAttribute("data-no-hover")) return;
        el.removeEventListener("mouseenter", hoverIn);
        el.removeEventListener("mouseleave", hoverOut);
        el.addEventListener("mouseenter", hoverIn);
        el.addEventListener("mouseleave", hoverOut);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
      observer.disconnect();
      cursor.remove();
      ring.remove();
      trailCanvas.remove();
    };
  }, []);

  return null;
}
