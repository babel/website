"use strict";
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  stats: {
    children: true,
  },
  entry: {
    repl: "./js/repl/index.tsx",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  output: {
    // Don't bother with hashing/versioning the filename - Netlify does it
    // for us in prod.
    filename: "[name].js",
    publicPath: process.env.NODE_ENV === "production" ? "./repl/" : "./",
    path: __dirname + "/website/static/repl/",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./js/repl/index.html",
      inject: false,
    }),
    new webpack.ProvidePlugin({
      Buffer: ["buffer"],
    }),
    new webpack.DefinePlugin({
      "process.env": {
        BABEL_TYPES_8_BREAKING: false,
      },
    }),
  ],
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
