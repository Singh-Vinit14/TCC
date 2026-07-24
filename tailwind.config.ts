import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        pitch: {
          950: "#07130d",
          900: "#0a1b12",
          800: "#0f2a1b",
          700: "#15452b"
        },
        turf: "#10b981",
        gold: "#f6c85f"
      },
      boxShadow: {
        glow: "0 0 38px rgba(16,185,129,.22)",
        gold: "0 0 32px rgba(246,200,95,.2)"
      },
      backgroundImage: {
        stadium:
          "radial-gradient(circle at 50% 0%, rgba(246,200,95,.25), transparent 24%), linear-gradient(135deg, rgba(7,19,13,.94), rgba(10,27,18,.88))"
      }
    }
  },
  plugins: []
};

export default config;
