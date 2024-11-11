const { defineConfig } = require("@vue/cli-service");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "./",
  chainWebpack(config) {
    config.plugin("monaco").use(new MonacoWebpackPlugin());
  },
  devServer: {
    historyApiFallback: true,
  },
});
