import { proxy } from './proxy';
import { ext } from './ext';

// @ts-ignore
global.ext = ext;

(async () => {
    await proxy.init({
        // TODO set your proxy config here
        username: '6df4c9d0-dd63-4c3f-87a5-4ae67de68e0c',
        password: 'vbojz47ywdj2vd0h',
    });
})();
