import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // v0/Lovable/Emergent dark palette — near-black, refined zinc, single coral accent.
        bg: "#09090b",        // deepest layer (page)
        surface: "#0c0c0f",   // panels
        elevated: "#131318",  // raised cards
        ink: "#fafafa",
        text: "#f4f4f5",
        muted: "#9a9aa3",
        subtle: "#5d5d68",
        border: "rgba(255, 255, 255, 0.07)",
        borderStrong: "rgba(255, 255, 255, 0.12)",
        primary: "#ff5a7a",
        primaryDark: "#e0436b",
        coral: "#ff7a59",
        success: "#22c55e",
        danger: "#ef4444",
      },
      fontFamily: {
        sans: ['"Geist"', "ui-sans-serif", "system-ui", "sans-serif"],
        display: ['"Geist"', "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ['"Instrument Serif"', "Georgia", "serif"],
        mono: ['"Geist Mono"', "ui-monospace", "monospace"],
      },
      letterSpacing: {
        "tightest-2": "-0.04em",
      },
      boxShadow: {
        hairline: "inset 0 0 0 1px rgba(255,255,255,0.06)",
        soft: "0 1px 0 rgba(255,255,255,0.04) inset, 0 1px 2px rgba(0,0,0,0.4), 0 12px 24px -12px rgba(0,0,0,0.45)",
        lifted: "0 1px 0 rgba(255,255,255,0.04) inset, 0 24px 60px -20px rgba(0,0,0,0.7)",
        prompt:
          "inset 0 1px 0 rgba(255,255,255,0.06), inset 0 0 0 1px rgba(255,255,255,0.04), 0 0 0 1px rgba(255,90,122,0.0), 0 30px 80px -30px rgba(255,90,122,0.45), 0 40px 120px -50px rgba(255,122,89,0.25)",
        innerHi: "inset 0 1px 0 rgba(255,255,255,0.10)",
        glow: "0 0 0 1px rgba(255,90,122,0.30), 0 12px 40px -8px rgba(255,90,122,0.45)",
      },
      backgroundImage: {
        "grad-brand": "linear-gradient(135deg, #ff5a7a 0%, #ff7a59 100%)",
        "grad-brand-soft":
          "linear-gradient(135deg, rgba(255,90,122,0.18) 0%, rgba(255,122,89,0.18) 100%)",
        "grad-hero":
          "radial-gradient(900px 500px at 20% 20%, rgba(255,90,122,0.20), transparent 60%), radial-gradient(900px 600px at 85% 10%, rgba(255,122,89,0.18), transparent 65%), radial-gradient(700px 500px at 50% 110%, rgba(120,72,255,0.10), transparent 70%)",
        "grad-aurora":
          "conic-gradient(from 180deg at 50% 50%, rgba(255,90,122,0.18), rgba(255,122,89,0.14), rgba(120,72,255,0.10), rgba(255,90,122,0.18))",
      },
      transitionTimingFunction: {
        "ease-out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "ease-spring": "cubic-bezier(0.32, 0.72, 0, 1)",
      },
      animation: {
        "fade-in": "fadeIn 600ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "rise": "rise 800ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "slide-up": "slideUp 500ms cubic-bezier(0.32, 0.72, 0, 1) both",
        "marquee": "marquee 40s linear infinite",
        "pulse-soft": "pulseSoft 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        rise: {
          "0%": { opacity: "0", transform: "translateY(16px)", filter: "blur(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)", filter: "blur(0)" },
        },
        slideUp: { "0%": { opacity: "0", transform: "translateY(8px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        pulseSoft: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0.55" } },
      },
    },
  },
  plugins: [],
} satisfies Config;
