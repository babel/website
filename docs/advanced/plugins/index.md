---
layout: docs
title: Plugins
description: How to use and write plugins for Babel
permalink: /docs/advanced/plugins/
redirect_from:
 - /docs/usage/plugins/
---

<blockquote class="babel-callout babel-callout-danger">
  <h4>Highly experimental</h4>
  <p>
    Internal APIs are still in a high state of flux. If you find something that is <strong>not</strong>
    documented on this page then you're at risk of it changing without notice.
  </p>
</blockquote>

<blockquote class="babel-callout babel-callout-info">
  <h4>Incomplete</h4>
  <p>
    <a href="https://github.com/babel/babel.github.io">Pull requests</a> expanding on existing or adding additional documentation are <strong>extremely</strong> appreciated.
  </p>
</blockquote>

## Usage

Plugins are resolved relative to the current working directory.

[Node API](/docs/usage/api/):

```javascript
require("babel").transform("code", {
  plugins: ["foo-bar"]
});
```

[CLI](/docs/usage/cli/):

```sh
$ babel --plugins foo-bar script.js
```

[babelrc](/docs/usage/babelrc/):

```javascript
{
  "plugins": ["foo-bar"]
}
```

### Specifying position

By default, plugins are ran **before** the internal ones. You can alternatively specify the position via
a colon after the plugin name. ie:

```javascript
require("babel").transform("code", {
  plugins: ["foo-bar:after", "bar-foo:before"]
});
```

```sh
$ babel --plugins foo-bar:after bar-foo:before script.js
```

## AST documentation

The Babel parser is heavily based on [Acorn](https://github.com/marijnh/acorn) which makes use of the
extremely common and versatile [ESTree](https://github.com/estree/estree) AST format:

 * [Core](https://github.com/estree/estree/blob/master/spec.md)
 * [ES6](https://github.com/estree/estree/blob/master/es6.md)

## Plugin setup

**package.json**

```javascript
{
  "name": "babel-plugin-foo",
  "version": "1.0.0",
  "dependencies": {
    "babel-core": "^5.0.0"
  }
}
```

**index.js**

```javascript
module.exports = function (babel) {
  return new babel.Transformer("foo-bar", {
    // visitors
  });
};
```

You can find a simple plugin example as well as usage in the [sebmck/babel-plugin-example](https://github.com/sebmck/babel-plugin-example) repo.

## Plugin API

### [Visiting](/docs/advanced/plugins/visiting)

How to visit nodes

### [Manipulation](/docs/advanced/plugins/manipulation)

How to remove and replace nodes

### [Scope](/docs/advanced/plugins/scope)

How to use scoping and track variables

