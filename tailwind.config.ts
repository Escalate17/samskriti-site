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
        bg: {
          dark: "#0a0a14",
          card: "rgba(255,255,255,0.03)",
          "card-hover": "rgba(255,255,255,0.06)",
        },
        saffron: {
          DEFAULT: "#FF8A3D",
          50: "#FFF3EB",
          400: "#FF9F5F",
          500: "#FF8A3D",
          600: "#E67530",
        },
        indigo: {
          DEFAULT: "#7C5CFF",
          400: "#9B80FF",
          500: "#7C5CFF",
          600: "#6344E0",
        },
        teal: {
          DEFAULT: "#36D7C4",
          400: "#5DE4D4",
          500: "#36D7C4",
          600: "#2BBAA9",
        },
        border: {
          DEFAULT: "rgba(255,255,255,0.08)",
          hover: "rgba(255,255,255,0.15)",
        },
        muted: {
          DEFAULT: "rgba(255,255,255,0.5)",
          strong: "rgba(255,255,255,0.7)",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
      },
      backgroundImage: {
        "gradient-brand":
          "linear-gradient(135deg, #FF8A3D 0%, #7C5CFF 50%, #36D7C4 100%)",
        "gradient-brand-reverse":
          "linear-gradient(135deg, #36D7C4 0%, #7C5CFF 50%, #FF8A3D 100%)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      animation: {
        "gradient-x": "gradient-x 8s ease infinite",
        "gradient-text": "gradient-text 6s ease infinite",
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 3s infinite",
        "pulse-soft": "pulse-soft 4s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "gradient-text": {
          "0%, 100%": { backgroundPosition: "0% center" },
          "50%": { backgroundPosition: "100% center" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.7" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
