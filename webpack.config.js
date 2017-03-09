const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/app.js',
  output: {
    path: './dist',
    filename: '[name].js',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      include: /src|index\.js/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015'],
      },
    },
    {
      test: /\.css$/,
      loader: 'style-loader!css-loader',
    }],
  },
  devtool: 'cheap-module-eval-source-map',
  devserver: {
    colors: true,
    contentBase: './dist',
    inline: true,
    hot: true,
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
    }),
    new HtmlWebpackPlugin({
      entry: './src/js/app.js',
      output: {
        hash: true,
        path: 'dist',
        filename: 'testing.html',
      },
    }),
  ],
  debug: true,
  resolve: {
    modules: ['node_modules', 'src'],
    alias: {
      fullcalendarCSS: path.join(__dirname, './node_modules/fullcalendar/dist/fullcalendar.css'),
      appCSS: path.join(__dirname, './src/css/custom.css'),
    },
  },
};
