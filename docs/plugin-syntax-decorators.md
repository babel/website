---
id: babel-plugin-syntax-decorators
title: @babel/plugin-syntax-decorators
sidebar_label: syntax-decorators
---

> #### Syntax only
>
> It's unlikely you want to use this plugin directly as it only enables Babel to parse this syntax. Instead, use [plugin-proposal-decorators](plugin-proposal-decorators.md) to _both_ parse and transform this syntax.

## Installation

```sh
npm install --save-dev @babel/plugin-syntax-decorators
```

## Usage

### With a configuration file (Recommended)

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
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-syntax-decorators"]
});
```

## Options

<details>
  <summary>History</summary>
| Version | Changes |
| --- | --- |
| `v7.17.0` | Added the `version` option with support for `"2021-12"`, `"2018-09"` and `"legacy"` |
</details>

### `version`

`"2021-12"`, `"2018-09"` or `"legacy"`. Defaults to `"2018-09"`.

Selects the decorators proposal to use:
- `legacy` is the original Stage 1 one
- `"2018-09"` is the proposal version that was initially promoted to Stage 2 presented to TO39 in Sept 2018.  You can read more about it at [`tc39/proposal-decorators@7fa580b40f`](https://github.com/tc39/proposal-decorators/tree/7fa580b40f2c19c561511ea2c978e307ae689a1b)
- `"2021-12"` is the proposal version as it was presented to TC39 in Dec 2021. You can read more about it at [`tc39/proposal-decorators@d6c056fa06`](https://github.com/tc39/proposal-decorators/tree/d6c056fa061646178c34f361bad33d583316dc85).

### `legacy`

> **⚠️ DEPRECATED**: Use `version: "legacy"` instead. This option is a legacy alias.

`boolean`, defaults to `false`.

Use the legacy (stage 1) decorators syntax.

### `decoratorsBeforeExport`

`boolean`

This option:
- is disallowed when using `version: "legacy"`;
- is required when using `version: "2018-09"`;
- is optional and defaults to `false` when using `version: "2021-12"`.

```js
// decoratorsBeforeExport: true
@decorator
export class Foo {}

// decoratorsBeforeExport: false
export @decorator class Bar {}
```

This option was added to help tc39 collect feedback from the community by allowing experimentation with both possible syntaxes.

For more information, check out: [tc39/proposal-decorators#69](https://github.com/tc39/proposal-decorators/issues/69)

> You can read more about configuring plugin options [here](https://babeljs.io/docs/en/plugins#plugin-options)
