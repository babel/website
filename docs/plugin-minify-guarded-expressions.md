---
id: babel-plugin-minify-guarded-expressions
title: babel-plugin-minify-guarded-expressions
sidebar_label: minify-guarded-expressions
---

**In**

```javascript
!x && foo();
alert(0 && new Foo());
```

**Out**

```javascript
x || foo();
alert(0);
```

## Installation

```sh
npm install babel-plugin-minify-guarded-expressions --save-dev
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["minify-guarded-expressions"]
}
```

### Via CLI

```sh
babel --plugins minify-guarded-expressions script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["minify-guarded-expressions"]
});
```

