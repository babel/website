---
layout: docs
title: validation.undeclaredVariableCheck
description: How to use the validation.undeclaredVariableCheck transformer.
permalink: /docs/advanced/transformers/validation/undeclared-variable-check/
redirect_from:
 - /docs/usage/transformers/validation/undeclared-variable-check/
---

Throws errors on references to undeclared variables.

## Usage

```javascript
require("babel").transform("code", { optional: ["validation.undeclaredVariableCheck"] });
```

```sh
$ babel --optional validation.undeclaredVariableCheck script.js
```

## Example

**In**

```javascript
function foo() {}
foo();
bar();
```

**Out**

```
ReferenceError: stdin: Line 3: Reference to undeclared variable "bar" - did you mean "foo"?
  1 | function foo() {}
  2 | foo();
> 3 | bar();
    | ^
  4 |
```
