const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");


module.exports = {
    watch: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 500,
        ignored: /node_modules/
    },
    entry: ['./script.js', './SCSS/custom.scss'],
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist'),

    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: { output: { comments: false }},
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    module: {
        rules: [
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            }],

    },
    plugins: [

            new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "SCSS/custom.css",
            chunkFilename: "[id].css"
        }),
        new CopyWebpackPlugin([
            { from: 'index.html', to: '' },
            { from: 'fonts', to: 'SCSS/fonts' },
            { from: 'images', to: 'images' }
            ], {})
    ]
};