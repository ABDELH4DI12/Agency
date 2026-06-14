/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#241B2F',
        cream: '#F7F0E6',
        paper: '#FFFDF8',
        coral: '#FF7657',
        sage: '#A9BE9B',
        butter: '#F2D06B',
        lilac: '#C9B7EE',
        smoke: '#6D6473',
        panel: '#EEE5D8',
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
        craft: '0 18px 45px rgba(60, 42, 67, 0.12)',
      }
    }
  },
  plugins: [],
}
