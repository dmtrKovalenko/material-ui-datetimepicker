var webpack = require('webpack');
var PeerDepsExternalsPlugin = require('peer-deps-externals-webpack-plugin');

module.exports = {
  entry: './src/index.js',

  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel?stage=0', exclude: /node_modules/ }
    ]
  },

  output: {
    filename: 'dist/material-ui-datetimepicker.js',
    libraryTarget: 'umd',
    library: 'Material-ui-datetimepicker'
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new PeerDepsExternalsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: true,
      compress: {
        sequences     : true,
        booleans      : true,
        loops         : true,
        unused        : true,
        warnings      : false,
        drop_console  : true,
        unsafe        : true
      }
    })
  ],

  resolve: {
    extensions: ['', '.jsx', '.js']
  }
};
