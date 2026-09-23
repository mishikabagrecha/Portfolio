import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        rose:      { DEFAULT: "#c9748a", light: "#e8a0b4", dark: "#a85570" },
        blush:     "#f4d4db",
        cream:     "#fdf6f0",
        lavender:  "#d4c5e8",
        gold:      "#c9a96e",
        charcoal:  "#1a1014",
        muted:     "#8a7075",
        // NEW premium palette
        nude:      "#f0e6dd",
        rosegold:  "#b76e79",
        champagne: "#f7e7ce",
        dustrose:  "#c49aab",
        plum:      "#2d1c24",
      },
      fontFamily: {
        playfair:  ["'Playfair Display'", "serif"],
        cormorant: ["'Cormorant Garamond'", "serif"],
        sans:      ["'DM Sans'", "sans-serif"],
      },
      backgroundImage: {
        "rose-gold":    "linear-gradient(135deg, #c9748a, #c9a96e)",
        "blush-lav":    "linear-gradient(135deg, #f4d4db, #d4c5e8)",
        "dark-card":    "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
        // NEW
        "luxury-hero":  "radial-gradient(ellipse 120% 80% at 50% -10%, #f4d4db 0%, #ead4ec 30%, #fdf6f0 70%)",
        "luxury-dark":  "linear-gradient(135deg, #1a1014 0%, #2d1c24 50%, #1a1014 100%)",
        "rose-shimmer": "linear-gradient(90deg, transparent, rgba(201,116,138,0.15), transparent)",
      },
      animation: {
        float:         "float 6s ease-in-out infinite",
        twinkle:       "twinkle 3s ease-in-out infinite",
        shimmer:       "shimmer 2.5s linear infinite",
        fadeUp:        "fadeUp 0.7s ease forwards",
        spin_slow:     "spin 12s linear infinite",
        // NEW
        "glow-pulse":  "glowPulse 3s ease-in-out infinite",
        "particle-float": "particleFloat 8s ease-in-out infinite",
        "letter-reveal": "letterReveal 0.5s ease forwards",
        "shimmer-border": "shimmerBorder 2s linear infinite",
        "scale-in":    "scaleIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards",
        "blur-in":     "blurIn 0.6s ease forwards",
        "music-pulse": "musicPulse 1.5s ease-in-out infinite",
        "orbit":       "orbit 8s linear infinite",
        wiggle:        "wiggle 1s ease-in-out 1",
      },
      keyframes: {
        float:   { "0%,100%": { transform: "translateY(0)" },        "50%": { transform: "translateY(-18px)" } },
        twinkle: { "0%,100%": { opacity: "0.2", transform: "scale(1)" }, "50%": { opacity: "0.8", transform: "scale(1.5)" } },
        shimmer: { "0%":  { backgroundPosition: "-200% center" },    "100%": { backgroundPosition: "200% center" } },
        fadeUp:  { from:  { opacity: "0", transform: "translateY(24px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        wiggle:  { "0%,100%": { transform: "rotate(-3deg)" },         "50%": { transform: "rotate(3deg)" } },
        // NEW
        glowPulse: {
          "0%,100%": { boxShadow: "0 0 20px rgba(201,116,138,0.2), 0 0 60px rgba(201,116,138,0.05)" },
          "50%":     { boxShadow: "0 0 40px rgba(201,116,138,0.45), 0 0 100px rgba(201,116,138,0.15)" },
        },
        particleFloat: {
          "0%":   { transform: "translateY(0) rotate(0deg)",   opacity: "0" },
          "10%":  { opacity: "1" },
          "90%":  { opacity: "1" },
          "100%": { transform: "translateY(-120px) rotate(360deg)", opacity: "0" },
        },
        letterReveal: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        shimmerBorder: {
          "0%":   { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.92)" },
          to:   { opacity: "1", transform: "scale(1)" },
        },
        blurIn: {
          from: { opacity: "0", filter: "blur(12px)", transform: "translateY(16px)" },
          to:   { opacity: "1", filter: "blur(0px)",  transform: "translateY(0)" },
        },
        musicPulse: {
          "0%,100%": { transform: "scale(1)" },
          "50%":     { transform: "scale(1.08)" },
        },
        orbit: {
          from: { transform: "rotate(0deg) translateX(60px) rotate(0deg)" },
          to:   { transform: "rotate(360deg) translateX(60px) rotate(-360deg)" },
        },
      },
      boxShadow: {
        glass:           "0 8px 32px rgba(201,116,138,0.12)",
        glow:            "0 0 30px rgba(201,116,138,0.25)",
        card:            "0 20px 60px rgba(26,16,20,0.08)",
        "card-hover":    "0 30px 80px rgba(201,116,138,0.18)",
        // NEW
        luxury:          "0 0 0 1px rgba(201,116,138,0.2), 0 25px 60px rgba(201,116,138,0.15), inset 0 1px 0 rgba(255,255,255,0.6)",
        "glow-lg":       "0 0 60px rgba(201,116,138,0.35), 0 0 120px rgba(201,116,138,0.1)",
        "glow-sm":       "0 0 15px rgba(201,116,138,0.4)",
        "inner-glow":    "inset 0 1px 0 rgba(255,255,255,0.5)",
        "cursor-glow":   "0 0 12px rgba(201,116,138,0.9), 0 0 24px rgba(201,116,138,0.5)",
      },
    },
  },
  plugins: [],
};
export default config;
