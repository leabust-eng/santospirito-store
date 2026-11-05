/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          charcoal: '#4D4D4D', // SantoSpirito Corporate Dark Gray
          gray: '#666666',     // SantoSpirito Corporate Medium Gray
          dark: '#1e293b',
          primary: '#2563eb',
          secondary: '#38bdf8',
          accent: '#0284c7',
          rose: '#e11d48',
          light: '#f8fafc'
        }
      },
      fontFamily: {
        sans: ['"Raleway"', 'system-ui', '-apple-system', 'sans-serif'],
        brand: ['"Raleway"', 'sans-serif'],
        serif: ['"Raleway"', 'serif'],
      }
    },
  },
  plugins: [],
}
