/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-image': "url('https://wallpapercave.com/wp/wp9127221.jpg')", // Update this path
      },
    },
  },
  plugins: [],
}
