/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        hachi: ['Hachi Maru Pop', 'sans-serif'],
        nanum: ['Nanum Pen Script', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
