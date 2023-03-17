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
      boxShadow: {
        primary: '#0d41ff 0px 0px 23px',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
