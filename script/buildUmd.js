const webpack = require('webpack');
const colors = require('colors');

const configs = require('../config/webpack.umd.js');

const webpackAsync = async (config, configName) => {
    return new Promise((resolve, reject) => {
        console.log(`building ${configName}...\n`);
        webpack(config, (err, stats) => {
            if (err) {
                console.error(err);
            } else {
                console.log(
                    stats.toString({
                        colors: true,
                    })
                );
                console.log(`\nbuild ${configName} successfully!`.green.bold);
            }
            console.log('\n********************\n');
            resolve();
        });
    });
};

const taskAsync = async () => {
    console.log('\n********************\n');
    for (const configName in configs) {
        await webpackAsync(configs[configName], configName);
    }
};

taskAsync();
