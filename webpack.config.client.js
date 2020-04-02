const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        app: ['./src/client.tsx', 'webpack-hot-middleware/client'],
        vendor: ['react', 'react-dom']
    },
    output: {
        path: path.resolve(__dirname, 'dist/public'),
        filename: '[name].bundle.js',
        publicPath: "/"
    },
    devtool : 'inline-source-map',
    resolve:{
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
    },
    // context: path.resolve(__dirname, '..'),
    module:{
        rules:[
            {
                test: /\.(ts|tsx)$/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    {
                        loader: "ts-loader",
                        options: {}
                    }
                ]
            },
            {
                enforce: "pre",
                test: /\.js$/,
                include: path.resolve(__dirname, 'dist/public'),
                loader: "source-map-loader"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './index.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};
