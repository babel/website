---
layout: docs
title: Caveats
description: Just some things to keep in mind when using 6to5.
permalink: /docs/caveats/
redirect_from: /caveats.html
---

## Polyfills

In order for certain features to work they require certain polyfills. You can
satisfy **all** 6to5 feature requirements by using the included
[polyfill](/docs/usage/polyfill).

You may alternatively selectively include what you need:

| Feature                     | Requirements                                                                                                                    |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Abstract References         | [experimental](/docs/usage/experimental), `Symbol`                                                                              |
| Array destructuring         | `Array.from`                                                                                                                    |
| Async functions, Generators | [experimental](/docs/usage/experimental), [regenerator runtime](https://github.com/facebook/regenerator/blob/master/runtime.js) |
| Comprehensions              | [experimental](/docs/usage/experimental), `Array.from`                                                                          |
| For Of                      | `Symbol`, `prototype[Symbol.iterator]`                                                                                          |
| Object spread/rest          | [experimental](/docs/usage/experimental)                                                                                        |
| Spread                      | `Array.from`                                                                                                                    |

## Destructuring defaults

Currently destructuring defaults is currently only supported in their long form.

The following **will** work:

```javascript
var { a: a = 1 } = {};
a; // 1

function b({ c: c = 2 }){
  c; // 2
}
b({});
```

however the following will not

```javascript
var { a = 1 } = {};
a; // 1

function b({ c = 2 }){
  c; // 2
}
b({});
```

See [6to5/6to5#230](https://github.com/6to5/6to5/issues/230) and
[marijnh/acorn#181](https://github.com/marijnh/acorn/issues/181) for updates and
progress.

## ES5

Since 6to5 assumes that your code will be ran in an ES5 environment it uses ES5
functions. So if you're using an environment that has limited or no support for
ES5 such as lower versions of IE then using the
[es5-shim](https://github.com/es-shims/es5-shim) along with the
[6to5 polyfill](/docs/usage/polyfill) will add support for these methods.

## Internet Explorer

### Classes (10 and below)

If you're inheriting from a class then static properties are inherited from it
via [\_\_proto\_\_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto),
this is widely supported but you may run into problems with much older browsers.

**NOTE:** `__proto__` is not supported on IE <= 10 so static properties
**will not** be inherited. See the
[protoToAssign](/docs/usage/transformers#proto-to-assign) for a possible work around.

### Getters/setters (8 and below)

In IE8 `Object.defineProperty` can only be used on DOM objects. This is
unfortunate as it's required to set getters and setters. Due to this if
you plan on supporting IE8 or below then the user of getters and setters
isn't recommended.

**Reference**: [MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty#Internet_Explorer_8_specific_notes).
