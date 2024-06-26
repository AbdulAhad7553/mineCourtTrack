/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      zIndex: {
        negative: '-100',  // Custom class name and value
      },
      fontFamily: {
        atlanta: ['AtlantaCollegeRegular','sans-serif']
      },
    },
  },
  plugins: [],
  
}

