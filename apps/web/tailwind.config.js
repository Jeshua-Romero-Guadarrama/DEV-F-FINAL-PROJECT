/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        peach: '#f6a66c',
        mint: '#a8d5ba',
        sunny: '#ffd77a',
        cream: '#fff3e6',
        charcoal: '#4a4a4a',
      },
      fontFamily: {
        baloo: ['"Baloo 2"', 'cursive'],
        poppins: ['Poppins', 'sans-serif'],
        fredoka: ['Fredoka', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
