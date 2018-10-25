---
id: version-7.0.0-babel-plugin-syntax-decorators
title: @babel/plugin-syntax-decorators
sidebar_label: syntax-decorators
original_id: babel-plugin-syntax-decorators
---

## Installation

```sh
npm install --save-dev @babel/plugin-syntax-decorators
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/plugin-syntax-decorators"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-syntax-decorators script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-syntax-decorators"]
});
```

## Options

### `legacy`

`boolean`, defaults to `false`.

Use the legacy (stage 1) decorators syntax.

### `decoratorsBeforeExport`

`boolean`, defaults to `false`.

```js
// decoratorsBeforeExport: true
@decorator
export class Foo {}

// decoratorsBeforeExport: false
export @decorator class Bar {}
```

This option was added to help tc39 collect feedback from the community by allowing experimentation with both possible syntaxes.

For more information, check out: [tc39/proposal-decorators#69](https://github.com/tc39/proposal-decorators/issues/69)

