import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        terminal: {
          bg: "#1a1d23",
          bgLight: "#262a33",
          border: "#2d3139",
          cyan: "#00d9ff",
          cyanDark: "#00a8cc",
          green: "#00ff85",
          greenDark: "#00cc6a",
          text: "#e4e6eb",
          textMuted: "#9ca3af",
          prompt: "#ff6b9d",
          command: "#ffd93d",
          error: "#ff4757",
          success: "#1dd1a1",
        },
        light: {
          bg: "#ffffff",
          bgLight: "#f9fafb",
          border: "#e5e7eb",
          text: "#111827",
          textMuted: "#6b7280",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "IBM Plex Mono", "Consolas", "Monaco", "monospace"],
      },
      animation: {
        "cursor-blink": "cursor-blink 1.2s ease-in-out infinite",
        "type": "type 2s steps(40, end)",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up": "slide-up 0.5s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        "cursor-blink": {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        "type": {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
