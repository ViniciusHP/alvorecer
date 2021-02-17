const path = require('path');

module.exports = {
  entry: ['@babel/polyfill', './js/script.js'],
  output: {
    path: path.resolve(__dirname, './'),
    filename: 'main.js',
  },
};
