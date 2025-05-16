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
  theme: {
    extend: {
      colors: {
        'custom-gray': '#D3D9D4',
        'custom-blue': '#233F6B',
      },
    },
  },
  variants: {},

  theme: {
    extend: {
      width: {
        '570': '570px',
        '136': '136px',
        '52':'52px',
      },
      height: {
        '300': '300px',
        '136':'136px',
        '70': '70px',
      },
    },
  },

  theme: {
    extend: {
      colors: {
        customBlue: '#2E3944',
      },
    },
  },
  variants: {},
  plugins: [],
  
}

