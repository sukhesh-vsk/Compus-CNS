/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        search: '0 4px 6px #b7b7b796',
      },
    },
  },
  plugins: [],
}

