---
id: babel-plugin-proposal-duplicate-named-capturing-groups-regex
title: "@babel/plugin-proposal-duplicate-named-capturing-groups-regex"
sidebar_label: duplicate-named-capturing-groups-regex
---

## Examples

**In**

```js title="JavaScript"
var re = /(?<year>\d{4})-(?<month>\d{2})|(?<month>\d{2})-(?<year>\d{4})/;

console.log(re.exec("02-1999").groups.year);
```

**Out**

```js title="JavaScript"
var re = _wrapRegExp(/(\d{4})-(\d{2})|(\d{2})-(\d{4})/, {
  year: [1, 4],
  month: [2, 3],
});

console.log(re.exec("02-1999").groups.year);
```

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-proposal-duplicate-named-capturing-groups-regex
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-proposal-duplicate-named-capturing-groups-regex"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-proposal-duplicate-named-capturing-groups-regex script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-proposal-duplicate-named-capturing-groups-regex"],
});
```

## Options

### `runtime`

`boolean`, defaults to `true`

When this option is disabled, Babel doesn't wrap RegExps with the `_wrapRegExp` helper.
The output only supports internal group references, and not runtime properties:

```js title="JavaScript"
var stringRe = /(?:(?<quote>")|(?<quote>')).*?\k<quote>/;

stringRe.test("'foo'"); // "true", works
stringRe.exec("'foo'").groups.quote; // undefined
```

:::tip
You can read more about configuring plugin options [here](https://babeljs.io/docs/en/plugins#plugin-options)
:::

## References

- [Proposal: Duplicate named capturing groups](https://github.com/tc39/proposal-duplicate-named-capturing-groups)
