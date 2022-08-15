import { browser } from '../browser';
import { log } from '../log';
import { getETld } from '../utils/url';

type ProxyConfig = {
    username: string,
    password: string,
};

type EmptyObject = {
    [K in any] : never
};

type OnAuthRequiredResponse = { authCredentials: chrome.webRequest.AuthCredentials } | EmptyObject;

class Proxy {
    private host: string | null = null;

    private username: string | null = null;

    private password: string | null = null;

    public init = async (config: ProxyConfig) => {
        this.username = config.username;
        this.password = config.password;

        await this.clear();
    };

    private onAuthRequiredHandler = (
        details: chrome.webRequest.WebAuthenticationChallengeDetails,
    ): OnAuthRequiredResponse => {
        log(details);

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

    private addOnAuthRequiredListener() {
        browser.webRequest.onAuthRequired.addListener(this.onAuthRequiredHandler, { urls: ['<all_urls>'] }, ['blocking']);
    }

    private removeOnAuthRequiredListener() {
        browser.webRequest.onAuthRequired.removeListener(this.onAuthRequiredHandler);
    }

    private setProxyConfig = async (hostname: string) => {
        this.host = hostname;

        const pacScript = `
function FindProxyForURL(url, host) {
    return "PROXY ${hostname}";
}`;
        const config: chrome.types.ChromeSettingSetDetails = {
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

    clearAuthCache = async (hostname: string): Promise<void> => {
        // IMPORTANT: you have to use the root domain of the proxy
        // (eg: if the proxy is at foo.bar.example.com, you need to use example.com).
        const rootDomain = getETld(hostname);

        const options = {
            origins: [
                `http://${rootDomain}`,
                `https://${rootDomain}`,
            ],
        };
        const types = { cookies: true };

        await browser.browsingData.remove(options, types);
    };

    public set = async (hostname: string) => {
        this.removeOnAuthRequiredListener();
        if (this.host) {
            await this.clearAuthCache(this.host);
        }
        await this.setProxyConfig(hostname);
        this.addOnAuthRequiredListener();
    };

    private clear = async () => {
        chrome.webRequest.onAuthRequired.removeListener(this.onAuthRequiredHandler);
        await browser.proxy.clear();
        log('Proxy cleared');
    };
}

export const proxy = new Proxy();
