module.exports = {
  productionSourceMap: false,
  css: {
    extract: false,
    loaderOptions: {
      css: {
        use: ['style-loader', 'postcss-loader'], // default setting
        localIdentName: '[name]_[local]_[hash:base64:5]'
      }
    }
  },
  lintOnSave: true
}
