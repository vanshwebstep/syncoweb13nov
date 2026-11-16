/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '767px',
      lg: '1024px',
      xl: '1240px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        brand: {
          navy: '#061838',
          'navy-dark': '#030c1d',
          blue: '#0b3b8e',
          'blue-light': '#1e5ad8',
          green: '#0DD180',
          'green-dark': '#00c853',
          yellow: '#ffc107',
          'yellow-light': '#ffea00',
          cyan: '#00e5ff',
          gray: '#f4f7fc',
        }
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        heading: ['"Gasoek One"', 'Poppins', 'sans-serif'],
        display: ['"Gasoek One"', 'Poppins', 'sans-serif'],
        gasoek: ['"Gasoek One"', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'glow-green': '0 0 25px rgba(0, 230, 118, 0.35)',
        'glow-blue': '0 0 25px rgba(11, 59, 142, 0.35)',
        'card-hover': '0 20px 40px -15px rgba(6, 24, 56, 0.12)',
      }
    },
  },
  plugins: [],
}
