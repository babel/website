---
id: babel-plugin-proposal-unicode-sets-regex
title: "@babel/plugin-proposal-unicode-sets-regex"
sidebar_label: unicode-sets-regex
---

This plugin transforms regular expressions using the `v` flag, introduced by the [RegExp set notation + properties of strings](https://github.com/tc39/proposal-regexp-set-notation) proposal, to regular expressions that use the `u` flag.

## Example

### Intersection
```js title="input.js"
/[\p{ASCII}&&\p{Decimal_Number}]/v
```

will be transformed to

```js title="output.js"
/[0-9]/u
```

### Difference
```js title="input.js"
// Non-ASCII white spaces
/[\p{White_Space}--\p{ASCII}]/v
```

will be transformed to

```js title="output.js"
/[\x85\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/u;
```

### Property of Strings
```js title="input.js"
/^\p{Emoji_Keycap_Sequence}$/v.test("*\uFE0F\u20E3");
// true
```

will be transformed to

```js title="output.js"
/^(?:\*️⃣|#️⃣|0️⃣|1️⃣|2️⃣|3️⃣|4️⃣|5️⃣|6️⃣|7️⃣|8️⃣|9️⃣)$/u.test("*\uFE0F\u20E3");
// true
```

Here is [a list of supported properties](https://github.com/tc39/proposal-regexp-unicode-sequence-properties#proposed-solution). Note that using property of strings with `u`-flag will error.
```js title="input.js"
// @codeblock-error-next-line
/\p{Emoji_Keycap_Sequence}/u
// Error: Properties of strings are only supported when using the unicodeSets (v) flag.
```

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-proposal-unicode-sets-regex
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-proposal-unicode-sets-regex"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-proposal-unicode-sets-regex script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-proposal-unicode-sets-regex"],
});
```
