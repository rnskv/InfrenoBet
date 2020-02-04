const path = require('path');

module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    externals: {
        uws: 'uws'
    },
    resolve: {
        alias: {
            src: path.resolve(__dirname, 'src')
        }
    },
    mode: 'development',
    target: 'node',
    devtool: 'eval-source-map'
};
