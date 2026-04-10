/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#EBEBEB',
        ink: '#0D0D0D',
        blue: '#1440FF',
        gold: '#D4A017',
      },
      fontFamily: {
        bebas: ['var(--font-bebas)', 'sans-serif'],
        marker: ['var(--font-marker)', 'cursive'],
        barlow: ['var(--font-barlow)', 'sans-serif'],
        bristol: ['var(--font-bristol)', 'serif'],
        akshar:  ['var(--font-akshar)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
