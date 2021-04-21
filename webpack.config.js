const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const createReloadPlugin = require('./src/electron/reload.js');
const ElectronReloadPlugin = createReloadPlugin({
    path: __dirname,
    logLevel: 0
});
const DEV = process.env.NODE_ENV === 'development';

module.exports = {
    // target: 'electron-renderer',
    entry: './src/index.tsx',
    output: {
        path: path.join(__dirname, 'output', 'code'),
        filename: '[contenthash].bundle.js',
        publicPath: '../code/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: '../index.html',
            favicon: './public/assets/icon.ico',
            publicPath: './code/'
        }),
        new MiniCssExtractPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: 'public',
                    to: '..'
                }
            ]
        }),
        new CleanWebpackPlugin(),
        DEV && ElectronReloadPlugin('electron-renderer')
    ].filter(Boolean),
    module: {
        rules: [
            {
                test: /\.(jsx?|tsx?)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false
                        }
                    },
                    'postcss-loader'
                ]
            }
        ]
    },
    resolve: {
        // Webpack is big dumb-dumb and doesn't recognize typescript by default
        extensions: [
            '.tsx',
            '.ts',
            '.js'
        ]
    },
    // Persistent cache
    cache: {
        type: 'filesystem',
        buildDependencies: {
            // Invalidate cache when webpack.config.js is changed
            config: [__filename],
        },
    },
    devtool: DEV ? 'source-map' : undefined
};
