"use strict";
const TerserPlugin = require("terser-webpack-plugin");

const config = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: {
    repl: "./js/repl/index.js",
    minirepl: "./js/minirepl.js",
  },
  output: {
    // Don't bother with hashing/versioning the filename - Netlify does it
    // for us in prod.
    filename: "[name].js",
    path: __dirname + "/website/static/js/build/",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  plugins: [],
  externals: {
    codemirror: "CodeMirror",
    "lz-string": "LZString",
    react: "React",
    "react-dom": "ReactDOM",
  },
  performance: {
    hints: false,
  },
  // workaround https://bugs.webkit.org/show_bug.cgi?id=212725
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            ascii_only: true,
          },
        },
      }),
    ],
  },
};

module.exports = config;
