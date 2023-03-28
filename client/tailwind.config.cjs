/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
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
      backgroundImage: {
        security: 'linear-gradient(to right, rgb(56, 189, 248), rgb(59, 130, 246))',
        load: 'linear-gradient(to bottom,rgba(255 255 255/0),rgba(255 255 255/62.5),rgba(255 255 255/1))',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
