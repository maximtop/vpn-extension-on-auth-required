const set = (config: chrome.types.ChromeSettingSetDetails): Promise<void> => {
    return new Promise((resolve) => {
        chrome.proxy.settings.set(config, () => {
            resolve();
        });
    });
};

const clear = (): Promise<void> => new Promise((resolve) => {
    chrome.proxy.settings.clear({}, () => {
        resolve();
    });
});

export const proxy = {
    set,
    clear,
};
