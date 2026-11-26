/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        campus: {
          amber: '#f59e0b',
          terracotta: '#ea580c',
          warm: '#fffbeb',
          card: '#ffffff',
          dark: '#1e293b',
          muted: '#64748b'
        }
      }
    },
  },
  plugins: [],
}
