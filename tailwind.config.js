/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: (theme) => ({
        primary: "#6D4AB7",
        secondary: "#343434",
        ...theme.backgroundColor,
      }),
      textColor: (theme) => ({
        primary: "#6D4AB7",
        secondary: "#1C1B1F",
        ...theme.textColor,
      }),
    },
  },
  plugins: [],
};
