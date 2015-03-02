---
layout: docs
title: utility.deadCodeElimination
description: How to use the utility.deadCodeElimination transformer.
permalink: /docs/usage/transformers/utility/dead-code-elimination/
---

Remove dead code.

## Usage

```javascript
require("babel").transform("code", { optional: ["utility.deadCodeElimination"] });
```

```sh
$ babel --optional utility.deadCodeElimination script.js
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
