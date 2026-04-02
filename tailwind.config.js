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
        cursive: ['"Great Vibes"', 'cursive'],
      },
      colors: {
        rosegold: {
          light: '#FDE8E8',
          DEFAULT: '#b76e79',
          dark: '#a05a66',
          deep: '#8a4351',
        },
        champagne: {
          light: '#FDFBFB',
          DEFAULT: '#F7E7CE',
          dark: '#E1C699',
        },
        cream: {
          light: '#FFF5F5',
          DEFAULT: '#FDFBFB',
          dark: '#F3E5E5',
        },
        blush: {
          light: '#f4dada',
          DEFAULT: '#F2D2D2',
          dark: '#E5B8B8',
        },
        amber: {
          soft: '#fde68a',
        },
        sky: {
          soft: '#e0f2fe',
        },
        magenta: {
          DEFAULT: '#d946ef',
        },
        purple: {
          DEFAULT: '#9333ea',
        },
        sunset: {
          DEFAULT: '#f97316',
        }
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(183, 110, 121, 0.1)',
        'glass-hover': '0 8px 32px 0 rgba(183, 110, 121, 0.25)',
        'glow': '0 0 20px rgba(183, 110, 121, 0.4)',
        'glow-strong': '0 0 30px rgba(183, 110, 121, 0.6)',
      },
      animation: {
        fadeUp: 'fadeUp 1.5s ease-out forwards',
        pulseGlow: 'pulseGlow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 6s ease-in-out infinite',
        movingBg: 'movingBg 20s ease infinite',
        floatUp: 'floatUp 10s linear infinite',
        blob: 'blob 7s infinite',
        shimmer: 'shimmer 2s linear infinite',
        'fade-in-slow': 'fadeIn 3s ease-out forwards',
        'scale-in': 'scaleIn 1s cubic-bezier(0.25, 1, 0.5, 1) forwards',
        shake: 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
        twinkle: 'twinkle 4s ease-in-out infinite',
        'gradient-x': 'gradient-x 15s ease infinite',
        'gift-bounce': 'gift-bounce 2s infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 0px rgba(183,110,121,0)' },
          '50%': { opacity: '0.8', boxShadow: '0 0 25px rgba(183,110,121,0.5)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        movingBg: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        floatUp: {
          '0%': { transform: 'translateY(100vh) scale(0.5) rotate(0deg)', opacity: '0' },
          '20%': { opacity: '0.6' },
          '80%': { opacity: '0.6' },
          '100%': { transform: 'translateY(-20vh) scale(1.2) rotate(360deg)', opacity: '0' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        shake: {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' }
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        'gift-bounce': {
          '0%, 100%': {
            transform: 'translateY(-5%)',
            animationTimingFunction: 'cubic-bezier(0.8,0,1,1)'
          },
          '50%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0,0,0.2,1)'
          }
        }
      }
    },
  },
  plugins: [],
}