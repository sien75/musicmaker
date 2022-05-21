const fsp = require('fs/promises');
const path = require('path');

// check if file exsits
const fileExists = async (filePath) => {
    try {
        await fsp.stat(filePath);
    } catch {
        return false;
    }
    return true;
};

// rm

const rm = async () => {
    const filePath = process.argv[2];
    const absPath = path.resolve(filePath);
    if ((await fileExists(absPath))) {
        await fsp.rm(absPath, { recursive: true });
    }
};

rm();
