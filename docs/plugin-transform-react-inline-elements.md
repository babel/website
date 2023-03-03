---
id: babel-plugin-transform-react-inline-elements
title: "@babel/plugin-transform-react-inline-elements"
sidebar_label: react-inline-elements
---

## Note

When used alongside `@babel/plugin-transform-runtime`, polyfills (by default including `Symbol`) are specifically scoped to not pollute the global scope. This breaks usage with React, as it won't have access to that polyfill and will cause your application to fail in legacy browsers.

Even if `['@babel/plugin-transform-runtime', { helpers: true, polyfill: false }]` is specified, it might still break, since `helpers` come precompiled.

In this case, we recommend importing/requiring `@babel/polyfill` in the entry point of your application and using `@babel/preset-env` with the `useBuiltIns` option to only include the polyfills your targets need. Alternatively, you can also import/require `core-js/modules/es6.symbol` by itself.

This transform **should be enabled only in production** (e.g., just before minifying your code) because, although it improves runtime performance, it makes warning messages more cryptic and skips important checks that happen in development mode, including propTypes.

## Example

**In**

```js title="JavaScript"
<Baz foo="bar" key="1" />
```

**Out**

```js title="JavaScript"
babelHelpers.jsx(
  Baz,
  {
    foo: "bar",
  },
  "1"
);

/**
 * Instead of
 *
 * React.createElement(Baz, {
 *   foo: "bar",
 *   key: "1",
 * });
 */
```

**Deopt**

```js title="JavaScript"
// The plugin will still use React.createElement when `ref` or `object rest spread` is used
<Foo ref="bar" />
<Foo {...bar} />
```

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-transform-react-inline-elements
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-transform-react-inline-elements"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-transform-react-inline-elements script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-react-inline-elements"],
});
```

## References

- [[facebook/react#3228] Optimizing Compiler: Inline React Elements](https://github.com/facebook/react/issues/3228)
