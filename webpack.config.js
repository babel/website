'use strict';

const webpack = require('webpack');

const DEV_SERVER_PORT = 34512;

const config = {
  entry: {
    repl: './js/repl/index.js',
  },
  output: {
    // Don't bother with hashing/versioning the filename - Netlify does it
    // for us in prod.
    filename: '[name].js',
    path: __dirname + '/build/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
  ],
  externals: {
    codemirror: 'CodeMirror',
    'lz-string': 'LZString',
    react: 'React',
    'react-dom': 'ReactDOM',
  },
};

if (process.env.NODE_ENV !== 'production') {
  // Enable hot reloading in dev
  config.output.publicPath = `http://localhost:${DEV_SERVER_PORT}/`;
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.devServer = {
    compress: true,
    contentBase: false,
    hot: true,
    port: DEV_SERVER_PORT,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  };
}

module.exports = config;
