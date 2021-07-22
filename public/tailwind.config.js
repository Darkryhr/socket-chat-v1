module.exports = {
  purge: ['./index.html', './chat.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      margin: ['first'],
      backgroundColor: ['even'],
    },
  },
  plugins: [],
};
