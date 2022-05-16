const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const configFile = path.resolve(process.argv[2]);
const configs = require(configFile);

const webpackAsync = async (config, configName) => {
    return new Promise((resolve, reject) => {
        webpack(config, (err, stats) => {
            if (err || stats.hasErrors()) {
                console.error(err);
            } else {
                console.log(`build ${configName} successfully!`);
            }
            resolve();
        });
    });
};

const taskAsync = async () => {
    for (const configName in configs) {
        await webpackAsync(configs[configName], configName);
    }
};

taskAsync();
