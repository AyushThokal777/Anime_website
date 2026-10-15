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
        anime: {
          dark: '#08080c',
          card: '#11121a',
          cardHover: '#181a26',
          border: 'rgba(255, 255, 255, 0.08)',
          borderHover: 'rgba(255, 42, 95, 0.4)',
          red: '#ff2a5f',
          redGlow: '#e11d48',
          purple: '#9333ea',
          violet: '#7c3aed',
          cyan: '#06b6d4',
          gold: '#f59e0b',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Cabinet Grotesk', 'Plus Jakarta Sans', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(to top, #08080c 10%, rgba(8, 8, 12, 0.8) 40%, rgba(8, 8, 12, 0.2) 80%, transparent 100%)',
        'hero-side-gradient': 'linear-gradient(to right, #08080c 15%, rgba(8, 8, 12, 0.85) 45%, rgba(8, 8, 12, 0.3) 75%, transparent 100%)',
      },
      boxShadow: {
        'neon-red': '0 0 20px -3px rgba(255, 42, 95, 0.5)',
        'neon-purple': '0 0 20px -3px rgba(147, 51, 234, 0.5)',
        'card-glow': '0 8px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(124, 58, 237, 0.15)',
        'card-glow-red': '0 8px 30px rgba(0, 0, 0, 0.7), 0 0 25px rgba(255, 42, 95, 0.25)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { opacity: '0.4' },
          '100%': { opacity: '0.8' },
        }
      }
    },
  },
  plugins: [],
}
