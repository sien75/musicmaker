const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        index: path.resolve(__dirname, '../test/esm/index.ts'),
    },
    output: {
        path: path.resolve(__dirname, '../testResult'),
        filename: '[name].js',
        clean: true,
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            musicmaker: path.resolve(__dirname, '../lib/esm/index'),
        },
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.mp3$/,
                type: 'asset/resource',
            }
        ],
    },
    plugins: [
        new (require('html-webpack-plugin'))({
            title: 'MusicMaker',
            template: path.resolve(__dirname, '../test/esm/index.html'),
            // publicPath: path.resolve(__dirname, '../'),
        }),
    ],
    devServer: {
        static: path.resolve(__dirname, '../'),
        client: {
            overlay: false,
            logging: 'error',
        },
    },
    externals: {
        musicmaker: 'MusicMaker',
    },
};
