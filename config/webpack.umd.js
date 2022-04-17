const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        'musicmaker': path.resolve(__dirname, '../src/index.ts'),
    },
    output: {
        path: path.resolve(__dirname, '../lib/umd'),
        filename: '[name].js',
        libraryTarget: 'umd',
        library: 'MusicMaker',
        umdNamedDefine: true,
        clean: true,
    },
    resolve: {
        extensions: ['.ts'],
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
};
