import type { Config } from "tailwindcss";

/**
 * Design tokens — light pink pastel "birthday scrapbook" system.
 * Raw CSS custom properties live in app/globals.css; this maps them into
 * Tailwind so components can use e.g. `bg-blush-100 text-ink`.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blush: {
          50: "#FFF5F8",
          100: "#FCE4EE",
          200: "#F8C7DB",
          300: "#F2A0C0",
          400: "#E87DA9",
          500: "#D55E8F",
          600: "#B03A66",
          700: "#8E2C50",
        },
        ink: {
          DEFAULT: "#4A3540",
          soft: "#8E6E80",
        },
        lavender: "#DCCBF3",
        peach: "#FBD9C4",
        mint: "#CDEDDA",
        sky: "#CFE6F7",
        butter: "#FCEFC0",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-rounded", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "ui-rounded", "system-ui", "sans-serif"],
        hand: ["var(--font-hand)", "cursive"],
      },
      borderRadius: {
        xl2: "1.75rem",
      },
    },
  },
  plugins: [],
};

export default config;
