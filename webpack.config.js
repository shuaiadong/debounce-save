const path = require('path')

module.exports = {
  entry: {
    index: ['./index.js']
  },

  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, './lib'),

    // path: path.resolve(__dirname, './_demo/node_modules/debounce-save/lib/'),
    libraryTarget: 'commonjs2'
  },
  devtool: 'source-map',
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
