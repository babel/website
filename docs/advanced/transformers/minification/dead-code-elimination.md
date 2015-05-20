---
layout: docs
title: minification.deadCodeElimination
description: How to use the minification.deadCodeElimination transformer.
permalink: /docs/advanced/transformers/minification/dead-code-elimination/
redirect_from:
 - /docs/usage/transformers/minification/dead-code-elimination/
---

Remove dead code.

## Usage

```javascript
require("babel").transform("code", { optional: ["minification.deadCodeElimination"] });
```

```sh
$ babel --optional minification.deadCodeElimination script.js
```

## Examples

### Always truthy if statements

**In**

```javascript
if (true) {
  foo();
} else {
  bar();
}
```

**Out**

```javascript
foo();
```

### Always falsey if statements

**In**

```javascript
if (false) {
  foo();
} else {
  bar();
}
```

**Out**

```javascript
bar();
```

### Empty alternate blocks

**In**

```javascript
if (foo) {
} else {
  bar();
}
```

**Out**

```javascript
if (!foo) {
  foo();
}
```

### Empty consequent blocks

**In**

```javascript
if (foo) {
  bar();
} else {
}
```

**Out**

```javascript
if (foo) {
  foo();
}
```

### Truthy conditional expressions

**In**

```javascript
true ? foo : bar
```

**Out**

```javascript
foo
```

### Falsy conditional expressions

**In**

```javascript
false ? foo : bar
```

**Out**

```javascript
bar
```

### Unused class declarations

**In**

```javascript
class Foo {}
class Bar {}
new Foo;
```

**Out**

```javascript
class Foo {}
new Foo;
```

### Unused function declarations

**In**

```javascript
function foo() {}
function bar() {}
foo();
```

**Out**

```javascript
function foo() {}
foo();
```

### Pure values used only once

**In**

```javascript
var foo = "bar";
bar(foo);
```

**Out**

```javascript
bar("bar");
```
