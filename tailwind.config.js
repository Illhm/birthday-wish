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
        gold: {
          soft: '#fbf4e6',
          DEFAULT: '#d4af37',
          dark: '#aa8c2c',
        },
        velvet: {
          DEFAULT: '#800020',
          dark: '#4a0404',
        },
        rosequartz: {
          light: '#f7e1d7',
          DEFAULT: '#e0b0ff',
        }
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(183, 110, 121, 0.1)',
        'glass-hover': '0 8px 32px 0 rgba(183, 110, 121, 0.25)',
        'glow': '0 0 20px rgba(183, 110, 121, 0.4)',
        'glow-strong': '0 0 30px rgba(183, 110, 121, 0.6)',
        'glow-gold': '0 0 25px rgba(212, 175, 55, 0.4)',
        'premium-glass': '0 10px 40px -10px rgba(183, 110, 121, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.5)',
        'soft-aura': '0 0 50px rgba(183, 110, 121, 0.2)',
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
        'float-slow': 'floatSlow 8s ease-in-out infinite',
        'sway': 'sway 4s ease-in-out infinite',
        'letterReveal': 'letterReveal 1.2s cubic-bezier(0.25, 1, 0.5, 1) forwards',
        'firefly': 'firefly 5s ease-in-out infinite alternate',
        'heartbeat': 'heartbeat 2s ease-in-out infinite',
        'auroraBg': 'auroraBg 15s ease infinite alternate',
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
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-20px) scale(1.02)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        letterReveal: {
          '0%': { opacity: '0', transform: 'translateY(20px) scale(0.98)', filter: 'blur(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)', filter: 'blur(0)' },
        },
        firefly: {
          '0%': { opacity: '0.2', transform: 'translate(0, 0) scale(0.8)' },
          '50%': { opacity: '1', transform: 'translate(10px, -20px) scale(1.2)' },
          '100%': { opacity: '0.2', transform: 'translate(-10px, 20px) scale(0.8)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '15%': { transform: 'scale(1.15)' },
          '30%': { transform: 'scale(1)' },
          '45%': { transform: 'scale(1.15)' },
          '60%': { transform: 'scale(1)' },
        },
        auroraBg: {
          '0%': { backgroundPosition: '0% 0%', backgroundSize: '150% 150%' },
          '100%': { backgroundPosition: '100% 100%', backgroundSize: '200% 200%' },
        }
      }
    },
  },
  plugins: [],
}