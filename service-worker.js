---
---

importScripts('/scripts/sw-toolbox.js');

const VERSION = 1;

toolbox.cache.name = "Babel-Cache-" + VERSION;

var preCachedRessources = [
  {% for page in site.pages %}
  '{{ page.url }}',
  {% endfor %}
];

toolbox.precache(preCachedRessources);

toolbox.router.get('/*', toolbox.cacheFirst);
toolbox.router.get('/*', toolbox.cacheFirst, { origin: "cdnjs.cloudflare.com" });
toolbox.router.get('/*', toolbox.cacheFirst, { origin: "cdn.jsdelivr.net" });
toolbox.router.get('/*', toolbox.cacheFirst, { origin: "unpkg.com" }); // for repl
toolbox.router.post('/*', toolbox.cacheFirst, { origin: "algolia.net" }); // Cache Algolia search response
