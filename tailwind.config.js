/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastelPink: '#ffd1dc',
        pastelPinkDark: '#ffb6c1',
        pastelCream: '#fffdd0',
        pastelPurple: '#e6e6fa',
        crtGreen: '#90ee90',
        crtGreenDark: '#3cb371',
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'Courier New', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'retro': '4px 4px 0px 0px rgba(0,0,0,0.2)',
        'retro-sm': '2px 2px 0px 0px rgba(0,0,0,0.2)',
      }
    },
  },
  plugins: [],
}
