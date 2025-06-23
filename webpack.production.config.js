
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const { DefinePlugin } = require('webpack')
module.exports = {
    mode: "production",
    devtool: "source-map",
    entry: './src/components/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            path: 'index.html'
        }),
        new MiniCssExtractPlugin(),
        new DefinePlugin({
            API_URL: JSON.stringify("http://api/v2/graphql")
        })
    ],
    resolve: {
        extensions: ['.js', '.json', '.jsx'],
        alias: {
            '@': path.resolve(__dirname, 'src/'),
        }
    },
    module: {
        rules: [
            {
                test: /\.(?:js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        targets: "defaults",
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ]
    },
    optimization: {
        chunkIds: "named",
        minimize: true,
        minimizer: [new TerserPlugin()],
        splitChunks: {
            chunks: 'async',
            minSize: 20000,
            minRemainingSize: 0,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            enforceSizeThreshold: 50000,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    name: "vendor",
                    chunks: "all",
                    reuseExistingChunk: true,
                },
                default: {
                    minChunks: 1,
                    priority: -20,
                    reuseExistingChunk: true,
                    name: "common",
                    chunks: "all"
                },
            },
        },
    },
    performance: {
        hints: 'warning',
        maxAssetSize: 100000,
        maxEntrypointSize: 400000,
    },
}

