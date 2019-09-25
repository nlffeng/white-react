const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const portfinder = require('portfinder');
const notifier = require('node-notifier');
const pkg = require('./../package.json');
const baseWebpackConf = require('./webpack.base.conf');

const pathResolve = (relativePath) => path.resolve(__dirname, '..', relativePath);

const devWebpackConf = merge(baseWebpackConf, {
  mode: 'development',
  output: {
    path: pathResolve('dist'),
    filename: '[name].bundle.js',
    publicPath: '',
    chunkFilename: "[chunkhash].js",
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
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
      onErrors: (severity, errors) => {
        if (severity !== 'error') {
          return;
        }
        const error = errors[0];
        notifier.notify({
          title: pkg.name,
          message: severity + ': ' + error.name,
          subtitle: error.file || '',
        });
      },
    }));

    devWebpackConf.devServer.port = port;
    resolve(devWebpackConf);
  });
});
