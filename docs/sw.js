/* eslint-disable no-restricted-globals,no-console */
self.addEventListener('install', () => {
    // Forces the waiting service worker to become the active service worker
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

setInterval(() => {
    fetch('https://www.cloudflare.com/cdn-cgi/trace')
        .then((response) => response.text())
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}, 1000); // Fetch every second

self.addEventListener('fetch', (event) => {
    event.respondWith(fetch(event.request));
});
