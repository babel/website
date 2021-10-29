---
id: babel-plugin-proposal-numeric-separator
title: @babel/plugin-proposal-numeric-separator
sidebar_label: numeric-separator
---

> **NOTE**: This plugin is included in `@babel/preset-env`, in [ES2021](https://github.com/tc39/proposals/blob/master/finished-proposals.md)

## Example

### Decimal Literals

```js
let budget = 1_000_000_000_000;

// What is the value of `budget`? It's 1 trillion!
//
// Let's confirm:
console.log(budget === 10 ** 12); // true
```

### Binary Literals

```js
let nibbles = 0b1010_0001_1000_0101;

// Is bit 7 on? It sure is!
// 0b1010_0001_1000_0101
//             ^
//
// We can double check:
console.log(!!(nibbles & (1 << 7))); // true
```

### Hex Literal

```js
// Messages are sent as 24 bit values, but should be
// treated as 3 distinct bytes:
let message = 0xa0_b0_c0;

// What's the value of the upper most byte? It's A0, or 160.
// We can confirm that:
let a = (message >> 16) & 0xff;
console.log(a.toString(16), a); // a0, 160

// What's the value of the middle byte? It's B0, or 176.
// Let's just make sure...
let b = (message >> 8) & 0xff;
console.log(b.toString(16), b); // b0, 176

// What's the value of the lower most byte? It's C0, or 192.
// Again, let's prove that:
let c = message & 0xff;
console.log(c.toString(16), b); // c0, 192
```

### Octal Literal

_hand wave emoji_

Octals are great for permissions, but also look better when represented in `0o0000` form. No real benefit with separators here.

## Installation

```sh
npm install --save-dev @babel/plugin-proposal-numeric-separator
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-proposal-numeric-separator"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-proposal-numeric-separator script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-proposal-numeric-separator"],
});
```

## Additional Information

If you need to further compile ES2015 Decimal, Binary, Hex and Octal number representations to their pre-ES2015 numeric literal form, add the [`"@babel/plugin-transform-literals"`](plugin-transform-literals.md) plugin:

> `@babel/plugin-transform-literals` is already included in [@babel/preset-env](preset-env.md) and @babel/preset-es2015.

### With a configuration file (Recommended)

```json
{
  "presets": ["@babel/preset-env"],
  "plugins": ["@babel/plugin-proposal-numeric-separator"]
}
{
  "plugins": ["@babel/plugin-proposal-numeric-separator", "@babel/plugin-transform-literals"]
}
```

## References

- [Proposal: Numeric Separators](https://github.com/samuelgoto/proposal-numeric-separator)
