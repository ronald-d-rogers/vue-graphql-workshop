module.exports = {
  plugins: [
    require('postcss-pxtorem')(),
    require('postcss-preset-env')({
      stage: 0,
      features: {
        'nesting-rules': true
      }
    }),
    require('autoprefixer')({
      grid: true,
      remove: false
    })
  ]
}