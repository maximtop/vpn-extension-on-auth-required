const pJson = require('../package.json');

const updateManifest = (manifestJson) => {
    const manifest = JSON.parse(manifestJson.toString());

    const updatedManifest = {
        ...manifest,
        version: pJson.version,
    };

    return Buffer.from(JSON.stringify(updatedManifest, null, 4));
};

module.exports = {
    updateManifest,
};
