/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "titleFont": "'Josefin Sans', sans-serif",
      },
      colors: {
        "textLight": '#fcfcfc',
        "secondary": "#5a4f42",
        "textDark": '#100e10',
        "primary": "#9e8b76",
        "acento": "#3dd1ff",
        "light": '#fcfcfc',
        "logo": '#cda151',
        "dark": '#333333',
        "gris": "#424242",
        "menu": "#7b5b21",
      },
    },
  },
  plugins: [],
};
