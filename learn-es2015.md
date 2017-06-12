---
layout: docs
title: Learn ES2015
description: A detailed overview of ECMAScript 2015 features. Based on Luke Hoban's es6features repo.
permalink: /learn-es2015/
redirect_from:
 - /docs/learn-es6/
 - /docs/learn-es2015/
 - /features.html
 - /docs/tour/
---
<blockquote class="babel-callout babel-callout-info">
  <h3>es6features</h3>
  <p>
    This document was originally taken from Luke Hoban's excellent
    <a href="https://git.io/es6features">es6features</a> repo. Go give it a star
    on GitHub!
  </p>
</blockquote>

<blockquote class="babel-callout babel-callout-info">
  <h4>REPL</h4>
  <p>
    Be sure to try these features out in the online
    <a href="/repl">REPL</a>.
  </p>
</blockquote>

## Introduction

> ECMAScript 2015 is an ECMAScript standard that was ratified in June 2015.

ES2015 is a significant update to the language, and the first major update to the language since ES5 was standardized in 2009. Implementation of these features in major JavaScript engines is [underway now](https://kangax.github.io/es5-compat-table/es6/).

See the [ES2015 standard](http://www.ecma-international.org/ecma-262/6.0/index.html)
for full specification of the ECMAScript 2015 language.

## ECMAScript 2015 Features

<!-- To not break some existing links to here, just in case. -->
<a id="arrows"></a>

{% capture es2015 %}{% include es2015.md %}{% endcapture %}
{{ es2015 | markdownify }}
