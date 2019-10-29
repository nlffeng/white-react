const webpack = require('webpack');
const merge = require('webpack-merge');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const portfinder = require('portfinder');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const baseWebpackConf = require('./webpack.base.conf');
const { pathResolve } = require('./utils');

const devWebpackConf = merge(baseWebpackConf, {
  mode: 'development',
  output: {
    path: pathResolve('dist'),
    filename: '[name].js',
    chunkFilename: "[name].js",
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
          'less-loader',
        ],
      },
    ]
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    clientLogLevel: 'warning',
    compress: true,
    hot: true,
    inline: true,
    overlay: {
      warnings: false,
      errors: true
    },
    quiet: true,
    port: 3000,
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: pathResolve('mocks'),
        to: 'mocks',
        ignore: ['.*']
      }
    ]),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      inject: true
    }),
  ]
});

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = devWebpackConf.devServer.port;
  portfinder.getPort(function (err, port) {
    if (err) {
      reject(err);
      return;
    }

    devWebpackConf.plugins.push(new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`You application is running here http://localhost:${port}`]
      },
    }));

    devWebpackConf.devServer.port = port;
    resolve(devWebpackConf);
  });
});
