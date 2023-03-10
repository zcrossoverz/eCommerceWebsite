/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['"Poppins"', 'sans-serif'],
      },
      colors: {
        form: '#3A98B9',
        err: '#ff3333',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
