module.exports = function(api) {
  var isProd = api.cache(() => process.env.NODE_ENV === 'production')

  return {
    presets: [['@babel/preset-env']],
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }], // @
      ['@babel/plugin-proposal-class-properties', { loose: true }], // class
      ['@babel/plugin-transform-runtime'] // async await ...
    ]
  }
}
