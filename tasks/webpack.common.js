const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { updateManifest } = require('./helpers');

const BACKGROUND_PATH = path.resolve(__dirname, '../src/background');

const config = {
    mode: 'development',
    devtool: 'eval-source-map',
    optimization: {
        minimize: false,
    },
    entry: {
        background: BACKGROUND_PATH,
    },
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: '[name].js',
    },
    resolve: {
        extensions: ['*', '.js', '.ts'],
    },

    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: ['cache-loader', { loader: 'babel-loader', options: { babelrc: true } }],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin({ cleanAfterEveryBuildPatterns: ['!**/*.json'] }),
        new HtmlWebpackPlugin({
            template: path.join(BACKGROUND_PATH, 'index.html'),
            filename: 'background.html',
            chunks: ['background'],
            cache: false,
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'manifest.common.json'),
                    to: 'manifest.json',
                    transform: (content) => updateManifest(content),
                },
            ],
        }),
    ],
};

module.exports = config;
