// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'nature-cream': '#FDFBF7',
        'nature-green': '#2D5A27', // Deep Forest Green
        'nature-light': '#E8F5E9', // Soft Green for hovers
        'nature-brown': '#8B5E3C', // Earthy accent
        'nature-accent': '#D4A373', // Gold/Sand
      },
      fontFamily: {
        serif: ['Merriweather', 'serif'], // Elegant for headings
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'sway': 'sway 3s ease-in-out infinite',
      },
      keyframes: {
        sway: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      }
    },
  },
  plugins: [],
};