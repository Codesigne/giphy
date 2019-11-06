// importScripts('/cache-polyfill.js');


self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open('airhorner').then(function (cache) {
            return cache.addAll([
                '/',
                //    '/index.html',
                //    '/index.html?homescreen=1',
                //    '/?homescreen=1',
                   '/jquery-3.1.0.js',
                '/app.bundle.js',
                //    '/sounds/airhorn.mp3'
            ]);
        })
    );
});

self.addEventListener('fetch', function (event) {

    console.log("sw :", event.request.url);
    console.log("caches :", caches);

    event.respondWith(

        caches.match(event.request).then(function (response) {

            return response || fetch(event.request);

        })

    );

});