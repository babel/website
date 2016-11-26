---
---

importScripts('/scripts/sw-toolbox.js');

var VERSION = '{{ site.time }}';

var contentCacheOptions = {
  name: "Babel-Cache-" + VERSION,
  maxEntries: 150,
  maxAgeSeconds: 604800
}

var cdnCacheOptions = {
  name: "cdn"
}

var preCachedRessources = [
  {% for page in site.pages %}
{% if page.url contains 'docs' %} '{{ page.url }}', {% endif %}
  {% endfor %}
];

toolbox.precache(preCachedRessources);

toolbox.router.get('/*', toolbox.cacheFirst, { origin: "cdnjs.cloudflare.com", cache: cdnCacheOptions });
toolbox.router.get('/*', toolbox.cacheFirst, { origin: "cdn.jsdelivr.net", cache: cdnCacheOptions });

toolbox.router.get('/*', toolbox.fastest, { cache: contentCacheOptions });
