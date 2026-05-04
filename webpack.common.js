const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { createCspMetaContent } = require('./src/config/csp');

module.exports = ({ mode, isDevelopment }) => ({
    mode,
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: isDevelopment ? '[name].bundle.js' : '[contenthash].bundle.js',
    },
    resolve: {
        extensions: ['.ts', '.js', '.json', '.css', '.html'],
    },
    module: {
        exprContextCritical: false,
        rules: [
            {
                test: /\.ts?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: path.resolve(__dirname, 'tsconfig.json'),
                        },
                    },
                ],
                exclude: /(node_modules)/,
            },
            {
                test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
                type: 'asset/resource',
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
        ],
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: mode,
            HOST_API: 'https://ya-praktikum.tech/api/v2',
            HOST_WS: 'wss://ya-praktikum.tech/ws/chats/',
            HOST_RESOURCES: 'https://ya-praktikum.tech/api/v2/resources',
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/static/index.html'),
            filename: 'index.html',
            csp: createCspMetaContent({ isDevelopment }),
        }),
        new MiniCssExtractPlugin({
            filename: isDevelopment ? '[name].css' : '[contenthash].css',
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: './src/assets/img/favicon.png',
                    to: 'favicon.png',
                },
            ],
        }),
        new CleanWebpackPlugin(),
    ],
});
