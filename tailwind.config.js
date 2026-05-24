/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        scrapbook: {
          base: '#121214',
          paper: '#eae3db',
          paperBack: '#eee8e0',
          gold: '#ebd3a8',
          rose: '#e0a899',
          pink: '#f43f5e',
        }
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "serif"],
        sans: ["Plus Jakarta Sans", "sans-serif"],
        handwritten: ["Caveat", "cursive"],
      },
    },
  },
  plugins: [],
}
