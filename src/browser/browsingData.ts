const remove = (
    options: chrome.browsingData.RemovalOptions,
    types: chrome.browsingData.DataTypeSet,
): Promise<void> => {
    return new Promise((resolve, reject) => {
        chrome.browsingData.remove(options, types, () => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            }
            resolve();
        });
    });
};

export const browsingData = {
    remove,
};
