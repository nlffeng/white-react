const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const portfinder = require('portfinder');
const notifier = require('node-notifier');
const pkg = require('./../package.json');

const pathResolve = (relativePath) => path.resolve(__dirname, '..', relativePath);

const devWebpackConf = {
  mode: 'development',
  entry: pathResolve('./src/index.js'),
  output: {
    path: pathResolve('dist'),
    filename: '[hash].bundle.js',
    publicPath: '',
    chunkFilename: "[chunkhash].js",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: pathResolve('./src'),
        loader: 'babel-loader',
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    clientLogLevel: 'none',
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
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      inject: true
    }),
  ]
};

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

    resolve(devWebpackConf);
  });
});
