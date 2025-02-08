/** @type {import('tailwindcss').Config} */

export default {
  darkMode: 'class',
  content: ['./src/**/*.{mjs,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        'dark-bg-primary': '#1A1A1A80',
        'dark-bg-secondary': '#28124D',
        'light-bg-primary': '#FFFFFF',
        'light-bg-secondary': '#6C40B5',
      },
      textColor: {
        'dark-text-primary': '#FFFFFF',
        'dark-text-secondary': '#FFFFFF',
        'dark-text-acent': '#FFFFFF',
        'light-text-primary': '#000000',
        'light-text-secondary': '#666666',
        'light-text-acent': '#6C40B5',
      },
      borderRadius: {
        'xl': '1.25rem',
        '2xl': '2rem',
      },
      width: {
        'mobile': '360px',
        'desktop': '700px',
      },
      margin: {
        'mobile': '8.688rem',
        'desktop': '700px',
      },
      padding: {
        '6.5': '1.625rem',
      },
      fontFamily: {
        sans: ['Noto Sans', 'sans-serif'],
      },
      fontSize: {
        'xs': '0.5rem',
        'ssm': '0.646rem',
        'sm': '0.75rem',
        'smaller': '0.849rem',
        '5xl': '3.125rem',
      },

    }
  },
  plugins: [require('tailwindcss-motion')]
}
