---
layout: page
title: Using Babel
description: How to use Babel with your tool of choice
permalink: /docs/using-babel/
redirect_from:
 - /plugins.html
 - /docs/setup/
 - /docs/using-6to5/
---

<div class="container docs-content">
  <div>
    <h2><span class="babel-tools-step-number">1</span> Choose your tool</h2>

    <select class="babel-tools-selector form-control input-lg">
      <option value="">Please choose a tool</option>

      {% for tool in site.data.tools %}
        <optgroup label="{{tool.name}}">

          {% for item in tool.items %}
            <option value="{{item[0]}}">
              {{item[1]}}
            </option>
          {% endfor %}

        </optgroup>
      {% endfor %}

    </select>

    {% for tool in site.data.tools %}
      {% for item in tool.items %}
        <div class="babel-tools-item" id="{{item[0]}}">
          <h2>
            <span class="babel-tools-step-number">2</span>
            Install
          </h2>

          {% capture template_name %}tools/{{item[0]}}/install.md{% endcapture %}
          {% capture template %}{% include {{template_name}} %}{% endcapture %}
          {{ template | markdownify }}

          <h2>
            <span class="babel-tools-step-number">3</span>
            Usage
          </h2>

          {% capture template_name %}tools/{{item[0]}}/usage.md{% endcapture %}
          {% capture template %}{% include {{template_name}} %}{% endcapture %}
          {{ template | markdownify }}
        </div>
      {% endfor %}
    {% endfor %}
  </div>
</div>

<script src="{{ "/scripts/tools.js" | prepend: site.baseurl }}?t={{ site.time | date_to_xmlschema }}"></script>
