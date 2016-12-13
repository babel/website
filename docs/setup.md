---
layout: page
title: Using Babel
description: How to use Babel with your tool of choice
permalink: /docs/setup/
redirect_from:
 - /docs/using-babel/
 - /plugins.html
 - /docs/using-6to5/
 - /docs/usage/browser/
 - browser.html
custom_js_with_timestamps:
- tools.js
---

<div class="container docs-content">
  <div class="step-wizard">
    <div class="step">
      <h2><span class="step-no">1</span> Choose your tool (try CLI)</h2>

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
    </div>

    <div class="step step-setup">
      <h2><span class="step-no">4</span> Create <code>.babelrc</code> configuration file</h2>

      <p>
        Great! You've configured Babel but you haven't made it actually <em>do</em> anything. Create a <a href="/docs/usage/babelrc">.babelrc</a> config in your project root and enable some <a href="/docs/plugins">plugins</a>.
      </p>

      <p>
        To start, you can use the the <a href="https://babeljs.io/docs/plugins/preset-latest/">latest preset</a>, which enables transforms for ES2015+
      </p>

<!--lint disable no-shortcut-reference-link, no-undefined-references-->
{% highlight shell %}
npm install babel-preset-env --save-dev
{% endhighlight %}
<!--lint enable no-shortcut-reference-link, no-undefined-references-->

      <p>
        In order to enable the preset you have to define it in your <code>.babelrc</code> file, like this:
      </p>

<!--lint disable no-shortcut-reference-link, no-undefined-references-->
{% highlight json %}
{
  "presets": ["env"]
}
{% endhighlight %}
<!--lint enable no-shortcut-reference-link, no-undefined-references-->

      <p>
        <strong>Note</strong>: Running a Babel 6.x project using npm 2.x can cause performance problems because of the way npm 2.x installs dependencies. This problem can be eliminated by either switching to npm 3.x or running npm 2.x with the <a href="https://docs.npmjs.com/cli/dedupe">dedupe</a> flag. To check what version of npm you have run
      </p>

<!--lint disable no-shortcut-reference-link, no-undefined-references-->
{% highlight shell %}
npm --version
{% endhighlight %}
<!--lint enable no-shortcut-reference-link, no-undefined-references-->

    </div>
  </div>
</div>
