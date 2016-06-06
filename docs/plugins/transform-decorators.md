---
layout: docs
title: Decorators transform
description:
permalink: /docs/plugins/transform-decorators/
package: babel-plugin-transform-decorators
---

<blockquote class="babel-callout babel-callout-warning">
  <h4>Decorators are not currently supported</h4>
  <p>
    Decorators are disabled in Babel v6, pending a proposal update – see <a href="https://phabricator.babeljs.io/T2645">issue T2645</a>.
  </p>
  <p>
    Until Babel officially supports decorators again, you might want to try the third-party <a href="https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy">transform-decorators-legacy</a> plugin, or use Babel v5.
  </p>
</blockquote>

This plugin allows Babel to transform decorators.

## Example

(examples are from proposal)

### Simple class decorator

```js
@annotation
class MyClass { }

function annotation(target) {
   target.annotated = true;
}
```

### Class decorator

```js
@isTestable(true)
class MyClass { }

function isTestable(value) {
   return function decorator(target) {
      target.isTestable = value;
   }
}
```

### Class function decorator

```js
class C {
  @enumerable(false)
  method() { }
}

function enumerable(value) {
  return function (target, key, descriptor) {
     descriptor.enumerable = value;
     return descriptor;
  }
}
```

## Installation

```sh
$ npm install babel-plugin-transform-decorators
```

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "plugins": ["transform-decorators"]
}
```

## References

* [Proposal: Javascript Decorators](https://github.com/wycats/javascript-decorators/blob/master/README.md)
