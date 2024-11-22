---
id: babel-compat-data
title: "@babel/compat-data"
---

This package provides compatibility data for various JavaScript features across different browser and runtime environments. It is used by [`@babel/preset-env`](./preset-env.md) internally to determine the required Babel plugins for a given set of [compilation targets](./options.md#targets). The compat data is extracted from the [compat-table project](https://github.com/compat-table/compat-table).

## Install

```shell npm2yarn
npm install --save-dev @babel/compat-data
```

## Usage

### plugins
```javascript title="my-babel-plugin.js"
import _plugins from "@babel/compat-data/plugins";
const pluginsCompatData = _plugins.default;
```

The `pluginsCompatData` is an object with the Babel plugin short name as the key and a compat data entry as its value. Each entry is an object with a browser name as the key and the minimum supported version as its value.

For example, `pluginsCompatData["transform-object-rest-spread"]` will return an object:

```javascript title="my-babel-plugin.js"
{
    "chrome": "60",
    "opera": "47",
    "edge": "79",
    "firefox": "55",
    "safari": "11.1",
    "node": "8.3",
    "deno": "1",
    "ios": "11.3",
    "samsung": "8",
    "opera_mobile": "44",
    "electron": "2.0"
}
```
Here, the minimum Chrome version with object-rest-spread support is `60`. Therefore, `@babel/preset-env` will enable the object-rest-spread transform only if users are compiling to Chrome versions older than `60`, and likewise for other browsers. Check the [source](https://github.com/babel/babel/blob/main/packages/babel-compat-data/data/plugins.json) for supported Babel plugin short names.

If you would like to know whether object-rest-spread is supported for any given `targets`, you don't have to manually compare it against the compat-data entry. Instead, you can use the [`isRequired`](./helper-compilation-targets.md#isrequired) utility from `@babel/helper-compilation-targets`:

```javascript title="my-babel-plugin.js"
import { isRequired } from "@babel/helper-compilation-targets";

module.exports = api => {
  // Check if the targets have native object-rest-spread support
  const objectRestSpreadSupported = !isRequired(
    "transform-object-rest-spread",
    api.targets()
  );
};
```
