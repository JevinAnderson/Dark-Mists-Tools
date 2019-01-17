const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const config = {
  entry: './app/index.js',
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'index_bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'] },
      { test: /\.scss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'] }
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style_bundle.css'
    }),
    new HtmlWebpackPlugin({
      template: 'app/index.html'
    }),
    new CopyWebpackPlugin([{ from: './app/assets', to: 'assets' }])
  ]
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessorOptions: {
        normalizeUrl: {
          stripWWW: false
        }
      }
    })
  );
} else {
  config.devtool = 'eval-source-map';
}

module.exports = config;
