import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0A0E1A",
          light: "#10152A",
        },
        accent: {
          DEFAULT: "#6366F1", // indigo — the one accent color, used sparingly
          light: "#818CF8",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-slide-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "mesh-drift": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(4%, 6%) scale(1.05)" },
          "66%": { transform: "translate(-3%, 4%) scale(0.97)" },
        },
      },
      animation: {
        "fade-slide-up": "fade-slide-up 0.7s ease-out forwards",
        "mesh-drift": "mesh-drift 26s ease-in-out infinite",
        "mesh-drift-slow": "mesh-drift 32s ease-in-out infinite reverse",
      },
    },
  },
  plugins: [],
};
export default config;
