"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

/* ═══════════════════════════════════════════════════════════════
   MAGICAL PARTICLE CANVAS — Cinematic sparkle field
═══════════════════════════════════════════════════════════════ */
function MagicalParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let W = window.innerWidth, H = window.innerHeight;
    canvas.width = W; canvas.height = H;
    const resize = () => { W = window.innerWidth; H = window.innerHeight; canvas.width = W; canvas.height = H; };
    window.addEventListener("resize", resize);
    interface P { x:number;y:number;vx:number;vy:number;size:number;alpha:number;life:number;maxLife:number;hue:number;sat:number;lum:number;type:"sparkle"|"dust"|"ember";rotation:number;rotSpeed:number;pulsePhase:number; }
    const S=35,D=20,E=12;
    function ss():P{const m=250+Math.random()*350;return{x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.3,vy:-.15-Math.random()*.5,size:1+Math.random()*2.5,alpha:0,life:0,maxLife:m,hue:[340,35,320,280,48][Math.floor(Math.random()*5)],sat:50+Math.random()*30,lum:65+Math.random()*25,type:"sparkle",rotation:Math.random()*Math.PI*2,rotSpeed:(Math.random()-.5)*.02,pulsePhase:Math.random()*Math.PI*2};}
    function sd():P{const m=400+Math.random()*500;return{x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.15,vy:-.05-Math.random()*.15,size:2+Math.random()*5,alpha:0,life:0,maxLife:m,hue:340,sat:20+Math.random()*20,lum:70+Math.random()*20,type:"dust",rotation:0,rotSpeed:0,pulsePhase:Math.random()*Math.PI*2};}
    function se():P{const m=300+Math.random()*400;return{x:W*.3+Math.random()*W*.4,y:H*.8+Math.random()*H*.2,vx:(Math.random()-.5)*.5,vy:-.4-Math.random()*.8,size:1+Math.random()*1.5,alpha:0,life:0,maxLife:m,hue:30+Math.random()*20,sat:80+Math.random()*20,lum:55+Math.random()*20,type:"ember",rotation:0,rotSpeed:(Math.random()-.5)*.05,pulsePhase:Math.random()*Math.PI*2};}
    const ps:P[]=[];
    for(let i=0;i<S;i++){const p=ss();p.life=Math.random()*p.maxLife;ps.push(p);}
    for(let i=0;i<D;i++){const p=sd();p.life=Math.random()*p.maxLife;ps.push(p);}
    for(let i=0;i<E;i++){const p=se();p.life=Math.random()*p.maxLife;ps.push(p);}
    let raf:number,time=0;
    function draw(){
      ctx!.clearRect(0,0,W,H);time+=.016;
      for(const p of ps){
        p.life++;p.x+=p.vx;p.y+=p.vy;p.rotation+=p.rotSpeed;
        const pr=p.life/p.maxLife,fi=Math.min(pr/.12,1),fo=pr>.75?(1-pr)/.25:1;
        p.alpha=fi*fo;
        if(p.type==="sparkle"){
          const pulse=.6+Math.sin(time*3+p.pulsePhase)*.4,fa=p.alpha*pulse,s=p.size;
          ctx!.save();ctx!.translate(p.x,p.y);ctx!.rotate(p.rotation);
          const g=ctx!.createRadialGradient(0,0,0,0,0,s*6);
          g.addColorStop(0,`hsla(${p.hue},${p.sat}%,${p.lum}%,${fa*.5})`);
          g.addColorStop(.3,`hsla(${p.hue},${p.sat}%,${p.lum}%,${fa*.15})`);
          g.addColorStop(1,`hsla(${p.hue},${p.sat}%,${p.lum}%,0)`);
          ctx!.fillStyle=g;ctx!.beginPath();ctx!.arc(0,0,s*6,0,Math.PI*2);ctx!.fill();
          ctx!.fillStyle=`hsla(${p.hue},${p.sat+20}%,${Math.min(p.lum+20,95)}%,${fa*.9})`;
          ctx!.beginPath();
          for(let i=0;i<4;i++){const a=(i/4)*Math.PI*2,oR=s*2.5,iR=s*.5;ctx!.lineTo(Math.cos(a)*oR,Math.sin(a)*oR);ctx!.lineTo(Math.cos(a+Math.PI/4)*iR,Math.sin(a+Math.PI/4)*iR);}
          ctx!.closePath();ctx!.fill();
          ctx!.fillStyle=`hsla(${p.hue},30%,95%,${fa})`;ctx!.beginPath();ctx!.arc(0,0,s*.4,0,Math.PI*2);ctx!.fill();
          ctx!.restore();
        }else if(p.type==="dust"){
          const g=ctx!.createRadialGradient(p.x,p.y,0,p.x,p.y,p.size*3);
          g.addColorStop(0,`hsla(${p.hue},${p.sat}%,${p.lum}%,${p.alpha*.25})`);
          g.addColorStop(.5,`hsla(${p.hue},${p.sat}%,${p.lum}%,${p.alpha*.08})`);
          g.addColorStop(1,`hsla(${p.hue},${p.sat}%,${p.lum}%,0)`);
          ctx!.fillStyle=g;ctx!.beginPath();ctx!.arc(p.x,p.y,p.size*3,0,Math.PI*2);ctx!.fill();
        }else{
          for(let t=0;t<3;t++){const ta=p.alpha*(1-t/3)*.6,tx=p.x-p.vx*t*4,ty=p.y-p.vy*t*4,ts=p.size*(1-t/3*.5);
          const g=ctx!.createRadialGradient(tx,ty,0,tx,ty,ts*3);
          g.addColorStop(0,`hsla(${p.hue},${p.sat}%,${p.lum}%,${ta})`);
          g.addColorStop(.5,`hsla(${p.hue},${p.sat}%,${Math.max(p.lum-15,40)}%,${ta*.4})`);
          g.addColorStop(1,`hsla(${p.hue},${p.sat}%,${p.lum}%,0)`);
          ctx!.fillStyle=g;ctx!.beginPath();ctx!.arc(tx,ty,ts*3,0,Math.PI*2);ctx!.fill();}
        }
        if(p.life>=p.maxLife){if(p.type==="sparkle")Object.assign(p,ss());else if(p.type==="dust")Object.assign(p,sd());else Object.assign(p,se());p.life=0;}
      }
      raf=requestAnimationFrame(draw);
    }
    draw();
    return()=>{cancelAnimationFrame(raf);window.removeEventListener("resize",resize);};
  },[]);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{zIndex:2}} aria-hidden />;
}

