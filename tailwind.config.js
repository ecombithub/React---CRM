/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        grandis: ['"Grandis Extended"', "sans-serif"],
      },
      colors: {
        darkBlue: "#00293F",
      },
    },
  },
  plugins: [],
};

