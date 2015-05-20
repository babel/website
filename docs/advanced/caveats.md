---
layout: docs
title: Caveats
description: Just some things to keep in mind when using babel.
permalink: /docs/advanced/caveats/
redirect_from:
 - /caveats.html
 - /docs/caveats/
 - /docs/usage/caveats/
---

## Polyfills

In order for certain features to work they require certain polyfills. You can satisfy **all**
Babel feature requirements by using the included [polyfill](/docs/usage/polyfill).

You may alternatively selectively include what you need:

| Feature                     | Requirements                                                                          |
| --------------------------- | ------------------------------------------------------------------------------------- |
| Abstract References         | `Symbol`                                                                              |
| Array destructuring         | `Symbol`                                                                             |
| Async functions, Generators | [regenerator runtime](https://github.com/facebook/regenerator/blob/master/runtime.js) |
| Comprehensions              | `Array.from`                                                                          |
| For Of                      | `Symbol`, `prototype[Symbol.iterator]`                                                |
| Spread                      | `Array.from`                                                                          |

## Classes

Built-in classes such as `Date`, `Array`, `DOM` etc cannot be properly subclassed
due to limitations in ES5.

## ES5

Since Babel assumes that your code will be ran in an ES5 environment it uses ES5
functions. So if you're using an environment that has limited or no support for
ES5 such as lower versions of IE then using the
[es5-shim](https://github.com/es-shims/es5-shim) along with the
[Babel polyfill](/docs/usage/polyfill) will add support for these methods.

## Internet Explorer

### Classes (10 and below)

If you're inheriting from a class then static properties are inherited from it
via [\_\_proto\_\_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto),
this is widely supported but you may run into problems with much older browsers.

**NOTE:** `__proto__` is not supported on IE <= 10 so static properties
**will not** be inherited. See the
[protoToAssign](/docs/advanced/transformers/spec/proto-to-assign) for a possible work
around.

For classes that have `super`s, the super class won't resolve correctly. You can
get around this by enabling [loose mode](/docs/advanced/loose/) for classes.

### Getters/setters (8 and below)

In IE8 `Object.defineProperty` can only be used on DOM objects. This is
unfortunate as it's required to set getters and setters. Due to this if
you plan on supporting IE8 or below then the usage of getters and setters
isn't recommended.

**Reference**: [MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty#Internet_Explorer_8_specific_notes).

#### Modules

By default, when using modules with Babel a non-enumerable `__esModule` property
is exported. This is done through the use of `Object.defineProperty` which is
unsupported in IE8 and below. A workaround for this is to enable
[loose mode - modules](/docs/advanced/loose/#es6-modules).
