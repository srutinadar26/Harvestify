/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2E7D32',
        secondary: '#81C784',
        accent: '#FFC107',
        background: '#F5F5F5',
        dark: {
          bg: '#1a1a1a',
          card: '#2d2d2d',
          text: '#e5e5e5'
        }
      },
      fontFamily: {
        sans: ['Poppins', 'Roboto', 'Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}