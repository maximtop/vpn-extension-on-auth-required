import { proxy } from './proxy';
import { browsingData } from './browsingData';

export const browser = {
    proxy,
    browsingData,
    webRequest: chrome.webRequest,
};
