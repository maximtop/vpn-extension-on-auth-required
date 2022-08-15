# VPN Extension OnAuthRequired Sample

## Usage

- install dependencies: `yarn install`
- build the extension: `yarn build`
- run the proxy servers: `yarn run proxy`
- install the extension from the `build` directory
- set host of proxy on background page calling
```javascript
await ext.proxy.set("localhost:8080")
```

## To reproduce bug:
- open https://mail.google.com/mail/u/0/#inbox
- set host of proxy on background page calling
```javascript
await ext.proxy.set("localhost:8080")
```
- reload gmail
- set host of proxy on background page calling
```javascript
await ext.proxy.set("localhost:8081")
```
- reload gmail
You should see the auth popup, and there is no `onAuthRequired` event fired.
