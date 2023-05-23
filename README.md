# VPN Extension OnAuthRequired Sample

## Usage

- run the proxy servers: `yarn run proxy`
- install the extension from the `extension` directory
- set host of proxy on background page calling
```javascript
await ext.proxy.set("localhost:8080")
```

## To reproduce bug:
- run the proxy servers: yarn proxy
- install the extension from the extension directory
- open https://maximtop.github.io/vpn-extension-on-auth-required or https://mail.google.com/mail/u/0/#inbox, every website using service worker for caching and sending requests through it
- set host of proxy on background page calling
```javascript
await ext.proxy.set("localhost:8080")
```
- reload opened page
- set host of proxy on background page calling
```javascript
await ext.proxy.set("localhost:8081")
```
- reload opened page

You should see the auth popup, and there is no `onAuthRequired` event fired.
