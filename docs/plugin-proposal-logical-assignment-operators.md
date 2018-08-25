---
id: babel-plugin-proposal-logical-assignment-operators
title: @babel/plugin-proposal-logical-assignment-operators
sidebar_label: proposal-logical-assignment-operators
---

## Example

**In**

```javascript
a ||= b;
obj.a.b ||= c;

a &&= b;
obj.a.b &&= c;
```

**Out**

```javascript
var _obj$a, _obj$a2;

a || (a = b);
(_obj$a = obj.a).b || (_obj$a.b = c);

a && (a = b);
(_obj$a2 = obj.a).b && (_obj$a2.b = c);
```

## Installation

```sh
npm install --save-dev @babel/plugin-proposal-logical-assignment-operators
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/plugin-proposal-logical-assignment-operators"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-proposal-logical-assignment-operators script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-proposal-logical-assignment-operators"]
});
```

## References

* [Proposal: Logical Assignment Operators](https://github.com/tc39/proposal-logical-assignment)

