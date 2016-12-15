---
layout: docs
title: Env preset
description: Babel preset that automatically determines the Babel plugins you need based on your supported environments. Uses compat-table
permalink: /docs/plugins/preset-env/
package: babel-preset-env
package_source: babel-preset-env
---

{% capture readme %}
  {% include babel-preset-env/README.md %}
{% endcapture %}

{{ readme
    | newline_to_br
    | split: "<br />"
    | shift | shift | shift | shift
    | join: "<br />"
    | remove: "<br />"
    | markdownify
}}
