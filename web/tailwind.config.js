/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "3xl":"1900px"
      },
      fontFamily: {
        googleFontFooter: ["Great Vibes"]
      }
    },
  },
  plugins: [],
}

