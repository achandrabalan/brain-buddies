const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  presets: [require('./utils/tailwind-preset')],
  theme: {
    extend: {
      fontFamily: {
        angkor: ['"Angkor"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
