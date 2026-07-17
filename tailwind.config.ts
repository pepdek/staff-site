import type { Config } from "tailwindcss";

// "The trusted ledger" — see app/globals.css for the rationale behind
// these tokens (paper canvas + single emerald accent vs. the prior dark
// SaaS direction).
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F7F5EF",
        ink: {
          DEFAULT: "#14171F",
          muted: "#4A4E5A",
        },
        hairline: "#D8D5C9",
        "navy-deep": "#10151F",
        accent: {
          DEFAULT: "#0F6E4A", // emerald — the one accent color, used sparingly
          light: "#E1F0E8",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
        label: ["var(--font-label)", "ui-monospace", "monospace"],
      },
      keyframes: {
        "fade-slide-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-slide-up": "fade-slide-up 0.7s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
