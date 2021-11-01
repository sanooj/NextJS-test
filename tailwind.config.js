module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './Layout/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
    },
    fontSize: {
      lg: ['18px', { lineHeight: '22px' }],
      xl: ['18px', { lineHeight: '22px' }],
    },
    borderRadius: {
      'lg': '12px',
      DEFAULT: '9px',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
