import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],  
  theme: {
    extend: {
      colors: {
        brand: {
          cream: "#F3EFE7", // page background
          sand:  "#D6C2A1", // header bar
          brown: "#6B4B3A", // accents/links
          gold:  "#C5A46D", // buttons/CTAs
          ink:   "#1C1C1C", // dark text
        },
      },
      container: {
        center: true,
        padding: "1rem",
        screens: { "2xl": "1200px" },
      },
    },
  },
  plugins: [],
};

export default config;
