/** @type {import('tailwindcss').Config} */
const config = {
   darkMode: "class", // Enable dark mode using a CSS class
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;