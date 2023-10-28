/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#ececf1",
          100: "#d9d9e3",
          200: "#d1d5db",
          300: "#c5c5d2",
          400: "#acacbe",
          500: "#8e8ea0",
          550: "#565869",
          600: "#444654",
          700: "#40414f",
          800: "#343541",
          900: "#202123",
        },
        "accent-green": {
          400: "#1ed085",
          500: "#19c37d",
          600: "#109f63",
        },
        "accent-red": {
          400: "#c72a2a",
          500: "#b91c1c",
          600: "#931111",
        }
      }
    },
  },
  plugins: [],
}

export default config;

