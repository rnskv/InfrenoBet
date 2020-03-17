const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const helpers = require('../shared/helpers/webpack');


function getDefaultConfig({ mode }) {
    return {
        mode,
        resolve: {
            extensions: ['.js', '.jsx'],
            alias: {
                src: path.resolve(__dirname, 'src'),
                ui: path.resolve(__dirname, 'src/ui'),
                shared: path.resolve(__dirname, '../shared'),
            },
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': helpers.getDotEnvVariables({ mode }),
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
}

function getClientConfig({ mode }) {
    return helpers.mergeDeep({
        entry: {
            client: './src/index.jsx',
        },
        output: {
            path: path.join(__dirname, '/dist'),
            filename: 'inferno-[name].js',
            publicPath: path.join('/dist'),
        },
        module: {
            rules: [
                {
                    test: /\.svg$/,
                    loader: 'svg-inline-loader',
                },
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
    }, getDefaultConfig({ mode }));
}

function getServerConfig({ mode }) {
    return helpers.mergeDeep({
        entry: {
            server: './src/server/app.js',
        },
        target: 'node',
        devtool: 'source-map',
        output: {
            path: path.join(__dirname, '/dist'),
            filename: 'inferno-[name].js',
            publicPath: path.join('/dist'),
        },
        externals: [nodeExternals()],
        module: {
            rules: [
                {
                    test: /\.svg$/,
                    loader: 'svg-inline-loader',
                },
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
        ],
    }, getDefaultConfig({ mode }));
}

module.exports = (cli = { mode: 'development' }) => {
    helpers.showStatus({ mode: cli.mode, appName: 'client' });

    return [
        getClientConfig({ mode: cli.mode }),
        getServerConfig({ mode: cli.mode }),
    ];
};
