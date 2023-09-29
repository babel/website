---
id: babel-plugin-minify-type-constructors
title: babel-plugin-minify-type-constructors
sidebar_label: minify-type-constructors
---

## Example

**In**

```js title="JavaScript"
Boolean(x);
Number(x);
String(x);
Array(3);
Array(3,1);
Object({foo: 'bar'});
```

**Out**

```js title="JavaScript"
!!x;
+x;
x + "";
[,,,];
[3, 1];
{foo: 'bar'};
```

## Installation

```shell npm2yarn
npm install babel-plugin-minify-type-constructors --save-dev
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["minify-type-constructors"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins minify-type-constructors script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["minify-type-constructors"]
});
```

## Options

+ `array` - prevent plugin from minifying arrays
+ `boolean` - prevent plugin from minifying booleans
+ `number` — prevent plugin from minifying numbers
+ `object` — prevent plugin from minifying objects
+ `string` — prevent plugin from minifying strings

:::tip
You can read more about configuring plugin options [here](https://babeljs.io/docs/en/plugins#plugin-options)
:::
