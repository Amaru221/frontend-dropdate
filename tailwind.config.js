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
        surface: "#131313",
        background: "#131313",
        onSurface: "#e2e2e2",

        primary: "#c9bfff",
        primaryContainer: "#917eff",
        onPrimary: "#2e009c",
        onPrimaryContainer: "#28008a",

        secondary: "#ffb4a3",
        secondaryContainer: "#783525",
        onSecondary: "#581d0f",
        onSecondaryContainer: "#fea08b",

        tertiary: "#a4c9ff",
        tertiaryContainer: "#4d93e5",
        onTertiary: "#00315d",

        error: "#ffb4ab",
        errorContainer: "#93000a",
        onError: "#690005",
        onErrorContainer: "#ffdad6",

        outline: "#928ea1",
        outlineVariant: "#484555",

        surfaceVariant: "#353535",
        surfaceBright: "#393939",
        surfaceDim: "#131313",

        surfaceContainerLowest: "#0e0e0e",
        surfaceContainerLow: "#1b1b1b",
        surfaceContainer: "#1f1f1f",
        surfaceContainerHigh: "#2a2a2a",
        surfaceContainerHighest: "#353535",
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

console.log("TAILWIND CONFIG LOADED");