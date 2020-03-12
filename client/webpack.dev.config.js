const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const dotenv = require('dotenv');

module.exports = () => {
    const env = dotenv.config().parsed;
    const envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {});

    const client = {
        entry: {
            client: './src/index.jsx',
        },
        output: {
            path: path.join(__dirname, '/dist'),
            filename: 'inferno-[name].js',
            publicPath: path.join('/dist/'),
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
                'process.env': envKeys,
            }),
            new CopyPlugin([
                {
                    from: path.resolve(__dirname, 'src/resources'),
                    to: path.resolve(__dirname, 'dist/resources'),

                },
            ]),
            new HtmlWebpackPlugin({
                template: path.join(__dirname, '/src/index.html'),
            }),
        ],
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            historyApiFallback: true,
            host: env.CLIENT_HOST,
            port: env.CLIENT_PORT,
        },
    };

    const server = {
        entry: {
            server: './src/server/app.js',
        },
        target: 'node',
        devtool: 'source-map',
        output: {
            path: path.join(__dirname, '/dist'),
            filename: 'inferno-[name].js',
            publicPath: path.join('/dist/'),
        },
        resolve: {
            extensions: ['.js', '.jsx'],
            alias: {
                src: path.resolve(__dirname, 'src'),
                ui: path.resolve(__dirname, 'src/ui'),
                shared: path.resolve(__dirname, '../shared'),
            },
        },
        externals: [nodeExternals()],
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
                    use: [
                        'isomorphic-style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new MiniCssExtractPlugin(),
            new webpack.BannerPlugin({
                banner: 'require("source-map-support").install();',
                raw: true,
                entryOnly: false,
            }),
            new webpack.DefinePlugin({
                'process.env': envKeys,
            }),
            new CopyPlugin([
                {
                    from: path.resolve(__dirname, 'src/resources'),
                    to: path.resolve(__dirname, 'dist/resources'),

                },
            ]),
            new HtmlWebpackPlugin({
                template: path.join(__dirname, '/src/index.html'),
            }),
        ],
    };
    return [client, server];
};
