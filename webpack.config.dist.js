var webpack = require('webpack');

module.exports = {
  entry: './src/index.js',

  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel?stage=0', exclude: /node_modules/ }
    ]
  },

  externals: {
    react: 'React'
  },

  output: {
    filename: 'dist/material-ui-datetimepicker.js',
    libraryTarget: 'umd',
    library: 'Material-ui-datetimepicekr'
  },

  plugins: [
    new webpack.optimize.DedupePlugin()
  ],

  resolve: {
    extensions: ['', '.jsx', '.js']
  }
};
