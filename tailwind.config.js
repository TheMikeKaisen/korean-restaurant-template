/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Core palette
        ivory: {
          50: '#FDFCF8',
          100: '#FAF8F2',
          200: '#F5F0E8',
          300: '#EDE5D8',
          400: '#E0D5C5',
          500: '#CEC0AB',
        },
        cream: {
          50: '#FFFEF9',
          100: '#FFFDF0',
          200: '#FFF9E0',
          300: '#FFF3C4',
          400: '#FFEBA0',
        },
        korean: {
          red: '#C8393A',
          'red-light': '#E8504F',
          'red-pale': '#F5E8E8',
          'red-muted': '#D4706F',
        },
        charcoal: {
          50: '#F7F7F6',
          100: '#E8E8E6',
          200: '#D0CFCC',
          300: '#ABA9A5',
          400: '#7E7C78',
          500: '#5A5855',
          600: '#3E3D3A',
          700: '#2A2927',
          800: '#1C1B19',
          900: '#111110',
        },
        gold: {
          100: '#FEF9EC',
          200: '#FBF0CC',
          300: '#F5DC8C',
          400: '#ECC84A',
          500: '#D4A832',
        },
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
        korean: ['var(--font-noto-kr)', 'serif'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
        '8xl': ['5.5rem', { lineHeight: '1.05' }],
        '9xl': ['7rem', { lineHeight: '1' }],
        '10xl': ['9rem', { lineHeight: '0.95' }],
        '11xl': ['11rem', { lineHeight: '0.9' }],
        '12xl': ['13rem', { lineHeight: '0.88' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      boxShadow: {
        'glow-red': '0 0 60px rgba(200, 57, 58, 0.12)',
        'glow-cream': '0 0 80px rgba(255, 249, 224, 0.8)',
        'card-luxury': '0 8px 40px rgba(60, 40, 20, 0.08), 0 2px 8px rgba(60, 40, 20, 0.04)',
        'card-hover': '0 20px 60px rgba(60, 40, 20, 0.14), 0 8px 20px rgba(60, 40, 20, 0.08)',
        'float': '0 32px 80px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.04)',
        'inner-glow': 'inset 0 1px 0 rgba(255,255,255,0.8)',
      },
      backgroundImage: {
        'gradient-ivory': 'linear-gradient(135deg, #FDFCF8 0%, #FAF8F2 50%, #F5F0E8 100%)',
        'gradient-cream': 'linear-gradient(180deg, #FFFEF9 0%, #FFF9E0 100%)',
        'gradient-warm': 'linear-gradient(135deg, #FAF8F2 0%, #EDE5D8 100%)',
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 4s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'fade-up': 'fadeUp 0.8s ease forwards',
        'fade-in': 'fadeIn 1s ease forwards',
        'scale-in': 'scaleIn 0.6s ease forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'expo-in-out': 'cubic-bezier(0.87, 0, 0.13, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1200': '1200ms',
        '1500': '1500ms',
        '2000': '2000ms',
      },
      backdropBlur: {
        xs: '2px',
        '4xl': '72px',
      },
      letterSpacing: {
        'ultra': '0.25em',
        'mega': '0.35em',
      },
      lineHeight: {
        'tighter': '1.1',
        'snugger': '1.15',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [],
}
