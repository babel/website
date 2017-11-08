---
layout: docs
title: Caveats
description: 一些在使用 Babel 时需要铭记于心的事情。
permalink: /docs/usage/caveats/
---

## Polyfills

为了使某些特性工作，他们需要特定的 polyfills. 通过使用 [babel-polyfill](/docs/usage/polyfill) 你可以满足 **所有** Babel 特性的要求。

你也许想根据你的需要选择性的引入：

| 特性                     | 要求                                                                          |
| --------------------------- | ------------------------------------------------------------------------------------- |
| Async functions, Generators | [regenerator runtime](https://github.com/facebook/regenerator/tree/master/packages/regenerator-runtime) |
| Array destructuring, For Of | `Symbol`, `prototype[Symbol.iterator]`                                                |
| Spread                      | `Array.from`                                                                          |

这些插件中有一些也有 `loose` 选项。

## Classes

由于 ES5 的限制，诸如 `Date`, `Array`, `DOM` 等内置类型不能被适当的子类化（对于 [es2015-classes](/docs/plugins/transform-es2015-classes) 插件）。
你可以尝试基于 `Object.setPrototypeOf` 和 `Reflect.construct` 使用 [babel-plugin-transform-builtin-extend](https://github.com/loganfsmyth/babel-plugin-transform-builtin-extend), 但仍然有一些限制。

## ES5

由于 Babel 假定您的代码将在 ES5 环境中运行，它使用 ES5 功能。所以如果你使用的是一个有限制的或者不支持 ES5 的环境例如较低版本的 IE, 那么使用 [babel-polyfill](/docs/usage/polyfill) 将会增加对这些方法的支持。

## Internet Explorer

### Classes (10 及以下)

如果你从一个类继承，那么静态属性将从类的 [\_\_proto\_\_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto) 中继承，这是广泛支持的但是你仍旧会在一些很老的浏览器上运行出问题。

**注意：** `__proto__` 在 IE10 及更旧的版本上是不支持的，所以静态属性**不会**被继承。请参阅 [protoToAssign](/docs/plugins/transform-proto-to-assign) 查看一个可能的解决方案。

对于有 `super` 的类， super 类将不会被正常解析。你可以通过启用 [es2015-classes](/docs/plugins/transform-es2015-classes) 插件中的 `loose` 选项来解决此问题。

### Getters/setters (8 及以下)

在 IE8 中，`Object.defineProperty` 只能被用在 DOM 对象上。这是不幸的因为它需要设置 getters 和 setters. 因此如果你打算在 IE8 或更旧的版本上做支持的话，那么不推荐 getters 和 setters 的用法。

**引用**： [MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty#Internet_Explorer_8_specific_notes).

#### 模块

默认情况下，当与 Babel 一起使用模块时，会输出一个不可枚举的 `__esModule` 属性。这是通过使用 `Object.defineProperty` 来完成的，而它在 IE8 及更旧版本中不受支持。一个解决方法是在相应的模块插件中启用 `loose` 选项。