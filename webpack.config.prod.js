const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const entryConfig = require('./entry.config');

module.exports = {
    entry: entryConfig,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        library: 'CodishUI',
        libraryTarget: 'umd',
    },
    externals: {
        react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react',
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom',
        },
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            include: [
                path.resolve(__dirname, 'src')
            ],
            exclude: /node_modules/,
            loader: 'babel-loader',
        }, {
            test: /\.css$/,
            exclude: /node_modules/,
            loader: ['style-loader', {
                loader: 'css-loader',
                options: {
                    importLoaders: 1,
                }
            }, 'postcss-loader']
        }, {
            test: /\.{jpg|jpeg|gif|png|svg}$/,
            exclude: /node_modules/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            }]
        }]
    },
    resolve: {
        modules: [
            'node_modules',
            path.resolve(__dirname, 'src')
        ],
        extensions: ['.js', '.json', '.jsx', '.css'],
    },
    target: 'web',
    mode: 'production',
    optimization: {
        minimize: true
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new LodashModuleReplacementPlugin()
    ]
}
