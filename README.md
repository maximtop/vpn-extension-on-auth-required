# VPN Extension OnAuthRequired Sample

## Usage
- to install dependencies, run `npm install`
- set your credentials in the file `src/background.ts`
- to build extension run `yarn build`
- install extension unpacked form `build` directory
- set host of proxy on background page calling
```javascript
await ext.proxy.set("<host>")
```

## To reproduce bug:
- open https://mail.google.com/mail/u/0/#inbox
- set host of proxy on background page calling
```javascript
await ext.proxy.set("<host_1>")
```
- reload gmail
- set host of proxy on background page calling
```javascript
await ext.proxy.set("<host_2>")
```
- reload gmail
You should see auth popup, and there is no onAuthRequired event fired.
