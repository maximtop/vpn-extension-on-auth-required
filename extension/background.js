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

class Proxy {
    host = null;

    username = null;

    password = null;

    init = async (config) => {
        await this.clear();
        this.username = config.username;
        this.password = config.password;
    };

    onAuthRequiredHandler = (details) => {
        console.log(details);

        if (!this.username || !this.password) {
            throw new Error('If hosts match then username and password must be set');
        }

        return {
            authCredentials: {
                username: this.username,
                password: this.password,
            },
        };
    };

    addOnAuthRequiredListener() {
        chrome.webRequest.onAuthRequired.addListener(this.onAuthRequiredHandler, { urls: ['<all_urls>'] }, ['blocking']);
    }

    removeOnAuthRequiredListener() {
        chrome.webRequest.onAuthRequired.removeListener(this.onAuthRequiredHandler);
    }

    setProxyConfig = async (hostname) => {
        this.host = hostname;

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
    };

    clearAuthCache = async () => {
        const options = {
            origins: [
                'http://localhost',
                'https://localhost',
            ],
        };
        const types = { cookies: true };

        await browser.browsingData.remove(options, types);
    };

    set = async (hostname) => {
        this.removeOnAuthRequiredListener();
        if (this.host) {
            await this.clearAuthCache();
        }
        await this.setProxyConfig(hostname);
        this.addOnAuthRequiredListener();
    };

    clear = async () => {
        chrome.webRequest.onAuthRequired.removeListener(this.onAuthRequiredHandler);
        await browser.proxy.clear();
        console.log('Proxy cleared');
    };
}

const proxy = new Proxy();

const main = () => {
    self.ext = {
        proxy,
    };

    (async () => {
        await proxy.init({
            username: 'proxy',
            password: 'proxy',
        });
    })();
};

main();
