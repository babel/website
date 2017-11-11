importScripts('https://unpkg.com/sw-toolbox@3.6.0/sw-toolbox.js');

var VERSION = 1
  , contentCacheOptions = {
  name: 'Babel-Cache-' + VERSION,
  maxAgeSeconds: 60 * 60 * 6
}
  , cdnCacheOptions = {
  name: 'cdn',
  maxAgeSeconds: 60 * 60 * 6
};

toolbox.precache([
  '/offline.html'
]);

toolbox.router.get('/*', toolbox.networkFirst, {origin: 'cdnjs.cloudflare.com', cache: cdnCacheOptions});

toolbox.router.get('/*', toolbox.networkFirst, {origin: 'cdn.jsdelivr.net', cache: cdnCacheOptions});

toolbox.router.get('/*', toolbox.networkFirst, {cache: contentCacheOptions});
