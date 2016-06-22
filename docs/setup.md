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
            <a href="#installation" class="btn btn-default" data-name="{{item[0]}}">{{item[1]}}</a>
          {% endfor %}
        </div>
      {% endfor %}
    </div>

    <div class="step step-install">
      <h2 id="installation"><span class="step-no">2</span> Installation</h2>
      {% include tools/items.md name="install" %}
    </div>

    <div class="step step-setup">
      <h2><span class="step-no">3</span> Usage</h2>

      {% include tools/items.md name="usage" %}

      <blockquote class="babel-callout babel-callout-info">
        <h4>Note</h4>
        <p>
          Pre-6.x, Babel enabled certain transformations by default. However, Babel 6.x <i>does not</i> ship with any transformations enabled. You need to explicitly tell it what transformations to run. The simplest way to do this is by using a <a href="https://babeljs.io/docs/plugins/#presets">preset</a>, such as the <a href="https://babeljs.io/docs/plugins/preset-es2015/">ES2015 Preset</a>. You can install it with <pre>npm install babel-preset-es2015 --save-dev</pre> (In order to emulate a full ES2015+ environment, you will need to use a polyfill (one option is <a href="/docs/usage/polyfill/">babel-polyfill</a>) for things like Promise, Set, Map, or instance methods like String.repeat or Array.includes since Babel only does syntax transformations.
        </p>
      </blockquote>

      <blockquote class="babel-callout babel-callout-warning">
        <h4>Warning!</h4>
        <p>
          <a href="/blog/2015/10/29/6.0.0">Babel 6 was just released!</a> This means that it might take some time for all possible integrations to upgrade. Make sure to check the compatibility of your chosen integration.
        </p>
      </blockquote>
    </div>

    <div class="step step-setup">
      <h2><span class="step-no">4</span> Create <code>.babelrc</code> configuration file</h2>

      <p>
        Great! You've configured Babel but you haven't made it actually <em>do</em> anything. Create a <a href="/docs/usage/babelrc">.babelrc</a> config in your project root and enable some <a href="/docs/plugins">plugins</a>.
      </p>

      <p>
        Assuming you have installed the <a href="https://babeljs.io/docs/plugins/preset-es2015/">ES2015 Preset</a>, in order to enable it you have to define it in your <code>.babelrc</code> file, like this:
      </p>

      {% highlight json %}
{
  "presets": ["es2015"]
}
      {% endhighlight %}

      <p>
        <strong>Note</strong>: Running a Babel 6.x project using npm 2.x can cause performance problems because of the way npm 2.x installs dependencies. This problem can be eliminated by either switching to npm 3.x or running npm 2.x with the <a href="https://docs.npmjs.com/cli/dedupe">dedupe</a> flag. To check what version of npm you have run <pre>npm --version</pre>
      </p>
    </div>
  </div>
</div>
