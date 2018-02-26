const path = require('path');
const webpack = require('webpack');
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const PeerDepsExternalsPlugin = require('peer-deps-externals-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs2', // THIS IS THE MOST IMPORTANT LINE! :mindblow:
  },
  module: {
    rules: [
      {
        test: /\.js|.jsx$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components|build)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            plugins: [
              'transform-class-properties',
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  externals: [nodeExternals()],
  plugins: [
    new PeerDepsExternalsPlugin(),
    new webpack.IgnorePlugin(/node_modules$/),
    // new WebpackBundleAnalyzer(),
  ],
};
