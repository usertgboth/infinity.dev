import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Editorial Luxury palette — warm cream base, deep charcoal ink, single coral accent.
        bg: "#fbf8f3",
        surface: "#ffffff",
        ink: "#0a0a0b",
        text: "#111114",
        muted: "#5a5a63",
        subtle: "#9a9aa3",
        border: "rgba(15, 15, 17, 0.07)",
        borderStrong: "rgba(15, 15, 17, 0.12)",
        primary: "#ef3a5b",
        primaryDark: "#d4264a",
        coral: "#ff5a4a",
        success: "#16a34a",
        danger: "#dc2626",
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
        // Soft, diffused, daylight-source shadows. Inner highlights for depth.
        hairline: "inset 0 0 0 1px rgba(15,15,17,0.06)",
        soft: "0 1px 2px rgba(15,15,17,0.04), 0 8px 24px -8px rgba(15,15,17,0.06)",
        lifted: "0 2px 4px rgba(15,15,17,0.03), 0 30px 60px -20px rgba(15,15,17,0.10)",
        prompt:
          "inset 0 1px 0 rgba(255,255,255,0.9), 0 1px 2px rgba(15,15,17,0.04), 0 12px 28px -10px rgba(239,58,91,0.22), 0 40px 80px -30px rgba(239,58,91,0.12)",
        innerHi: "inset 0 1px 0 rgba(255,255,255,0.7)",
      },
      backgroundImage: {
        "grad-brand": "linear-gradient(135deg, #ef3a5b 0%, #ff5a4a 100%)",
        "grad-brand-soft":
          "linear-gradient(135deg, rgba(239,58,91,0.10) 0%, rgba(255,90,74,0.10) 100%)",
        "grad-hero":
          "radial-gradient(1100px 520px at 18% -15%, rgba(239,58,91,0.14), transparent 60%), radial-gradient(900px 460px at 92% -10%, rgba(255,90,74,0.16), transparent 60%), radial-gradient(700px 400px at 50% 115%, rgba(239,58,91,0.06), transparent 60%)",
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
