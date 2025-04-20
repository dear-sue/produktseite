/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Open Sans', 'Helvetica', 'sans-serif'],
      },
      screens: {
        sm: '580px',
      },
      colors: {
        primary: '#00aa7a',
        secondary: '#e84747',
      },
      fontSize: {
        base: ['1rem', '1.5rem'],
        h1: ['2rem', '1.5'],
        caption: ['.75rem', '1.5'],
      },
      letterSpacing: {
        wide: '0.05rem',
      },
      fontWeight: {
        regular: '400',
        semibold: '600',
      },
    },
  },
  plugins: [],
};
