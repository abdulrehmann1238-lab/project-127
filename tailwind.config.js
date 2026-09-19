/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1F3B2C',
          hover: '#16291F',
          light: '#2E5540',
        },
        secondary: {
          DEFAULT: '#8A7A5C',
          hover: '#73654B',
          light: '#A69675',
        },
        accent: {
          DEFAULT: '#B8916A',
          hover: '#9E7852',
          light: '#CEAA85',
        },
        background: '#FAF8F3',
        surface: {
          DEFAULT: '#FFFFFF',
          elevated: '#FFFFFF',
          dark: '#14211A',
          darkHover: '#1B2C23',
        },
        text: {
          primary: '#1C1C1A',
          secondary: '#57564E',
          muted: '#8B897D',
        },
        border: {
          DEFAULT: '#E4E0D6',
          dark: '#2A3C32',
        },
        success: {
          DEFAULT: '#2E6B47',
          light: '#EAF3ED',
        },
        warning: {
          DEFAULT: '#B4763A',
          light: '#FBF2EA',
        },
        error: {
          DEFAULT: '#A23B33',
          light: '#FCEBEA',
        },
        info: {
          DEFAULT: '#3C5A73',
          light: '#EBF1F5',
        },
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '16px',
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(28, 28, 26, 0.06)',
        'md': '0 4px 16px rgba(28, 28, 26, 0.08)',
        'lg': '0 12px 32px rgba(28, 28, 26, 0.12)',
        'elevated': '0 20px 40px -15px rgba(20, 33, 26, 0.15)',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'sync-pulse': 'syncPulse 1.2s ease-in-out infinite',
        'float-slow': 'floatSlow 3s ease-in-out infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        syncPulse: {
          '0%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(46, 107, 71, 0.7)' },
          '70%': { transform: 'scale(1)', boxShadow: '0 0 0 10px rgba(46, 107, 71, 0)' },
          '100%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(46, 107, 71, 0)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
