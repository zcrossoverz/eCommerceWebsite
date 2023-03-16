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
        sidebar_dashboard: '#2D3B42',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
