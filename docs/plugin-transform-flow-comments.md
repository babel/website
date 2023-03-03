---
id: babel-plugin-transform-flow-comments
title: "@babel/plugin-transform-flow-comments"
sidebar_label: flow-comments
---

You should be able to use this plugin instead of `@babel/plugin-flow-strip-types` to preserve the `/* @flow */` directive and still use flow.

[Flow Comments Blog Post](https://flow.org/blog/2015/02/20/Flow-Comments.html)

## Example

**In**

```js title="JavaScript"
function foo(bar?) {}
function foo2(bar?: string) {}
function foo(x: number): string {}
type B = {
  name: string,
};
export type GraphQLFormattedError = number;
import type A, { B, C } from "./types";
import typeof D, { E, F } from "./types";
```

**Out**

```js title="JavaScript"
"use strict";

function foo(bar /*:: ?*/) {}
function foo2(bar /*:: ?: string*/) {}
function foo(x /*: number*/) /*: string*/ {}
/*:: type B = {
  name: string;
};*/
/*:: export type GraphQLFormattedError = number;*/
/*:: import type A, { B, C } from './types';*/
/*:: import typeof D, { E, F } from './types';*/
```

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-transform-flow-comments
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-transform-flow-comments"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-transform-flow-comments script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-flow-comments"],
});
```
