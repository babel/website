---
id: babel-helper-evaluate-path
title: babel-helper-evaluate-path
sidebar_label: babel-helper-evaluate-path
---

Fixes / Features:

+ Detect usages before initialization / declaration

```js
function foo() {
  console.log(b); // ReferenceError
  let b = 1;
}

function bar() {
  console.log(a); // a is void 0
  var a = 5;
  console.log(a); // 5
}
```

+ Detect usages in scopes outside of initialization for vars (hoisted)

```js
function foo() {
  if (a) var x = 5;
  console.log(x); // cannot determine
}
```

## Installation

```sh
npm install babel-helper-evaluate-path --save-dev
```

