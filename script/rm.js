const fs = require('fs');
const path = require('path');

// check if file exsits
const fileExists = (filePath) => {
    const fileStat = fs.statSync(filePath, { throwIfNoEntry: false });
    return Boolean(fileStat);
};

// dont remove files outside lib diretory
const innerLib = (absPath) => {
    const libPath = path.resolve('./lib');
    return absPath.includes(libPath);
};

// rm

const filePath = process.argv[2];

if (filePath) {
    const absPath = path.resolve(filePath);
    if (innerLib(absPath) && fileExists(absPath)) {
        fs.rmdirSync(absPath, { recursive: true });
    }
}
