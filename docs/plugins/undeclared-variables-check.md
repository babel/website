---
layout: docs
title: Undeclared variables check
description:
permalink: /docs/plugins/undeclared-variables-check/
package: babel-plugin-undeclared-variables-check
---

This plugin throws errors on references to undeclared variables.

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

## Installation

```sh
$ npm install babel-plugin-undeclared-variables-check
```

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "plugins": ["undeclared-variables-check"]
}
```
