---
---

importScripts('/scripts/sw-toolbox.js');

const VERSION = '{{ site.time }}';

toolbox.cache.name = "Babel-Cache-" + VERSION;
toolbox.cache.maxEntries = 150;
toolbox.cache.maxAgeSeconds = 604800;

var preCachedRessources = [
  {% for page in site.pages %}
{% if page.url contains 'docs' %} '{{ page.url }}', {% endif %}
  {% endfor %}
];

toolbox.precache(preCachedRessources);

toolbox.router.get('/*', toolbox.cacheFirst);
toolbox.router.get('/*', toolbox.cacheFirst, { origin: "cdnjs.cloudflare.com" });
toolbox.router.get('/*', toolbox.cacheFirst, { origin: "cdn.jsdelivr.net" });
toolbox.router.get('/*', toolbox.cacheFirst, { origin: "unpkg.com" }); // for repl
