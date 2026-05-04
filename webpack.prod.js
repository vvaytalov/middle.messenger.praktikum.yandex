const createConfig = require('./webpack.common');

module.exports = createConfig({
    mode: 'production',
    isDevelopment: false,
});
