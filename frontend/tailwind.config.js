/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: { "header-height": "56px" },
      boxShadow: {
        "3xl": "0px 0px 38px -5px rgba(0,0,0,0.79)",
        layout: "0px 0px 38px 4px rgba(0,0,0,0.29)",
      },
      colors: {
        h1: "#333333",
      },
    },
  },
  plugins: [],
};
