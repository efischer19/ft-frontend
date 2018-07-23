const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin');

module.exports = {
  entry: {
    blog: './src/main.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: true,
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.[chunkhash].css',
    }),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
    new PreloadWebpackPlugin({
      rel: 'preload',
      include: 'allChunks',
    }),
    new HtmlBeautifyPlugin({
      config: {
        indent_size: 2,
      },
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};
