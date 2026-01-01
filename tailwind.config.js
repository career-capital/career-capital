/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core Neutrals
        softWhite: "#F8F9FA",
        trueWhite: "#FFFFFF",
        ink: "#1A1A1A",
        black: "#000000",

        // Grey System - WCAG AAA compliant
        slate: "#3F4653", // Updated from #4B5563 for 8.01:1 contrast ratio on soft-white
        border: "#D1D5DB",
        surface: "#F1F3F5",

        // Signature Blue
        navy: "#0F2A44",

        // Accent Blue
        steel: "#2F5D8A",
        lightBlue: "#4A90E2",

        // Legacy/Utility
        success: "#166534",
        warning: "#A16207",
        error: "#B91C1C",
      },
      // Enhanced readability settings
      maxWidth: {
        'readable': '65ch',
        'prose': '75ch',
      },
      lineHeight: {
        'extra-relaxed': '1.7',
        'extra-tight': '1.1',
      },
      perspective: {
        '1000': '1000px',
      },
    },
  },
  plugins: [],
};
