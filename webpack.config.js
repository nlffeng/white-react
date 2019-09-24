const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const pathResolve = (relativePath) => path.resolve(__dirname, relativePath);

module.exports = {
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
        port: 3000,
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
            inject: true
        })
    ]
};
