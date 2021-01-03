/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require('path');
const devMode = process.env.NODE_ENV !== 'production';

const cwp = new (require('clean-webpack-plugin').CleanWebpackPlugin)();
const hwp = new (require('html-webpack-plugin'))({
    title: 'MusicMaker',
    favicon: path.resolve(__dirname, '../public/favicon.ico'),
    template: path.resolve(__dirname, '../public/index.html'),
});
const mcepFun = () => new (require('mini-css-extract-plugin'))({});
const cmwpFun = () => new (require('css-minimizer-webpack-plugin'))();

const plugins = devMode ? [cwp, hwp] : [cwp, hwp, mcepFun()];
const optimization = {
    splitChunks: {
        chunks: 'all',
    },
    minimizer: devMode ? ['...'] : ['...', cmwpFun()],
};
module.exports = { plugins, optimization };
