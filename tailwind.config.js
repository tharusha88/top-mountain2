/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      colors: {
        sageMist: '#E6ECE6',
        alabaster: '#F7F9F6',
        darkPine: '#142218',
        forestMoss: '#243829',
        inkPrimary: '#111A14',
        inkMuted: '#8A9A8E',
        inkLight: '#F4F6F3',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        mistDrift: {
          '0%': { transform: 'translateX(-12%) translateY(0px) scale(1.04)' },
          '50%': { transform: 'translateX(8%) translateY(-8px) scale(1.08)' },
          '100%': { transform: 'translateX(-12%) translateY(0px) scale(1.04)' },
        },
        mistDriftReverse: {
          '0%': { transform: 'translateX(10%) translateY(4px) scale(1.06)' },
          '50%': { transform: 'translateX(-10%) translateY(-6px) scale(1.02)' },
          '100%': { transform: 'translateX(10%) translateY(4px) scale(1.06)' },
        },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        'marquee-slow': 'marquee 54s linear infinite',
        mist: 'mistDrift 22s ease-in-out infinite',
        'mist-reverse': 'mistDriftReverse 28s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
