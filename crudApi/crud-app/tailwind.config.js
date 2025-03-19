/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx,html}", 
      "./src/components/**/*.{js,jsx,ts,tsx,html}", 
      "./src/app/**/*.{js,jsx,ts,tsx,html}", 
      "./src/products/**/*.{js,jsx,ts,tsx,html}",
    ],
    darkMode: "class", // Ensure this is set
    theme: {
      extend: {},
    },
    plugins: [],
  };
  