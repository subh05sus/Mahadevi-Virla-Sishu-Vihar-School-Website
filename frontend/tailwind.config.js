/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'yogvan-light': '#bfa17a',
        'yogvan': '#a87532',
        'yogvan-dark': '#63451d',
      },
    },
    container: {
      padding: {
        md: "10rem",
      },
    },
  },
  plugins: [],
};

