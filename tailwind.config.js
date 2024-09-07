/** @type {import('tailwindcss').Config} */
export default {
  content: [
    'src/app/**/*.{js,ts,jsx,tsx}',
    'src/components/**/*.{js,ts,jsx,tsx}',
    'src/components/**/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        fill: {
          '0%': { width: '0%' },
          '50%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
      animation: {
        fill: 'fill 5s linear infinite',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        primary: '#4B81FF',
        secondary: {
          light: '#B3C1F9',
          dark: '#6A7293',
        },
        gray: {
          light: '#E8E7E7',
          dark: '#9E9E9E',
        },
      },
      borderWidth: {
        1: '1px',
      },
    },
  },
  plugins: [],
};
