---
id: babel-plugin-transform-react-jsx-development
title: "@babel/plugin-transform-react-jsx-development"
sidebar_label: transform-react-jsx-development
---

:::info
This plugin is included in `@babel/preset-react`
:::

This plugin is a developer version of [`@babel/plugin-transform-react-jsx`](./plugin-transform-react-jsx.md). It is designed to provide enhanced validation error messages and precise code location information for debugging React apps. Note that this plugin is intended to be used in a development environment, as it generates significantly more outputs than the production build.

If you are using [`@babel/preset-react`](./preset-react.md), it will be automatically enabled by the [`development`](./preset-react.md#development) option so you don't have to install it.

## Example

**In**

```js title="input.jsx"
const profile = (
  <div>
    <img src="avatar.png" className="profile" />
    <h3>{[user.firstName, user.lastName].join(" ")}</h3>
  </div>
);
```

**Out**

```js title="output.js"
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";

const _jsxFileName = "input.jsx";
const profile = _jsxDEV("div", {
  children: [
    _jsxDEV("img", {
      src: "avatar.png",
      className: "profile",
    }, undefined, false, { fileName: _jsxFileName, lineNumber: 3, columnNumber: 5 }, this),
    _jsxDEV("h3", {
      children: [user.firstName, user.lastName].join(" "),
    }, undefined, false, { fileName: _jsxFileName, lineNumber: 4, columnNumber: 5 }, this),
  ]},
  undefined, false, { fileName: _jsxFileName, lineNumber: 2, columnNumber: 3 }, this
);
```

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-transform-react-jsx-development
```

## Usage

### With a configuration file (Recommended)

Without options:

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-transform-react-jsx-development"]
}
```

With options:

:::babel8

```json title="babel.config.json"
{
  "plugins": [
    [
      "@babel/plugin-transform-react-jsx-development",
      {
        "throwIfNamespace": false, // defaults to true
        "runtime": "automatic", // defaults to autoamtic
        "importSource": "custom-jsx-library" // defaults to react
      }
    ]
  ]
}
```

:::

:::babel7

```json title="babel.config.json"
{
  "plugins": [
    [
      "@babel/plugin-transform-react-jsx-development",
      {
        "throwIfNamespace": false, // defaults to true
        "runtime": "automatic", // defaults to classic
        "importSource": "custom-jsx-library" // defaults to react
      }
    ]
  ]
}
```

:::

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-transform-react-jsx-development script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-react-jsx-development"],
});
```

## Options

It accepts the same options as [`@babel/plugin-transform-react-jsx`](./plugin-transform-react-jsx.md#options).
