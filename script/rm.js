const fsp = require('fs/promises');
const path = require('path');

// check if file exsits
const fileExists = async (filePath) => {
    try {
        const fileStat = await fsp.stat(filePath);
    } catch {
        return false;
    }
    return true;
};

// dont remove files outside lib diretory
const innerLib = (absPath = '') => {
    const libPath = path.resolve('./lib');
    return absPath.includes(libPath);
};

// rm

const rm = async () => {
    const filePath = process.argv[2];
    const absPath = path.resolve(filePath);
    if (innerLib(absPath) && (await fileExists(absPath))) {
        await fsp.rm(absPath, { recursive: true });
    }
};

rm();
