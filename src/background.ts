import { proxy } from './proxy';
import { ext } from './ext';

// @ts-ignore
global.ext = ext;

(async () => {
    await proxy.init({
        username: 'proxy',
        password: 'proxy',
    });
})();
