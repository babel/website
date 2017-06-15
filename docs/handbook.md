---
layout: page
title: Babel Plugin Handbook
description: This document covers how to create Babel plugins.
permalink: /docs/handbook/
package_source: babel-handbook
package: babel-handbook
---

{% capture readme %}
    {% include babel-handbook/translations/en/plugin-handbook.md %}
{% endcapture %}

<div class="container docs-content">
  {{ readme
      | newline_to_br
      | split: "<br />"
      | shift | shift
      | join: "<br />"
      | remove: "<br />"
      | markdownify
    }}
</div>
