const webpack = require('webpack');
const path = require('path');
const helpers = require('../shared/helpers/webpack');

module.exports = (cli = { mode: 'development' }) => {
    helpers.showStatus({ mode: cli.mode, appName: 'server.api'});
    return {
        entry: {
            app: './src/app.js'
        },
        mode: cli.mode,
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
                'process.env': helpers.getDotEnvVariables({ mode: cli.mode }),
            }),
        ],
        target: 'node',
        devtool: 'eval-source-map'
    }
};
