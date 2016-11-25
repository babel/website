---
---

importScripts('/scripts/sw-toolbox.js');

var VERSION = '{{ site.time }}';

var contentCacheOptions = {
  cache: {
    name: "Babel-Cache-" + VERSION,
    maxEntries: 150,
    maxAgeSeconds: 604800
  }
}

var preCachedRessources = [
  {% for page in site.pages %}
{% if page.url contains 'docs' %} '{{ page.url }}', {% endif %}
  {% endfor %}
];

toolbox.precache(preCachedRessources);

toolbox.router.get('/*', toolbox.cacheFirst, contentCacheOptions);
toolbox.router.get('/*', toolbox.cacheFirst, { origin: "cdnjs.cloudflare.com", name: "cdn" });
toolbox.router.get('/*', toolbox.cacheFirst, { origin: "cdn.jsdelivr.net", name: "cdn" });
toolbox.router.get('/*', toolbox.cacheFirst, { origin: "unpkg.com" }); // for repl
