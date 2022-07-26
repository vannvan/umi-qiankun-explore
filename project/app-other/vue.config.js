const packageName = require('./package.json').name
module.exports = {
  // productionSourceMap: false,
  publicPath: '/',
  devServer: {
    host: '0.0.0.0',
    port: 6009,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "./src/assets/scss/theme.scss";`,
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        // '@': resolve('src'),
      },
    },
    output: {
      // 把子应用打包成 umd 库格式
      library: `${packageName}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${packageName}`,
    },
  },
}
