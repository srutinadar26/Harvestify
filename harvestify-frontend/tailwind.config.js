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
      animation: {
        'slide-up': 'slide-up 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1)',
        'fade-in': 'fade-in 0.2s ease-out',
        'bounce': 'bounce 0.5s ease-in-out infinite',
        'spin': 'spin 1s linear infinite',
        'pulse-ring': 'pulse-ring 1.5s cubic-bezier(0.2, 0.9, 0.4, 1.1) infinite',
      },
      keyframes: {
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(30px) scale(0.95)' },
          to: { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateX(-10px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        'spin': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'pulse-ring': {
          from: { transform: 'scale(0.8)', opacity: '0.5' },
          to: { transform: 'scale(1.2)', opacity: '0' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}