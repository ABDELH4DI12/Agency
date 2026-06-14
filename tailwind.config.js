/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#080807',
        paper: '#F3F0E8',
        acid: '#D8FF3E',
        electric: '#8C52FF',
        smoke: '#A9A49C',
        panel: '#11110F',
        purple: { 
          400: '#C084FC', 
          500: '#A855F7', 
          600: '#9333EA', 
          700: '#7E22CE', 
          800: '#6B21A8', 
          900: '#581C87' 
        },
        violet: { 
          300: '#C4B5FD', 
          400: '#A78BFA', 
          500: '#8B5CF6' 
        },
        fuchsia: { 
          400: '#E879F9', 
          500: '#D946EF' 
        }
      },
      fontFamily: { 
        sans: ['DM Sans', 'sans-serif'],
        display: ['Instrument Serif', 'serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 80px rgba(140, 82, 255, 0.2)',
      }
    }
  },
  plugins: [],
}
