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
      colors: {
        brain: '#fb539b',
        'custom-blue': '#007bff',
        'custom-green': {
          100: '#e6ffed',
          500: '#24a148',
          900: '#0d3318',
        },
      },
    },
  },
  plugins: [],
};
