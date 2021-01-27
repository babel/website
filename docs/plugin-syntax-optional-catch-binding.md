---
id: babel-plugin-syntax-optional-catch-binding
title: @babel/plugin-syntax-optional-catch-binding
sidebar_label: syntax-optional-catch-binding
---

> #### Syntax only
>
> It's unlikely you want to use this plugin directly as it only enables Babel to parse this syntax. Instead, use [plugin-proposal-optional-catch-binding](plugin-proposal-optional-catch-binding.md) to _both_ parse and transform this syntax.

## Example

**Syntax**

```javascript
try {
  throw 0;
} catch {
  doSomethingWhichDoesNotCareAboutTheValueThrown();
  console.log("Yay, code executes!");
}
```

## Installation

```sh
npm install --save-dev @babel/plugin-syntax-optional-catch-binding
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-syntax-optional-catch-binding"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-syntax-optional-catch-binding script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-syntax-optional-catch-binding"]
});
```

## References

* [Proposal: Optional Catch Binding for ECMAScript](https://github.com/babel/proposals/issues/7)

