const path = require('path');
const WebpackShellPlugin = require('webpack-shell-plugin-next');
var fs = require('fs');

// Calculate external dependencies for Webpack. Webpack searches for these
// packages in the node_modules instead of packing them into the bundle.
var nodeModules = {};

fs.readdirSync(path.resolve(__dirname,'node_modules')) // TODO make this realtive, 'E:/webpack-dummy/node_modules'
    .forEach(function(mod) {
        if (mod !== '.bin') {
            nodeModules[mod] = 'commonjs ' + mod;
        }
    });


module.exports = {
    mode: 'development',
    entry: './src/server.ts',
    output: {
        filename: "server.js",
        path: path.resolve(__dirname, 'dist'),
    },
    devtool : 'inline-source-map',
    resolve:{
        extensions: ['.tsx','.ts','.js']
    },
    watch: true,
    context: __dirname,
    module:{
        rules:[
            {
                test: /\.tsx?$/,
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
                include: [path.resolve(__dirname, 'dist')],
                loader: "source-map-loader"
            }
        ]
    },

    node: {
        __dirname: true,
        __filename: true,
    },
    externals: [nodeModules, {
        './../webpack.config.client.js': 'commonjs ' + require.resolve(__filename)
    }],

    plugins: [
        new WebpackShellPlugin({
            onBuildEnd: {
                scripts: ['npm run run:dev'],
                parallel: false,
                blocking: true
            }
        })
    ],
    target: 'node'
};
