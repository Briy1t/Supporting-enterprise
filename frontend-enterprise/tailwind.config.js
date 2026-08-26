/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/styles/supporting/*.css"
  ],
  theme: {
    extend: {
      colors: {
        supporting: "#0b111e",
        supportingLight: "#e6e9f0",
        supportingGray: "#d0d0d0",
      },
    },
  },
};
