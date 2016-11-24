---
layout: docs
title: Babel Plugin Handbook
description: This document covers how to create Babel plugins.
permalink: /docs/handbook/
---

{% capture readme %}
    {% include babel-handbook/translations/en/plugin-handbook.md %}
{% endcapture %}

{{ readme
    | newline_to_br
    | split: "<br />"
    | shift | shift
    | join: "<br />"
    | strip_html
    | markdownify
}}
