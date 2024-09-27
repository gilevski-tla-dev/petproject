/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "3xl": "0px 0px 38px -5px rgba(0,0,0,0.79)",
      },
    },
  },
  plugins: [],
};
