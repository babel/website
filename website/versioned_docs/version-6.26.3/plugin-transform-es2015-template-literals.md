---
id: version-6.26.3-babel-plugin-transform-es2015-template-literals
title: babel-plugin-transform-es2015-template-literals
sidebar_label: transform-es2015-template-literals
original_id: babel-plugin-transform-es2015-template-literals
---

## Example

**In**

```javascript
`foo${bar}`;
```

**Out**

```javascript
"foo" + bar;
```

## Installation

```sh
npm install --save-dev babel-plugin-transform-es2015-template-literals
```

## Usage

### With a configuration file (Recommended)

Without options:

```json
{
  "plugins": ["transform-es2015-template-literals"]
}
```

With options:

```json
{
  "plugins": [
    ["transform-es2015-template-literals", {
      "loose": true,
      "spec": true
    }]
  ]
}
```

### Via CLI

```sh
babel --plugins transform-es2015-template-literals script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-es2015-template-literals"]
});
```

## Options

### `loose`

`boolean`, defaults to `false`.

In loose mode, tagged template literal objects aren't frozen.

### `spec`

`boolean`, defaults to `false`.

This option wraps all template literal expressions with `String`. See [babel/babel#1065](https://github.com/babel/babel/issues/1065) for more info.

**In**

```javascript
`foo${bar}`;
```

**Out**

```javascript
"foo" + String(bar);
```

