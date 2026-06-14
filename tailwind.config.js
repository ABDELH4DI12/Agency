/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#241B45',
        cream: '#E6E6FA',
        paper: '#FCFBFF',
        coral: '#FFD700',
        sage: '#A67CBA',
        butter: '#F0E68C',
        lilac: '#6A5ACD',
        smoke: '#625C78',
        panel: '#D8D5EF',
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
        sans: ['Manrope', 'sans-serif'],
        display: ['Epilogue', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
        outfit: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        craft: '0 18px 45px rgba(63, 49, 113, 0.14)',
      }
    }
  },
  plugins: [],
}
