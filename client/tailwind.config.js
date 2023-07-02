/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    fontFamily: {
      gyparody: ["gyparody", "sans-serif"],
      korinna: ["ITC Korinna Std", "sans-serif"],
      serif: ["Merriweather", "serif"],
      oswald: ["Oswald", "serif"],
    },
    extend: {
      fontSize: {
        jumbo: "10rem",
      },
      screens: {
        jumbo: "2560px",
        tv: "3000px",
      },
    },
  },
  plugins: [],
};
