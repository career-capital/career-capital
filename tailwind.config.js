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
        softWhite: "#F8F9FA",  // Bright Snow - page backgrounds, navigation
        trueWhite: "#FFFFFF",   // True White - cards, modals, high-contrast surfaces
        ink: "#1A1A1A",         // Carbon Black - high-emphasis text, footer
        black: "#000000",

        // Grey System - optimized for readability
        slate: "#4B5563",       // Charcoal Blue - primary body text
        border: "#D1D5DB",      // Pale Slate - borders, dividers
        surface: "#E6E9EE",     // Surface - section backgrounds, form containers

        // Primary Brand Colors
        navy: "#0F2A44",        // Deep Space Blue - primary brand color, headings, CTAs
        steel: "#2F5D8A",       // Baltic Blue - links, hover states, interactive accents
        lightBlue: "#4A90E2",

        // Utility Colors
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
