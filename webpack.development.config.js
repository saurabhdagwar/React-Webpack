
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const { DefinePlugin } = require('webpack')
module.exports = {
    mode: "development",
    entry: './src/components/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },
    plugins: [new HtmlWebpackPlugin({
        template: './public/index.html',
        path: 'index.html',
    }),
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
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ]
    }
}