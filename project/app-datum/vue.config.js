module.exports = {
  // productionSourceMap: false,
  publicPath: '/',
  devServer: {
    host: '0.0.0.0',
    port: 6008,
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
      library: `app-datum-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_app-datum`,
    },
  },
}
