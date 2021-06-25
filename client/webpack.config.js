const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    devtool: 'cheap-module-source-map',
    devServer: {
        proxy: {
            "/api": {
                changeOrigin: true,
                cookieDomainRewrite: "localhost",
                target: 'http://localhost:5000',
                secure: false,
            },
            pathRewrite: {
                '^/api': ''
             }
        }

    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        chunkFilename: '[id].js',
        publicPath: ''
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
          },
          {
            test: /\.css$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        esModule: false,
                    },
                },
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1
                    }
                },
                'postcss-loader'
            ]
          },
          {
            test: /\.(png|jpe?g|gif|svg)$/,
            use: ['url-loader?limit=8000&name=images/[name].[ext]']
          }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename:'[id].css'
        }),
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.html',
            filename: 'index.html',
            inject: 'body'
        }),
    ]
}
