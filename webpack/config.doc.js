/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
process.env.NODE_ENV = 'production';
module.exports = {
    mode: 'production',
    ...require('./entries'),
    ...require('./plugins'),
    ...require('./loaders'),
};
