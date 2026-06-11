/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#191A23",
        accent: "#B5FF4D",
        danger: "#FF4D4D",
        warning: "#FFD84D",
        safe: "#4DFF91",
      },
      fontFamily: {
        sans: ["Space Grotesk", "sans-serif"],
      },
      borderRadius: {
        card: "14px",
      },
      boxShadow: {
        card: "0 2px 16px rgba(0,0,0,0.10)",
      }
    },
  },
  plugins: [],
}
