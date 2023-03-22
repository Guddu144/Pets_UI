/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{js,jsx,svg}',
    './src/icons/**/*.{js,jsx,svg}',
    './src/index.html',
  ],
  theme: {
    fontFamily: {
      sans: ['"Inter"', 'Helvetica', 'Arial', 'sans-serif'],
      mono: ['Menlo', 'Monaco', 'Consolas', '"Courier New"', 'monospace'],
    },
    extend: {
      colors: {
        gray: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        black: {
          50: '#5E5E5E',
          100: '#242C35',
          200: '#313C4D',
          900: '#000000',
        },
        blue: {
          50: '#e6ecf3',
          100: '#b0c3da',
          150: '#2A62E9',
          200: '#8aa6c8',
          300: '#547daf',
          400: '#33649f',
          500: '#003d87',
          600: '#00387b',
          700: '#002b60',
          800: '#00224a',
          900: '#001a39',
        },
        // blue: {
        //   50: '#E7EFF9',
        //   100: '#CCDEF2',
        //   200: '#AAC8EA',
        //   300: '#5591D4',
        //   400: '#2A75CA',
        //   500: '#005ABF',
        //   600: '#004B9F',
        //   700: '#003D87',
        //   800: '#001E40',
        //   900: '#001226',
        // },
        orange: {
          50: '#FFFCFB',
          100: '#FACFB9',
          200: '#F7B796',
          300: '#F49F73',
          400: '#F28750',
          500: '#FF5527',
          600: '#C75D26',
          700: '#9F4A1E',
          800: '#773817',
          900: '#301609',
        },
        yellow: {
          50: '#FFFBEB',
          500: '#F59E0B',
        },
        green: {
          120: '#00838F',
          150: '#79b088',
          200: '#0D894F',
          500: '#22C55E',
          600: '#1e5054',
        },
        red: {
          50: '#FFF8F4',
          100: '#FFE5E2',
          200: '#B11E13',
          500: '#EF4444',
        },
      },
    },
  },
  plugins: [],
};
