---
id: babel-plugin-transform-member-expression-literals
title: @babel/plugin-transform-member-expression-literals
sidebar_label: transform-member-expression-literals
---

## Example

**In**

```javascript
obj.foo = "isValid";

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
npm install @babel/plugin-transform-member-expression-literals --save-dev
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-transform-member-expression-literals"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-transform-member-expression-literals script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-transform-member-expression-literals"]
});
```

