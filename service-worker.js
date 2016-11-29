importScripts('/scripts/sw-toolbox.js');

var VERSION = '{{ site.time }}';

var contentCacheOptions = {
  name: 'Babel-Cache-' + VERSION,
  maxEntries: 150,
  maxAgeSeconds: 604800
}

var cdnCacheOptions = {
  name: 'cdn'
}

toolbox.router.get('/*', toolbox.cacheFirst, { origin: 'cdnjs.cloudflare.com', cache: cdnCacheOptions });
toolbox.router.get('/*', toolbox.cacheFirst, { origin: 'cdn.jsdelivr.net', cache: cdnCacheOptions });

toolbox.router.get('/*', toolbox.fastest, { cache: contentCacheOptions });
