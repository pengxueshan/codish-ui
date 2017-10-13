const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: [
        './src/test.js'
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            include: [
                path.resolve(__dirname, 'src')
            ],
            exclude: [
                path.resolve(__dirname, 'node_modules')
            ],
            loader: 'babel-loader',
        }, {
            test: /\.css$/,
            loader: ['style-loader', {
                loader: 'css-loader',
                options: {
                    importLoaders: 1,
                }
            }, 'postcss-loader']
        }]
    },
    resolve: {
        modules: [
            'node_modules',
            path.resolve(__dirname, 'src')
        ],
        extensions: ['.js', '.json', '.jsx', '.css'],
    },
    devtool: 'source-map',
    target: 'web',
    devServer: {
        proxy: {
            '/api': 'http://localhost:3330'
        },
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        historyApiFallback: true,
        hot: false,
        https: false,
        noInfo: true,
        port: 3330
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'template/index.html'
        }),
    ]
}
