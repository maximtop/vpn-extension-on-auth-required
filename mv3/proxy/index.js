/* eslint-disable no-console */
const http = require('http');
const setup = require('proxy');
const basicAuthParser = require('basic-auth-parser');

function auth(req, fn) {
    const auth = req.headers['proxy-authorization'];

    if (!auth) {
        return fn(null, false);
    }

    const parsed = basicAuthParser(auth);

    console.log('parsed "Proxy-Authorization": %j', parsed);

    if (parsed.username !== 'proxy' || parsed.password !== 'proxy') {
        return fn(null, false);
    }

    return fn(null, true);
}

const server = setup(http.createServer());

server.authenticate = auth;

server.listen(8080, () => {
    const port = server.address().port;
    console.log('HTTP(s) proxy server listening on port %d', port);
});
