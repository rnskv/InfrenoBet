const webpack = require('webpack');
const path = require('path');
const dotenv = require('dotenv');

module.exports = () => {
    const env = dotenv.config().parsed;
    const envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {});


    return {
        entry: {
            app: './src/app.js'
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].js'
        },
        resolve: {
            alias: {
                src: path.resolve(__dirname, 'src'),
                shared: path.resolve(__dirname, '../shared'),
            }
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': envKeys,
            }),
        ],
        mode: 'development',
        target: 'node',
        devtool: 'eval-source-map'
    }
};
