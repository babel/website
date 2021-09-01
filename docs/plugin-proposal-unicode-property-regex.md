---
id: babel-plugin-proposal-unicode-property-regex
title: @babel/plugin-proposal-unicode-property-regex
sidebar_label: unicode-property-regex
---

> **NOTE**: This plugin is included in `@babel/preset-env`, in [ES2018](https://github.com/tc39/proposals/blob/master/finished-proposals.md)

[Here’s an online demo.](https://mothereff.in/regexpu#input=var+regex+%3D+/%5Cp%7BScript_Extensions%3DGreek%7D/u%3B&unicodePropertyEscape=1)

## Installation

```sh
npm install --save-dev @babel/plugin-proposal-unicode-property-regex
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-proposal-unicode-property-regex"]
}
```

### Via CLI

```sh
babel --plugins @babel/@babel/plugin-proposal-unicode-property-regex script.js
```

### Via Node.js API

```js
require("@babel/core").transformSync(code, {
  plugins: ["@babel/plugin-proposal-unicode-property-regex"],
});
```

To transpile to ES6/ES2015:

```js
require("@babel/core").transformSync(code, {
  plugins: [
    [
      "@babel/plugin-proposal-unicode-property-regex",
      { useUnicodeFlag: false },
    ],
  ],
});
```

## Options

- `useUnicodeFlag` (defaults to `true`)

When disabled with `false`, the transform converts Unicode regexes to
non-Unicode regexes for wider support, removing the `u` flag. See https://github.com/mathiasbynens/regexpu-core#useunicodeflag-default-false for more information.

> You can read more about configuring plugin options [here](https://babeljs.io/docs/en/plugins#plugin-options)

## Author

| [![twitter/mathias](https://gravatar.com/avatar/24e08a9ea84deb17ae121074d0f17125?s=70)](https://twitter.com/mathias "Follow @mathias on Twitter") |
| ------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Mathias Bynens](https://mathiasbynens.be/)                                                                                                       |
