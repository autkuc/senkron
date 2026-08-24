/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        nsosyal: {
          cyan: '#07d0e0',
          blue: '#324bff',
          dark: '#080c14',
          surface: '#0e1524',
          card: '#121b2d',
          border: 'rgba(255, 255, 255, 0.08)',
          hover: '#19243b',
        },
      },
      backgroundImage: {
        'nsosyal-gradient': 'linear-gradient(90deg, #07d0e0 0%, #324bff 100%)',
        'nsosyal-radial': 'radial-gradient(circle, rgba(7, 208, 224, 0.15) 0%, rgba(50, 75, 255, 0) 70%)',
      },
    },
  },
  plugins: [],
};
