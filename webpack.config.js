
const path = require('path');
var webpack = require("webpack");


module.exports = {
    entry: {
        app: './src/index.js',
        // print: './src/API.js',
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    // resolve: {
    //     alias: {
    //         jquery: "jquery/src/jquery",
    //     }
    // },
    externals: {
        jquery: 'jQuery',
        $: 'jQuery',
    },
    // plugins: [
    //     new webpack.ProvidePlugin({
    //         $: "jquery",
    //         jQuery: "jquery"
    //     })
    // ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            },
        ],

    },
};