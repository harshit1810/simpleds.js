const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const config = {
    entry: './lib/index.js',
    plugins: [
        new CleanWebpackPlugin(['dist'])
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin()
        ]
    },
    output: {
        filename: 'main.simpleds.js',
        path: path.resolve(__dirname, 'dist'),
        globalObject: 'this',
        library: 'simpleds'
    }
};

module.exports = (env, argv) => {

    if (argv.mode === 'development') {
        config.devtool = 'source-map';
    }

    return config;
};