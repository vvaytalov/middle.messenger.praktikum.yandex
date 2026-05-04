const path = require('path');
const createConfig = require('./webpack.common');

module.exports = {
    ...createConfig({
        mode: 'development',
        isDevelopment: true,
    }),
    devtool: 'eval-source-map',
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        compress: true,
        port: 3000,
        hot: true,
        historyApiFallback: true,
    },
};
