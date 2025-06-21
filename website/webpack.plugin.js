const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = function () {
  return {
    name: "docusaurus-webpack-plugin",
    configureWebpack(config, isServer, { currentBundler }) {
      return {
        plugins: [
          new currentBundler.instance.DefinePlugin({
            "process.env": {
              BABEL_TYPES_8_BREAKING: false,
            },
          }),
          new MonacoWebpackPlugin(),
        ],
      };
    },
  };
};
