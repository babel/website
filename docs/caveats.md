---
title: Caveats
id: caveats
---

## Polyfills

In order for certain features to work they require certain polyfills. You can satisfy **all**
Babel feature requirements by using a complete polyfill such as [`core-js/actual`](https://www.npmjs.com/package/core-js) or (if you want to load it using a `<script>` tag) [`core-js-bundle`](https://www.jsdelivr.com/package/npm/core-js-bundle).

You may alternatively/selectively include what you need:

<!-- TODO: This is out of date -->

| Feature                     | Requirements                           |
| --------------------------- | -------------------------------------- |
| Array destructuring, For Of | `Symbol`, `prototype[Symbol.iterator]` |
| Spread                      | `Array.from`                           |

If you are compiling generators or async function to ES5, and you are using a version of `@babel/core` or `@babel/plugin-transform-regenerator` older than `7.18.0`, you must also load the [`regenerator runtime`](https://github.com/facebook/regenerator/tree/master/packages/regenerator-runtime) package. It is automatically loaded when using `@babel/preset-env`'s `useBuiltIns: "usage"` option or `@babel/plugin-transform-runtime`.

## Built-ins

Babel assumes that built-ins (e.g. `Array`, `WeakMap` and others), if polyfilled, are modified in a manner that is spec-compliant.

## Classes

Built-in classes such as `Date`, `Array`, `DOM` etc cannot be properly subclassed
due to limitations in ES5 (for the [transform-classes](plugin-transform-classes.md) plugin).
You can try to use [babel-plugin-transform-builtin-extend](https://github.com/loganfsmyth/babel-plugin-transform-builtin-extend) based on `Object.setPrototypeOf` and `Reflect.construct`, but it also has some limitations.

## ES5

Since Babel assumes that your code will run in an ES5 environment it uses ES5
functions. So if you're using an environment that has limited or no support for
ES5 such as lower versions of IE then using [@babel/polyfill](polyfill.md) will add support for these methods.

## Internet Explorer

### Classes (10 and below)

If you're inheriting from a class then static properties are inherited from it
via [\_\_proto\_\_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto),
this is widely supported but you may run into problems with much older browsers.

**NOTE:** `__proto__` is not supported on IE <= 10 so static properties
**will not** be inherited. See the
[protoToAssign](plugin-transform-proto-to-assign.md) for a possible work
around.

For classes that have `super`s, the super class won't resolve correctly. You can
get around this by enabling the `loose` option in the [transform-classes](plugin-transform-classes.md) plugin.

### Getters/setters (8 and below)

In IE8 `Object.defineProperty` can only be used on DOM objects. This is
unfortunate as it's required to set getters and setters. Due to this if
you plan on supporting IE8 or below then the usage of getters and setters
isn't recommended.

**Reference**: [MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty#Internet_Explorer_8_specific_notes).

#### Modules

By default, when using modules with Babel a non-enumerable `__esModule` property
is exported. This is done through the use of `Object.defineProperty` which is
unsupported in IE8 and below. A workaround for this is to enable the `loose` option in your corresponding module plugin.
