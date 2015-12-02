var webpack = require('webpack');

module.exports = {
  entry: {
    repl: './scripts/repl.js',
  },
  externals: {
    // Loaded from CDN
    lodash: '_',
    ace: 'ace',
    jquery: '$',
  },
  output: {
    filename: 'build/[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel']
      },
      {
        test: /\.json$/,
        loaders: ['json']
        }
    ]
  },
  node: {
    // Mock Node.js modules that Babel require()s but that we don't
    // particularly care about.
    fs: 'empty',
    module: 'empty',
    net: 'empty',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
  ]
}
