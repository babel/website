---
id: version-6.26.3-babel-plugin-transform-member-expression-literals
title: babel-plugin-transform-member-expression-literals
sidebar_label: transform-member-expression-literals
original_id: babel-plugin-transform-member-expression-literals
---

## Example

**In**

```javascript
obj["foo"] = "isValid";

obj.const = "isKeyword";
obj["var"] = "isKeyword";
```

**Out**

```javascript
obj.foo = "isValid";

obj["const"] = "isKeyword";
obj["var"] = "isKeyword";
```

## Installation

```sh
npm install babel-plugin-transform-member-expression-literals
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-member-expression-literals"]
}
```

### Via CLI

```sh
babel --plugins transform-member-expression-literals script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-member-expression-literals"]
});
```

