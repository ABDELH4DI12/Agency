/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
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
        outfit: ['Outfit', 'sans-serif'] 
      }
    }
  },
  plugins: [],
}
