module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Lato"', 'sans-serif'],
      },
      colors: {
        rosegold: {
          light: '#FDE8E8',
          DEFAULT: '#b76e79',
          dark: '#a05a66',
        },
        cream: {
          light: '#FFF5F5',
          DEFAULT: '#FDFBFB',
        },
        blush: {
          light: '#f4dada',
        }
      },
      animation: {
        fadeUp: 'fadeUp 1.5s ease-out forwards',
        pulseGlow: 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(30px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 1, boxShadow: '0 0 0px rgba(183,110,121,0)' },
          '50%': { opacity: 0.8, boxShadow: '0 0 15px rgba(183,110,121,0.5)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
