/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require('path');
module.exports = {
    entry: path.resolve(__dirname, '../examples/index.tsx'),
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../build/doc'),
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
        alias: {
            musicmaker: path.resolve(__dirname, '../src'),
        },
    },
};
