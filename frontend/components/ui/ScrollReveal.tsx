"use client";
import { motion, type Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ReactNode } from "react";

type Variant = "fadeUp" | "fadeLeft" | "fadeRight" | "scaleIn" | "blurUp";

const variants: Record<Variant, Variants> = {
  fadeUp: {
    hidden:  { opacity: 0, y: 36, filter: "blur(6px)" },
    visible: { opacity: 1, y: 0,  filter: "blur(0px)" },
  },
  fadeLeft: {
    hidden:  { opacity: 0, x: -40, filter: "blur(4px)" },
    visible: { opacity: 1, x:   0, filter: "blur(0px)" },
  },
  fadeRight: {
    hidden:  { opacity: 0, x: 40, filter: "blur(4px)" },
    visible: { opacity: 1, x:  0, filter: "blur(0px)" },
  },
  scaleIn: {
    hidden:  { opacity: 0, scale: 0.88, filter: "blur(8px)" },
    visible: { opacity: 1, scale: 1,    filter: "blur(0px)" },
  },
  blurUp: {
    hidden:  { opacity: 0, y: 20, filter: "blur(12px)" },
    visible: { opacity: 1, y: 0,  filter: "blur(0px)"  },
  },
};

interface ScrollRevealProps {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}

export default function ScrollReveal({
  children,
  variant   = "fadeUp",
  delay     = 0,
  duration  = 0.7,
  className = "",
  threshold = 0.12,
}: ScrollRevealProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold });

  return (
    <motion.div
      ref={ref}
      variants={variants[variant]}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
