---
layout: page
title: Using Babel
description: How to use Babel with your tool of choice
permalink: /docs/setup/
redirect_from:
 - /docs/using-babel/
 - /plugins.html
 - /docs/using-6to5/
custom_js_with_timestamps:
- tools.js
---

<div class="container docs-content">
  <div class="step-wizard">
    <div class="step">
      <h2><span class="step-no">1</span> Choose your tool</h2>

      {% for tool in site.data.tools %}
        <h5>{{tool.name}}</h5>

        <div class="btn-group">
          {% for item in tool.items %}
            <div class="btn btn-default" data-name="{{item[0]}}">{{item[1]}}</div>
          {% endfor %}
        </div>
      {% endfor %}
    </div>

    <div class="step step-install">
      <h2><span class="step-no">2</span> Install</h2>
      {% include tools/items.md name="install" %}
    </div>

    <div class="step step-setup">
      <h2><span class="step-no">3</span> Usage</h2>
      {% include tools/items.md name="usage" %}
    </div>
  </div>
</div>
