import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Lovable-inspired warm palette
        bg: "#fdfaf6",          // cream background
        surface: "#ffffff",
        card: "#ffffff",
        ink: "#0e0e0f",         // near-black text
        text: "#1a1a1a",
        muted: "#6b7280",
        subtle: "#9ca3af",
        border: "#ececea",
        borderStrong: "#dad8d3",
        // Brand: coral → pink → orange gradient
        primary: "#ff4d6d",
        primaryDark: "#ef3a5b",
        coral: "#ff6f47",
        peach: "#ffb38a",
        success: "#16a34a",
        danger: "#dc2626",
        // Dark mode (used inside the builder)
        dark: "#0f0f10",
        darkSurface: "#161617",
        darkBorder: "#27272a",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      boxShadow: {
        // Soft, lifted Lovable-style shadows
        soft: "0 1px 2px rgba(15,15,16,0.04), 0 8px 24px -8px rgba(15,15,16,0.08)",
        lifted: "0 2px 4px rgba(15,15,16,0.04), 0 24px 48px -12px rgba(15,15,16,0.12)",
        prompt: "0 1px 0 rgba(255,255,255,0.6) inset, 0 8px 32px -4px rgba(255,77,109,0.18), 0 30px 60px -20px rgba(255,111,71,0.18)",
        glow: "0 0 0 4px rgba(255,77,109,0.10), 0 20px 40px -12px rgba(255,77,109,0.30)",
      },
      backgroundImage: {
        "grad-brand": "linear-gradient(135deg, #ff4d6d 0%, #ff6f47 100%)",
        "grad-brand-soft": "linear-gradient(135deg, rgba(255,77,109,0.12) 0%, rgba(255,111,71,0.12) 100%)",
        "grad-hero":
          "radial-gradient(1200px 600px at 20% -10%, rgba(255,77,109,0.18), transparent 55%), radial-gradient(1000px 500px at 90% 0%, rgba(255,179,138,0.25), transparent 55%), radial-gradient(800px 500px at 50% 110%, rgba(255,111,71,0.10), transparent 60%)",
        noise:
          "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>\")",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        shimmer: "shimmer 2s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: { "0%": { opacity: "0", transform: "translateY(8px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        shimmer: { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-6px)" } },
      },
    },
  },
  plugins: [],
} satisfies Config;
