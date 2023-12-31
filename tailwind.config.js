/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Sora'],
      },
      colors: {
        'mirage-gray': '#1e1e20',
        'smokey-gray': '#3a3a3a',
        'lime-green': '#2fff63',
      },
      animation: {
        fadeInOut: 'fadeInOut 1s ease-in-out',
      },

    },
    plugins: [],
  }
}
