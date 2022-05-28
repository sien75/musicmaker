const path = require('path');

const base = {
    mode: 'production',
    entry: {
        musicmaker: path.resolve(__dirname, '../src/index.ts'),
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
};

const lite = {
    ...base,
    output: {
        ...base.output,
        filename: '[name].lite.js',
        clean: false,
    },
    externals: {
        ramda: 'R',
    },
};

const pure = {
    ...base,
    output: {
        ...base.output,
        filename: '[name].pure.js',
        clean: false,
    },
    externals: {
        ramda: 'R',
        tone: 'Tone',
        '@tonejs/midi': 'Midi',
    },
};

module.exports = {
    'musicmaker.js': base,
    'musicmaker.lite.js': lite,
    'musicmaker.pure.js': pure,
};
