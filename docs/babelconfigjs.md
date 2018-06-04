---
title: babel.config.js
id: babelconfigjs
---

## Lookup behavior

Unlike other formats (see [configuration guide](configuration.md))...

## Merging behavior

Unlike other formats (see [configuration guide](configuration.md))...

## Conditional configuration

Since it's just a regular JavaScript file, you can write any arbitrary conditions before returning the configuration, for example:

```js
module.exports = function () {
  const plugins = [ ... ];

  if (true === false) {
    plugins.push(...);
  }

  return { plugins };
}
```

### Environment

A conditional configuration is useful when you want to use certain plugins/presetns based on the current environement, for example:

```js
module.exports = function () {
  const plugins = [ ... ];

  if (process.env["REMOVE_DEBUG"] === 1) {
    plugins.push("babel-plugin-remove-console-debug");
  }

  return { plugins };
}
```

You can invoke it using the CLI:

```sh
REMOVE_DEBUG=1 babel file.js
```

## API

```js
module.exports = function (api) {
  const babelEnv = api.env();
}
```
