/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand colors
        'brand-blue': '#1E3A8A',
        'brand-purple': '#7C3AED',
        'brand-gold': '#F59E0B',
        
        // Service category colors
        'smartico': '#3B82F6',
        'smartico-accent': '#06B6D4',
        'seon': '#10B981',
        'seon-accent': '#1E40AF',
        'igaming': '#8B5CF6',
        'igaming-accent': '#EC4899',
        'tournament': '#F59E0B',
        'tournament-accent': '#F97316',
        'pitboss': '#EF4444',
        'pitboss-accent': '#F59E0B',
        'freegames': '#22C55E',
        'freegames-accent': '#84CC16',
        'jackpot': '#F59E0B',
        'jackpot-accent': '#EAB308',
      },
      fontFamily: {
        'primary': ['Inter', 'system-ui', 'sans-serif'],
        'heading': ['Poppins', 'Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      spacing: {
        '4.5': '1.125rem',
        '5.5': '1.375rem',
        '6.5': '1.625rem',
        '7.5': '1.875rem',
        '8.5': '2.125rem',
        '9.5': '2.375rem',
        '18': '4.5rem',
        '88': '22rem',
        '92': '23rem',
        '100': '25rem',
        '104': '26rem',
        '108': '27rem',
        '112': '28rem',
        '116': '29rem',
        '120': '30rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(124, 58, 237, 0.3)',
        'glow-gold': '0 0 20px rgba(245, 158, 11, 0.3)',
        'glow-blue': '0 0 20px rgba(30, 58, 138, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
