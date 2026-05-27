import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a0f",
        surface: "#11111a",
        card: "#161622",
        border: "#23233a",
        muted: "#7a7a93",
        text: "#f5f5fa",
        primary: "#7c5cff",
        primaryHover: "#9479ff",
        accent: "#ff6ec4",
        success: "#22c55e",
        danger: "#ef4444",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      boxShadow: {
        glow: "0 0 80px -10px rgba(124, 92, 255, 0.45)",
        card: "0 1px 0 rgba(255,255,255,0.04) inset, 0 8px 32px rgba(0,0,0,0.4)",
      },
      backgroundImage: {
        "grad-primary": "linear-gradient(135deg, #7c5cff 0%, #ff6ec4 100%)",
        "grad-radial": "radial-gradient(1200px 600px at 20% -10%, rgba(124,92,255,0.25), transparent 60%), radial-gradient(900px 500px at 90% 10%, rgba(255,110,196,0.18), transparent 60%)",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: { "0%": { opacity: "0", transform: "translateY(8px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        shimmer: { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
      },
    },
  },
  plugins: [],
} satisfies Config;
