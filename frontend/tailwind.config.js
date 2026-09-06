/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#080c14',
          panel: '#0e1626',
          border: '#1e293b',
          glow: '#00f2fe',
          blue: '#38bdf8',
          accent: '#0284c7',
          danger: '#ef4444',
          warning: '#f59e0b',
          success: '#10b981',
          muted: '#64748b'
        }
      },
      boxShadow: {
        'cyan-glow': '0 0 15px rgba(0, 242, 254, 0.25)',
        'red-glow': '0 0 15px rgba(239, 68, 68, 0.25)',
        'blue-glow': '0 0 15px rgba(56, 189, 248, 0.25)',
      }
    },
  },
  plugins: [],
}
