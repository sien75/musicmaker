/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
process.env.NODE_ENV = 'development';
module.exports = {
    mode: 'development',
    ...require('./entries'),
    ...require('./plugins'),
    ...require('./loaders'),
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        open: true,
        contentBase: '../build/doc',
    },
};
