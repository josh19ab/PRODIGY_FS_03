/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#3490dc",
        secondary: "#f1c40f",
        tertiary: "#e74c3c",
        quaternary: "#2ecc71",
        light: "#ecf0f1",
        dark: "#34495e",
        white: "#ffffff",
        black: "#000000",
      },
    },
  },
  plugins: [],
};
