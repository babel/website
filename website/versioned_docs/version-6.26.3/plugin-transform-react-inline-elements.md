---
id: version-6.26.3-babel-plugin-transform-react-inline-elements
title: babel-plugin-transform-react-inline-elements
sidebar_label: transform-react-inline-elements
original_id: babel-plugin-transform-react-inline-elements
---

## Example

**In**

```javascript
<Baz foo="bar" key="1"></Baz>;
```

**Out**

```javascript
babelHelpers.jsx(Baz, {
  foo: "bar"
}, "1");

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

```js
// The plugin will still use React.createElement when `ref` or `object rest spread` is used
<Foo ref="bar" />
<Foo {...bar} />
```

## Installation

```sh
npm install --save-dev babel-plugin-transform-react-inline-elements
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["transform-react-inline-elements"]
}
```

### Via CLI

```sh
babel --plugins transform-react-inline-elements script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-react-inline-elements"]
});
```

## References

* [[facebook/react#3228] Optimizing Compiler: Inline React Elements](https://github.com/facebook/react/issues/3228)

