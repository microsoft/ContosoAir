var path = require('path');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    devtool: false,
    entry: './front.js',
    output: {
        filename: 'js/main.js',
        path: path.resolve(__dirname, 'public'),
    },
    resolve: {
        extensions: ['.css', '.scss'],
    },
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    {
                        loader: 'postcss-loader',
                        options: {
                          ident: 'postcss',
                          plugins: [
                            require('autoprefixer')({add: true })
                          ]
                        }
                    },
                    'sass-loader',
                ],
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/main.css',
        })
    ]
};