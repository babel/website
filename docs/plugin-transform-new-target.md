---
id: babel-plugin-transform-new-target
title: "@babel/plugin-transform-new-target"
sidebar_label: new-target
---

> **NOTE**: This plugin is included in `@babel/preset-env`

## Example

```js title="JavaScript"
function Foo() {
  console.log(new.target);
}

Foo(); // => undefined
new Foo(); // => Foo
```

```js title="JavaScript"
class Foo {
  constructor() {
    console.log(new.target);
  }
}

class Bar extends Foo {}

new Foo(); // => Foo
new Bar(); // => Bar
```

### Caveats

This plugin relies on `this.constructor`, which means `super` must
already have been called when using untransformed classes.

```js title="JavaScript"
class Foo {}

class Bar extends Foo {
  constructor() {
    // This will be a problem if classes aren't transformed to ES5
    new.target;
    super();
  }
}
```

Additionally, this plugin cannot transform all `Reflect.construct` cases
when using `newTarget` with ES5 function classes (transformed ES6 classes).

```js title="JavaScript"
function Foo() {
  console.log(new.target);
}

// Bar extends Foo in ES5
function Bar() {
  Foo.call(this);
}
Bar.prototype = Object.create(Foo.prototype);
Bar.prototype.constructor = Bar;

// Baz does not extend Foo
function Baz() {}

Reflect.construct(Foo, []); // => Foo (correct)
Reflect.construct(Foo, [], Bar); // => Bar (correct)

Reflect.construct(Bar, []); // => Bar (incorrect, though this is how ES5
// inheritance is commonly implemented.)
Reflect.construct(Foo, [], Baz); // => undefined (incorrect)
```

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-transform-new-target
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-transform-new-target"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-transform-new-target script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-new-target"],
});
```
