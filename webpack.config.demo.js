var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

  devtool: 'eval',

  entry: {
    demo: ['webpack/hot/dev-server', './demo/index.jsx']
  },

  module: {
    loaders: [
      { test: /\.jsx$/, loader: 'babel?stage=0', exclude: /node_modules/ },
      { test: /\.css$/, loaders: ['style-loader', 'css-loader']  }
    ]
  },

  output: {
    filename: 'demo/bundle.js'
  },

  resolve: {
    extensions: ['', '.jsx', '.js']
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],

  devServer: {
    contentBase: './demo'
  }

};
