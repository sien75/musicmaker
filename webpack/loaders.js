/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require('path');
const devMode = process.env.NODE_ENV !== 'production';
const mcepLoaderFun = () => require('mini-css-extract-plugin').loader;
const include = [
    path.resolve(__dirname, '../src'),
    path.resolve(__dirname, '../examples'),
];
module.exports = {
    module: {
        rules: [
            {
                test: /\.(t|j)sx?$/,
                loader: 'babel-loader',
                options: { cacheDirectory: true },
                include,
            },
            {
                test: /\.scss$/,
                use: [
                    devMode ? 'style-loader' : mcepLoaderFun(),
                    'css-loader',
                    'sass-loader',
                ],
                include,
            },
        ],
    },
};
