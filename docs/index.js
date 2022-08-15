(async () => {
    console.log(navigator.serviceWorker);
    await navigator.serviceWorker.register('sw.js');
})();