/* ═══════════════════════════════════════════════════════════════
   MAIN LOADER — Scroll → Bright Light Flash → Done
   (No door animation — instant light burst on enter)
═══════════════════════════════════════════════════════════════ */
export default function Loader({ onDone }: { onDone: () => void }) {
  const [scrollOpen, setScrollOpen] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [btnVisible, setBtnVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const doneRef = useRef(false);

  const triggerDone = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    onDone();
  }, [onDone]);

  useEffect(() => {
    const t1 = setTimeout(() => setScrollOpen(true), 700);
    const t2 = setTimeout(() => setTextVisible(true), 1200);
    const t3 = setTimeout(() => setBtnVisible(true), 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const handleEnter = useCallback(() => {
    if (isExiting) return;
    setIsExiting(true);
    // Hide text & button quickly
    setBtnVisible(false);
    setTimeout(() => setTextVisible(false), 200);
    // Scroll closes briefly
    setTimeout(() => setScrollOpen(false), 400);
    // Bright light flash appears at 800ms, lasts ~1s, then done
    setTimeout(() => setShowFlash(true), 800);
    setTimeout(triggerDone, 1800);
  }, [isExiting, triggerDone]);

  const handleSkip = useCallback(() => {
    if (doneRef.current) return;
    setIsExiting(true);
    setTimeout(triggerDone, 400);
  }, [triggerDone]);

  return (
    <motion.div
      className="fantasy-loader"
      exit={{
        opacity: 0, scale: 1.06,
        filter: "blur(20px) brightness(1.3)",
        transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      <div className="loader-bg-layer loader-bg-1" />
      <div className="loader-bg-layer loader-bg-2" />
      <div className="loader-bg-layer loader-bg-3" />
      <div className="loader-vignette" />
      <MagicalParticles />
      <div className="fantasy-orb fantasy-orb-1" />
      <div className="fantasy-orb fantasy-orb-2" />
      <div className="fantasy-orb fantasy-orb-3" />
      <div className="fantasy-orb fantasy-orb-4" />

      {/* Skip Intro */}
      <AnimatePresence>
        {!isExiting && (
          <motion.button
            id="skip-intro-btn"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ delay: 2.5, duration: 0.6 }}
            onClick={handleSkip} className="fantasy-skip-btn" aria-label="Skip intro"
          >
            <span className="skip-text">Skip Intro</span>
            <span className="skip-arrow">›</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════
          SCROLL (seamless parchment)
      ═══════════════════════════════════════════════════ */}
      <AnimatePresence>
        {!showFlash && (
          <motion.div
            className="fantasy-scroll-container"
            exit={{ opacity: 0, scale: 0.92, filter: "blur(12px)", transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
          >
            {/* Soft ambient glow behind scroll */}
            <motion.div
              className="scroll-glow-shadow"
              animate={scrollOpen ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 2.0, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Scroll with cinematic parchment unroll */}
            <motion.div
              className="fantasy-scroll-img-wrap"
              initial={{ clipPath: "inset(48% 3% 48% 3%)", opacity: 0, scale: 0.95 }}
              animate={
                scrollOpen
                  ? { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, scale: 1 }
                  : { clipPath: "inset(48% 3% 48% 3%)", opacity: 0, scale: 0.95 }
              }
              transition={{
                clipPath: { duration: 2.8, ease: [0.12, 0.8, 0.2, 1] },
                opacity: { duration: 1.6, ease: "easeOut" },
                scale: { duration: 2.8, ease: [0.12, 0.8, 0.2, 1] },
              }}
            >
              <Image
                src="/scroll.png"
                alt="Royal Invitation Scroll"
                width={500} height={499} priority
                className="fantasy-scroll-img select-none pointer-events-none"
              />

              {/* Interactive Enter the World button overlay over the parchment button */}
              <AnimatePresence>
                {btnVisible && (
                  <motion.button
                    key="enter-btn"
                    id="enter-world-btn"
                    data-no-hover
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    onClick={handleEnter}
                    aria-label="Enter the world"
                    style={{
                      position: "absolute",
                      left: "28.5%",
                      top: "66%",
                      width: "43%",
                      height: "9.5%",
                      borderRadius: "9999px",
                      cursor: "pointer",
                      zIndex: 20,
                      outline: "none",
                      border: "none",
                      background: "transparent",
                      boxShadow: "none",
                      WebkitTapHighlightColor: "transparent",
                    }}
                    className="focus:outline-none select-none"
                  />
                )}
              </AnimatePresence>

              {/* Interactive Wax Seal button overlay */}
              <AnimatePresence>
                {btnVisible && (
                  <motion.button
                    key="seal-btn"
                    id="enter-seal-btn"
                    data-no-hover
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    onClick={handleEnter}
                    aria-label="Enter via seal"
                    style={{
                      position: "absolute",
                      left: "45%",
                      top: "56.5%",
                      width: "10%",
                      height: "7.5%",
                      borderRadius: "50%",
                      cursor: "pointer",
                      zIndex: 20,
                      outline: "none",
                      border: "none",
                      background: "transparent",
                      boxShadow: "none",
                      WebkitTapHighlightColor: "transparent",
                    }}
                    className="focus:outline-none select-none"
                  />
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════
          BRIGHT LIGHT FLASH — 1 sec radiant burst
      ═══════════════════════════════════════════════════ */}
      <AnimatePresence>
        {showFlash && (
          <motion.div
            className="loader-light-flash"
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
