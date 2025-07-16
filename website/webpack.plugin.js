const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = function () {
  return {
    name: "docusaurus-webpack-plugin",
    configureWebpack() {
      return {
        devtool: process.env.NODE_ENV === "production" ? false : "source-map",
        plugins: [new MonacoWebpackPlugin()],
      };
    },
  };
};
