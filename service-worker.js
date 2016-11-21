---
---

importScripts('/scripts/sw-toolbox.js');

var swOptions = {
  debug: true
}

var preCachedRessources = [
  {% for page in site.pages %}
  '{{ page.url }}',
  {% endfor %}
];

toolbox.precache(preCachedRessources);

toolbox.router.get('/(.*)', toolbox.cacheFirst, swOptions);
