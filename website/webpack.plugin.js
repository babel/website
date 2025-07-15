const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = function () {
  return {
    name: "docusaurus-webpack-plugin",
    configureWebpack() {
      return {
        cache: false,
        plugins: [new MonacoWebpackPlugin()],
      };
    },
  };
};
