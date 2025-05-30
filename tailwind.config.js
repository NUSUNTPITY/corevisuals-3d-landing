/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#12182B', // Dark Blue - Background
        'secondary': '#79B8F3', // Light Blue - UI elements, highlights
        'accent': '#00C698', // Teal - Call-to-actions, active states
        'surface': '#FFFFFF', // White - Card backgrounds, UI elements
        'text': '#E5E7EB', // Light Gray - Main text color
        'dark-text': '#030712', // Almost Black - Text on light backgrounds
        'light-border': '#D1D5DB', // Light Gray - Subtle borders
        'dark-border': '#4B5563', // Dark Gray - Borders on dark surfaces
      },
      fontFamily: {
        'sans': ['Roboto', 'sans-serif'],
        'heading': ['Montserrat', 'sans-serif'],
        'mono': ['Roboto Mono', 'monospace'],
      },
      spacing: {
        'xs': '0.5rem',   // 8px
        'sm': '0.75rem',  // 12px
        'md': '1rem',     // 16px
        'lg': '1.5rem',   // 24px
        'xl': '2rem',     // 32px
        '2xl': '3rem',     // 48px
        '3xl': '4rem',     // 64px
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        DEFAULT: '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'full': '9999px',
        'large': '12px',
      },
      boxShadow: {
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'none': '0',
      },
    },
  },
  plugins: [],
}