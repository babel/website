---
layout: docs
title: ES2015 modules to CommonJS transform
description:
permalink: /docs/plugins/transform-es2015-modules-commonjs/
package: babel-plugin-transform-es2015-modules-commonjs
---

<blockquote class="babel-callout babel-callout-info">
  <h4>Babel 6 Changes</h4>
  <p>
    Babel 6 changed some behavior by not doing <code>module.exports = exports['default']</code> anymore in the modules transforms. To keep this functionality, use [babel-plugin-add-module-exports](https://www.npmjs.com/package/babel-plugin-add-module-exports), so that updating to Babel 6 isn't a breaking change since users that don't use ES modules don't have to do <code>require("your-module").default</code>.
  </p>
</blockquote>

This plugin transforms ES2015 modules to CommonJS.

[CommonJS (CJS) Modules/1.1](http://wiki.commonjs.org/wiki/Modules/1.1)

## Example

**In**

```javascript
export default 42;
```

**Out**

```javascript
Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = 42;
```

## Options `loose`

As per the spec, `import` and `export` are only allowed to be used at the top
level. When in loose mode these are allowed to be used anywhere.

And by default, when using exports with babel a non-enumerable `__esModule` property
is exported.

```javascript
var foo = exports.foo = 5;

Object.defineProperty(exports, "__esModule", {
  value: true
});
```

In environments that don't support this you can enable loose mode on `es6.modules`
and instead of using `Object.defineProperty` an assignment will be used instead.

```javascript
var foo = exports.foo = 5;
exports.__esModule = true;
```

## Installation

```sh
$ npm install babel-plugin-transform-es2015-modules-commonjs
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```js
// without options
{
  "plugins": ["transform-es2015-modules-commonjs"]
}

// with options
{
  "plugins": [
    ["transform-es2015-modules-commonjs", {
      "allowTopLevelThis": false,
      "strict": false,
      "loose": false
    }]
  ]
}
```

### Via CLI

```sh
$ babel --plugins transform-es2015-modules-commonjs script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-es2015-modules-commonjs"]
});
```
