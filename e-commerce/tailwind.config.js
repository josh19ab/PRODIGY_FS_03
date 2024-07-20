/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    keyframes: {
      "slide-in-right": {
        "0%": {
          transform: "translateY(-50)",
          opacity: "0",
        },
        "100%": {
          transform: "translateY(0)",
          opacity: "1",
        },
      },
      "slide-out-right": {
        "0%": {
          transform: "translateY(0)",
          opacity: "1",
        },
        "100%": {
          transform: "translateY(-50)",
          opacity: "0",
        },
      },
    },
    animation: {
      "slide-in-right": "slide-in-right 0.3s ease-in-out",
      "slide-out-right": "slide-out-right 0.3s ease-in-out",
    },
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
        // New colors for dark mode
        darkBg: "#1B262C", // Dark background
        darkAccent: "#0F4C75", // Dark accent color
        darkPrimary: "#3282B8", // Dark button background
        darkText: "#BBE1FA", // Light text color for dark mode
      },
    },
  },
  plugins: [],
};
