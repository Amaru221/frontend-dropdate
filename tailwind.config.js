// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  darkMode: "class",

  theme: {
    extend: {
      colors: {
        "surface": "#131313",
        "background": "#131313",
        "on-surface": "#e2e2e2",

        "primary": "#c9bfff",
        "primary-container": "#917eff",
        "on-primary": "#2e009c",
        "on-primary-container": "#28008a",

        "secondary": "#ffb4a3",
        "secondary-container": "#783525",
        "on-secondary": "#581d0f",
        "on-secondary-container": "#fea08b",

        "tertiary": "#a4c9ff",
        "tertiary-container": "#4d93e5",
        "on-tertiary": "#00315d",

        "error": "#ffb4ab",
        "error-container": "#93000a",
        "on-error": "#690005",
        "on-error-container": "#ffdad6",

        "outline": "#928ea1",
        "outline-variant": "#484555",

        "surface-variant": "#353535",
        "surface-bright": "#393939",
        "surface-dim": "#131313",

        "surface-container-lowest": "#0e0e0e",
        "surface-container-low": "#1b1b1b",
        "surface-container": "#1f1f1f",
        "surface-container-high": "#2a2a2a",
        "surface-container-highest": "#353535",
      },

      fontFamily: {
        headline: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        label: ["Inter", "sans-serif"],
      },

      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "0.75rem",
      },
    },
  },

  plugins: [],
};