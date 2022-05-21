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
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new (require('html-webpack-plugin'))({
            title: 'MusicMaker',
        }),
    ],
    devServer: {
        client: {
            overlay: false,
            logging: 'error',
        }
    }
};
