/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      gyparody: ["gyparody", "sans-serif"],
      korinna: ["ITC Korinna Std", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
  },
  plugins: [],
};
