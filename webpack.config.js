const path = require('path')

module.exports = {
  entry: {
    index: ['./index.js']
  },

  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, './lib'),
    libraryTarget: 'commonjs2'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}
