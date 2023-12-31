/** @type {import('tailwindcss').Config} */

const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
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
          600: "#444654",
          700: "#40414f",
          800: "#343541",
          900: "#202123",
        },
        "accent-green": {
          50: "#edfcf4",
          100: "#d3f8e2",
          200: "#aaf0ca",
          300: "#73e2ad",
          400: "#3acd8b",
          500: "#19c37d",
          600: "#0b905c",
          700: "#09734c",
          800: "#0a5b3d",
          900: "#094b35",
          950: "#042a1e",
        },
        "accent-red": {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#b91c1c",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
          950: "#450a0a",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};

export default config;
