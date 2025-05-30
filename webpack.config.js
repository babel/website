"use strict";
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

const config = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  stats: {
    children: true,
  },
  entry: {
    index: "./js/repl/index.tsx",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  devtool: "source-map",
  output: {
    // Don't bother with hashing/versioning the filename - Netlify does it
    // for us in prod.
    filename: "[name].js",
    publicPath: "/repl/",
    path: __dirname + "/website/static/repl/",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.ttf$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new MonacoWebpackPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        BABEL_TYPES_8_BREAKING: false,
      },
    }),
  ],
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
