/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      'ubu' : ['Ubuntu', 'Verdana', 'Helvetica', 'Arial', 'ui-sans-serif']
    },
    extend: {

    },
  },
  plugins: [],
}
