/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // <--- This line enables manual dark mode switching
  theme: {
    extend: {},
  },
  plugins: [],
};