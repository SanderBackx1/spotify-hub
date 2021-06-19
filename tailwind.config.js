const colors = require("tailwindcss/colors");

module.exports = {
  purge: [
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}"
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px"
    },
    colors: {
      white: colors.white,
      black: colors.black,
      gray: colors.gray,
      blackLight: { DEFAULT: `#333333` },
      blue: colors.lightBlue,
      red: colors.rose,
      pink: colors.fuchsia,
      green: { DEFAULT: `#1DB954` },
      gradient1: { DEFAULT: `#5B5773` }
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"]
    },
    extend: {
      spacing: {
        "128": "32rem",
        "144": "36rem"
      },
      borderRadius: {
        "4xl": "2rem"
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
