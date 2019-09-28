const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const baseWebpackConf = require('./webpack.base.conf');
const { pathResolve, generateName } = require('./utils');

const prodWebpackConf = merge(baseWebpackConf, {
  mode: 'production',
  output: {
    path: pathResolve('dist'),
    filename: generateName('js'),
    chunkFilename: generateName('js'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
          'less-loader',
        ],
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: generateName('css'),
      chunkFilename: generateName('css'),
    }),
    // 原模块单独打包成闭包，该插件可将ES6模块提升到一个闭包中，需将babel中的modules选项置为false
    new webpack.optimize.ModuleConcatenationPlugin(),
    // 该插件回根据模块的相对路径生成一个四位数的hash作为模块id
    new webpack.HashedModuleIdsPlugin(),
    new HtmlWebpackPlugin({
      filename: pathResolve('dist/index.html'),
      template: './src/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
      chunksSortMode: 'dependency',
    }),
  ],
  optimization: {
    minimizer: [
      new TerserJSPlugin({}),
      new OptimizeCSSAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
      })
    ],
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      }
    }
  }
});

// `npm run build --isVersion` 将会以版本号为构建包，不使用hash，默认是以hash方式构建包
if (process.env.npm_config_isVersion) {
  delete prodWebpackConf.optimization.runtimeChunk;
  delete prodWebpackConf.optimization.splitChunks;
}

console.log(prodWebpackConf.optimization);

// `npm run build --report` 将会开启服务，查看构建包信息
if (process.env.npm_config_report) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  prodWebpackConf.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = prodWebpackConf;
