const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const resolve = (dir) => path.join(__dirname, dir)
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 9527,
    host: 'localhost',
    hot: true,
    open: true
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('@', resolve('src'))
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap((options) => {
        options.compilerOptions = { preserveWhitespace: true }
        return options
      })
  }
})
