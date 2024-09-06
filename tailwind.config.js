/** @type {import('tailwindcss').Config} */
export default {
  content: [
    'src/app/**/*.{js,ts,jsx,tsx}',
    'src/components/**/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
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
