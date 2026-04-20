import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'rf-carbon': '#111111',
        'rf-dorado': '#C4AB4B',
        'rf-negro': '#050505',
        'rf-gris': '#1A1A1A',
        'rf-texto': '#F0F0F0',
      },
      fontFamily: {
        // Gotham Bold para títulos (font-bold / font-display)
        display: ['GothamBold', 'Arial Black', 'sans-serif'],
        // Gotham Book para cuerpo
        sans: ['GothamBook', 'Arial', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-dorado': 'linear-gradient(135deg, #C4AB4B 0%, #DCC96A 50%, #C4AB4B 100%)',
      },
      animation: {
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
}
export default config
