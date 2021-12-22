const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: 'index.html',
})

module.exports = {
  mode: 'development',
  entry: './src/index.jsx',
  plugins: [htmlPlugin],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    alias: {
      '@components': path.resolve(__dirname, 'src/components/'),
      '@decorators': path.resolve(__dirname, 'src/decorators/'),
      '@logic': path.resolve(__dirname, 'src/logic/'),
    },
  },
  module: {
    rules: [
      { test: /\.jsx?$/, loader: 'ts-loader', exclude: [path.resolve(__dirname, 'node_modules/')] },
      { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
      { test: /\.(jpg|png|ttf)$/, loader: 'file-loader' },
    ],
  },
  output: {
    filename: '[name].chunkhash.bundle.js',
    chunkFilename: '[name].chunkhash.bundle.js',
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          enforce: true,
        },
      },
    },
  },
}
