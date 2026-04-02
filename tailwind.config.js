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
        },
        amber: {
          soft: '#fde68a', // warm amber hint
        },
        sky: {
          soft: '#e0f2fe', // soft sky blue hint
        },
        peach: {
          light: '#ffefd5',
          soft: '#ffdab9',
        }
      },
      animation: {
        fadeUp: 'fadeUp 1.5s ease-out forwards',
        pulseGlow: 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 6s ease-in-out infinite',
        movingBg: 'movingBg 15s ease infinite',
        floatUp: 'floatUp 10s linear infinite',
        blob: 'blob 7s infinite',
        slideUpFade: 'slideUpFade 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        shimmer: 'shimmer 2.5s infinite linear',
        sparkle: 'sparkle 3s ease-in-out infinite',
        heartFloat: 'heartFloat 5s ease-in-out infinite',
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
        },
        movingBg: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        floatUp: {
          '0%': { transform: 'translateY(100vh) scale(0.5)', opacity: 0 },
          '10%': { opacity: 0.5 },
          '90%': { opacity: 0.5 },
          '100%': { transform: 'translateY(-10vh) scale(1)', opacity: 0 },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        slideUpFade: {
          '0%': { opacity: 0, transform: 'translateY(40px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        sparkle: {
          '0%, 100%': { opacity: 0, transform: 'scale(0)' },
          '50%': { opacity: 1, transform: 'scale(1)' },
        },
        heartFloat: {
          '0%': { transform: 'translateY(0) rotate(0deg) scale(1)', opacity: 0 },
          '20%': { opacity: 0.8 },
          '80%': { opacity: 0.8 },
          '100%': { transform: 'translateY(-100px) rotate(20deg) scale(1.2)', opacity: 0 },
        }
      }
    },
  },
  plugins: [],
}