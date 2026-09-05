/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#0B0D10', 
        accent: '#C5162E',   
        bone: '#F5F5F2',      
        coolgray: '#7A7D84',  
      },
      fontFamily: {
        sans: ['"Noto Sans Arabic"', 'sans-serif'], 
      },
      borderRadius: {
        'none': '0px',
        'sm': '2px', // برای گوشه‌های نسبتاً تیز
        DEFAULT: '4px',
      },
      skew: {
        '15': '15deg', // برای المان‌ها و Slashهای مورب
      }
    },
  },
  plugins: [],
}