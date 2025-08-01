import flowbiteReact from "flowbite-react/plugin/tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    ".flowbite-react\\class-list.json"
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'serif'],
        'ReemKufi': ['Reem Kufi', 'sans-serif']
      },
      colors: {
        dark:{
          background: "#111827",
          accent: '9ca3af'
        }

      }
    },
  },
  plugins: [flowbiteReact],
}