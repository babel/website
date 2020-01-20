---
id: version-7.3.0-babel-plugin-transform-named-capturing-groups-regex
title: @babel/plugin-transform-named-capturing-groups-regex
sidebar_label: transform-named-capturing-groups-regex
original_id: babel-plugin-transform-named-capturing-groups-regex
---

> NOTE: This plugin generates code that needs ES6 regular expressions
> functionalities. If you need to support older browsers, use either
> the `runtime: false` option or import a proper polyfill (e.g. `core-js`).

## Examples

**In**

```javascript
var re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;

console.log(re.exec("1999-02-29").groups.year)
```

**Out**

```javascript
var re = _wrapRegExp(/(\d{4})-(\d{2})-(\d{2})/, { year: 1, month: 2, day: 3 });

console.log(re.exec("1999-02-29").groups.year)
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-named-capturing-groups-regex
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-transform-named-capturing-groups-regex"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-transform-named-capturing-groups-regex script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-transform-named-capturing-groups-regex"]
});
```

## Options

### `runtime`

`boolean`, defaults to `true`

When this option is disabled, Babel doesn't wrap RegExps with the `_wrapRegExp` helper.
The output only supports internal group references, and not runtime properties:

```js

var stringRe = /(?<quote>"|').*?\k<quote>/;

stringRe.test("'foo'"); // "true", works
stringRe.exec("'foo'").groups.quote; // Error
```

> You can read more about configuring plugin options [here](https://babeljs.io/docs/en/plugins#plugin-options)
