---
id: version-7.0.0-babel-plugin-minify-guarded-expressions
title: babel-plugin-minify-guarded-expressions
sidebar_label: minify-guarded-expressions
original_id: babel-plugin-minify-guarded-expressions
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

### Via `.babelrc` (Recommended)

**.babelrc**

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
require("@babel/core").transform("code", {
  plugins: ["minify-guarded-expressions"]
});
```

