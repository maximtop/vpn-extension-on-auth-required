/* eslint-disable no-restricted-globals,no-console */
const set = (config) => {
    return new Promise((resolve) => {
        chrome.proxy.settings.set(config, () => {
            resolve();
        });
    });
};

const clear = () => new Promise((resolve) => {
    chrome.proxy.settings.clear({}, () => {
        resolve();
    });
});

const remove = (
    options,
    types,
) => {
    return new Promise((resolve, reject) => {
        chrome.browsingData.remove(options, types, () => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            }
            resolve();
        });
    });
};

const browser = {
    proxy: {
        set,
        clear,
    },
    browsingData: {
        remove,
    },
};

/**
 * Sleep for ms
 * @param ms
 */
const sleep = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};

const onAuthRequiredHandler = async (details, callback) => {
    console.log(details);

    // imitate async
    await sleep(500);

    callback({
        authCredentials: {
            username: 'proxy',
            password: 'proxy',
        },
    });
};

const setProxy = async (hostname) => {
    const pacScript = `
function FindProxyForURL(url, host) {
    return "PROXY ${hostname}";
}`;
    const config = {
        value: {
            mode: 'pac_script',
            pacScript: {
                data: pacScript,
                mandatory: true,
            },
        },
        scope: 'regular',
    };

    await browser.proxy.set(config);
    console.log('proxy set');
};

const main = () => {
    // top level
    chrome.webRequest.onAuthRequired.addListener(
        onAuthRequiredHandler,
        { urls: ['<all_urls>'] },
        ['asyncBlocking'],
    );

    (async () => {
        await setProxy('localhost:8080');
    })();
};

main();
