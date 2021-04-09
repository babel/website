---
id: babel-plugin-proposal-partial-application
title: @babel/plugin-proposal-partial-application
sidebar_label: partial-application
---

## Example

(examples are from proposal)

```javascript
function add(x, y) { return x + y; }

const addOne = add(1, ?); // apply from the left
addOne(2); // 3

const addTen = add(?, 10); // apply from the right
addTen(2); // 12

let newScore = player.score
  |> add(7, ?)
  |> clamp(0, 100, ?); // shallow stack, the pipe to `clamp` is the same frame as the pipe to `add`.
```

### Valid Usage

```javascript
f(x, ?)           // partial application from left
f(?, x)           // partial application from right
f(?, x, ?)        // partial application for any arg
o.f(x, ?)         // partial application from left
o.f(?, x)         // partial application from right
o.f(?, x, ?)      // partial application for any arg
super.f(?)        // partial application allowed for call on |SuperProperty|
```

### Invalid Usage

```javascript
f(x + ?)          // `?` not in top-level Arguments of call
x + ?             // `?` not in top-level Arguments of call
?.f()             // `?` not in top-level Arguments of call
new f(?)          // `?` not supported in `new`
super(?)          // `?` not supported in |SuperCall|
```

## Installation

```sh
$ npm install --save-dev @babel/plugin-proposal-partial-application
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-proposal-partial-application"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-proposal-partial-application script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-proposal-partial-application"],
});
```

## References

- [Proposal: Partial Application](https://github.com/tc39/proposal-partial-application)
