/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        amp: {
          blue: '#1C6EE8',
          indigo: '#5C4EFA',
        },
      },
    },
  },
  plugins: [],
}

