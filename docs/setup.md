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
      <h2><span class="step-no">2</span> Installation</h2>
      {% include tools/items.md name="install" %}
    </div>

    <div class="step step-setup">
      <h2><span class="step-no">3</span> Usage</h2>

      {% include tools/items.md name="usage" %}

      <blockquote class="babel-callout babel-callout-warning">
        <h4>Warning!</h4>
        <p>
          <a href="/blog/2015/10/29/6.0.0/">Babel 6 was just released!</a> This means that it might take some time for all possible integrations to upgrade. Make sure to check the compatibility of your chosen integration.
        </p>
      </blockquote>
    </div>

    <div class="step step-setup">
      <h2><span class="step-no">4</span> Create <code>.babelrc</code> configuration file</h2>

      <p>Great! You've configured Babel but you haven't made it actually <em>do</em> anything. Create a <a href="/docs/usage/babelrc">.babelrc</a> config in your project root and enable some <a href="/docs/plugins">plugins</a>.</p>
      
      <blockquote class="babel-callout babel-callout-info">
        <h4>Note</h4>
        <p>
          Pre-6.x, Babel enabled certain transformations by default. However, Babel 6.x <i>does not</i> ship with any transformations enabled. You need to explicitly tell it what transformations to run. The simplest way to do this is by using a <a href="http://babeljs.io/docs/plugins/#presets">preset</a>, such as the <a href="https://babeljs.io/docs/plugins/preset-es2015/">ES2015 Preset</a>.
        </p>
      </blockquote>
    </div>
  </div>
</div>
