---
---

importScripts('/scripts/sw-toolbox.js');

var swOptions = {
  debug: true
}

var preCachedRessources = [
  '{{ "/css/main.css" | prepend: site.baseurl }}?t={{ site.time | date_to_xmlschema }}"',
  {% for page in site.pages %}
  '{{ page.url }}',
  {% endfor %}
];

toolbox.precache(preCachedRessources);

toolbox.router.get('/(.*)', toolbox.cacheFirst, swOptions);
