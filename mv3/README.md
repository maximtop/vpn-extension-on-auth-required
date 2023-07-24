# onAuthRequired bug in Chrome

## STR

1. Install the extension via `Load unpacked` from `extension` directory
1. Disable it. Restart browser.
1. Open https://maximtop.github.io/vpn-extension-on-auth-required
1. Open devtools, see that request are successfully
1. Launch proxy servers: `yarn proxy`
1. Enable extension
1. See that there is no onAuthRequired event in extension devtools and in the terminal with launched proxy
