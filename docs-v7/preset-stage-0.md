---
title: babel-preset-stage-0
sidebar_label: stage-0
---

## Install

```sh
npm install --save-dev babel-preset-stage-0
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "presets": ["stage-0"]
}
```

### Via CLI

```sh
babel script.js --presets stage-0
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  presets: ["stage-0"]
});
```

