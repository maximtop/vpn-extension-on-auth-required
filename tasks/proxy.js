const http = require('http');
const setup = require('proxy');
const basicAuthParser = require('basic-auth-parser');

function auth(req, fn) {
    console.log('authenticate(): "true"');

    // parse the "Proxy-Authorization" header
    const auth = req.headers['proxy-authorization'];
    if (!auth) {
        return fn(null, false);
    }

    const parsed = basicAuthParser(auth);
    console.log('parsed "Proxy-Authorization": %j', parsed);

    if (parsed.username !== 'proxy' && parsed.password !== 'proxy') {
        return fn(null, false);
    }

    return fn(null, true);
}

const server1 = setup(http.createServer());
server1.authenticate = auth;
server1.listen(8080, () => {
    const port = server1.address().port;
    console.log('HTTP(s) proxy server listening on port %d', port);
});

const server2 = setup(http.createServer());
server2.authenticate = auth;
server2.listen(8081, () => {
    const port = server2.address().port;
    console.log('HTTP(s) proxy server listening on port %d', port);
});
