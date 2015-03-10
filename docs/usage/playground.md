---
layout: docs
title: Playground
description: How to use the playground.
permalink: /docs/usage/playground/
redirect_from: /playground.html
---

> Playground is a proving ground for language ideas.

<blockquote class="babel-callout babel-callout-danger">
  <h4>Unofficial</h4>
  <p>
    These features are in no way endorsed by Ecma International and are not a
    part of any ECMAScript standard, nor are they necessarily on track to become
    part of any standard. <strong><em>Use with extreme caution</em></strong>.
  </p>
</blockquote>

<blockquote class="babel-callout babel-callout-info">
  <h4>Proposal Authors</h4>
  <p>
    If you are actively working on an
    <a href="https://github.com/tc39/ecma262">ECMAScript proposal</a>, this is a
    good place to get your ideas implemented with so that they may be tested
    with all of the latest language and API features.
  </p>
  <p>
    Please feel free to <a href="https://github.com/babel/babel/issues/new">open
    an issue</a> on the babel repository with your WIP spec, and we can discuss
    getting it implemented. Be sure to include as much information as possible.
  </p>
</blockquote>

## Usage

```sh
$ babel --playground
```

```js
babel.transform("code", { playground: true });
```

<blockquote class="babel-callout babel-callout-info">
  <h4>Enables experimental</h4>
  <p>
    Enabling playground also enables experimental support.
  </p>
</blockquote>

## Features

### Memoization assignment operator

The memoization assignment operator allows you to lazily set an object property.
It checks whether there's a property defined on the object and if there isn't
then the right hand value is set.

This means that `obj.x` in the following case `var obj = { x: undefined }; obj.x ?= 2;`
will still be `undefined` because it's already been defined within object `obj`.

**Uses**

```js
var obj = {};
obj.x ?= 2;
obj.x; // 2

obj = { x: 1 };
obj.x ?= 2;
obj.x; // 1

obj = { x: undefined }
obj.x ?= 2;
obj.x; // undefined
```

**Example**

```js
var obj = {};
obj.x ?= 2;
```

is equivalent to

```js
var obj = {};
if (!Object.prototype.hasOwnProperty.call(obj, "x")) obj.x = 2;
```

### Mallet assignment operator

The mallet assignment operator allows you to lazily initialize a value.
It checks whether the value is falsey, if it is then the right hand value is set.

While simplistically equivalent to `a = a || b`, it will never set an already truthy value.
It also optimizes deep object lookups and computed keys.

**Uses**

```js
var a;
a ||= 2;
a; // 2

obj = { x: 1 };
obj.x ||= 2;
obj.x; // 1

obj = { x: undefined }
obj.x ||= 2;
obj.x; // 2
```

**Example**

```js
var obj = { deep: {} };
obj.deep.x ||= 2;
```

is equivalent to

```js
var obj = {};

var _o = obj.deep;
if (!_o.x) _o.x = 2;
```
