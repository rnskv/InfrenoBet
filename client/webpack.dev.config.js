const webpack = require('webpack');

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');

module.exports = () => {
    const env = dotenv.config().parsed;
    const envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {});

    return ({
        entry: './src/index.jsx',
        output: {
            path: path.join(__dirname, '/dist'),
            filename: 'index_bundle.js',
        },
        resolve: {
            extensions: ['.js', '.jsx'],
            alias: {
                src: path.resolve(__dirname, 'src'),
                ui: path.resolve(__dirname, 'src/ui'),
                shared: path.resolve(__dirname, '../shared'),
            },
        },
        module: {
            rules: [
                {
                    test: /\.js|jsx$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                    },
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                },
            ],
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': envKeys
            }),
            new HtmlWebpackPlugin({
                template: path.join(__dirname, '/src/index.html'),
            }),
        ],
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            historyApiFallback: true,
            port: 9000,
        },
    });
};
