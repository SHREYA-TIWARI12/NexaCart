/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef7ff',
          100: '#d9edff',
          500: '#1d7dd8',
          600: '#1266b9',
          700: '#10528f',
          950: '#102235',
        },
        ink: '#17202a',
        coral: '#f9735b',
        mint: '#13b981',
      },
      boxShadow: {
        soft: '0 16px 50px rgba(15, 23, 42, 0.10)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
