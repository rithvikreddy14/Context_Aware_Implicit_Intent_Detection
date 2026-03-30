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
          50: '#f0f4ff',
          100: '#e0e7ff',
          400: '#818cf8',
          500: '#6366f1', // Primary Indigo
          600: '#4f46e5',
          900: '#312e81',
        },
        background: '#f8fafc', // Very light slate for app background
        tone: {
          critical: '#ef4444', // Red
          neutral: '#94a3b8',  // Slate/Gray
          positive: '#10b981', // Emerald Green
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'saas': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
      }
    },
  },
  plugins: [],
}