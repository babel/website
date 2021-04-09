---
id: babel-plugin-transform-react-constant-elements
title: @babel/plugin-transform-react-constant-elements
sidebar_label: react-constant-elements
---

This plugin can speed up reconciliation and reduce garbage collection pressure by hoisting
React elements to the highest possible scope, preventing multiple unnecessary reinstantiations.

## Example

**In**

```jsx
const Hr = () => {
  return <hr className="hr" />;
};
```

**Out**

```jsx
const _ref = <hr className="hr" />;

const Hr = () => {
  return _ref;
};
```

**Deopts**

- **Spread Operator**

  ```jsx
  <div {...foobar} />
  ```

- **Refs**

  ```jsx
  <div ref="foobar" />
  <div ref={node => this.node = node} />
  ```

- **Mutable Properties**

> See https://github.com/facebook/react/issues/3226 for more on this

```js
<div style={{ width: 100 }} />
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-react-constant-elements
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-transform-react-constant-elements"]
}
```

## Options

### `allowMutablePropsOnTags`

`Array<string>`, defaults to `[]`

If you are using a particular library (like react-intl) that uses object properties, and you are sure
that the element won't modify its own props, you can permit objects to be allowed for specific elements.

This will skip the `Mutable Properties` deopt.

```json
{
  "plugins": [
    [
      "@babel/plugin-transform-react-constant-elements",
      { "allowMutablePropsOnTags": ["FormattedMessage"] }
    ]
  ]
}
```

> You can read more about configuring plugin options [here](https://babeljs.io/docs/en/plugins#plugin-options)

### Via CLI

```sh
babel --plugins @babel/plugin-transform-react-constant-elements script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-react-constant-elements"],
});
```

## References

- [[facebook/react#3226] Optimizing Compiler: Reuse Constant Value Types like ReactElement](https://github.com/facebook/react/issues/3226)
