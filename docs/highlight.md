---
id: babel-highlight
title: "@babel/highlight"
sidebar_label: highlight
---

## Install

```shell npm2yarn
npm install --save @babel/highlight
```

## Usage

```js title="JavaScript"
import highlight from "@babel/highlight";

const code = `class Foo {
  constructor()
}`;

const result = highlight(code);

console.log(result);
```

```js title="JavaScript"
class Foo {
  constructor()
}
```

By default, `highlight` will not highlight your code if your terminal does not support color. To force colors, pass `{ forceColor: true }` as the second argument to `highlight`.

```js title="JavaScript"
import highlight from "@babel/highlight";

const code = `class Foo {
  constructor()
}`;

const result = highlight(code, { forceColor: true });
```

