/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { primary: "#0a6e79", secondary: "#2c3e50", accent: "#27ae60" },
      fontFamily: { sans: ["Inter", "sans-serif"] },
    },
  },
  plugins: [],
}
