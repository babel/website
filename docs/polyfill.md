---
id: babel-polyfill
title: @babel/polyfill
---

> 🚨 As of Babel 7.4.0, this package has been deprecated in favor of directly including `core-js/stable` (to polyfill ECMAScript features):
>
> ```js
> import "core-js/stable";
> ```
>
> If you are compiling generators or async function to ES5, and you are using a version of `@babel/core` or `@babel/plugin-transform-regenerator` older than `7.18.0`, you must also load the [`regenerator runtime`](https://github.com/facebook/regenerator/tree/main/packages/runtime) package. It is automatically loaded when using `@babel/preset-env`'s `useBuiltIns: "usage"` option or `@babel/plugin-transform-runtime`.

Babel includes a [polyfill](<https://en.wikipedia.org/wiki/Polyfill_(programming)>) that includes a custom [regenerator runtime](https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js) and [core-js](https://github.com/zloirock/core-js).

This will emulate a full ES2015+ environment (no < Stage 4 proposals) and is intended to be used in an application rather than a library/tool.
(this polyfill is automatically loaded when using `babel-node`).

This means you can use new built-ins like `Promise` or `WeakMap`, static methods like `Array.from` or `Object.assign`, instance methods like `Array.prototype.includes`, and generator functions (provided you use the [regenerator](plugin-transform-regenerator.md) plugin). The polyfill adds to the global scope as well as native prototypes like `String` in order to do this.

## Installation

```sh
npm install --save @babel/polyfill
```

> Because this is a polyfill (which will run before your source code), we need it to be a `dependency`, not a `devDependency`

## Size

The polyfill is provided as a convenience but you should use it with [`@babel/preset-env`](preset-env.md) and the [`useBuiltIns` option](preset-env.md#usebuiltins) so that it doesn't include the whole polyfill which isn't always needed. Otherwise, we would recommend you import the individual polyfills manually.

## TC39 Proposals

If you need to use a proposal that is not Stage 4, `@babel/polyfill` will not automatically import those for you. You will have to import those from another polyfill like [`core-js`](https://github.com/zloirock/core-js) individually. We may work towards including this as separate files in `@babel/polyfill` soon.

## Usage in Node / Browserify / Webpack

To include the polyfill you need to require it at the top of the **entry point** to your application.

> Make sure it is called before all other code/require statements!

```js
require("@babel/polyfill");
```

If you are using ES6's `import` syntax in your application's **entry point**, you
should instead import the polyfill at the top of the **entry point** to ensure the
polyfills are loaded first:

```js
import "@babel/polyfill";
```

With webpack, there are multiple ways to include the polyfills:

- When used alongside [`@babel/preset-env`](preset-env.md),

  - If `useBuiltIns: 'usage'` is specified in `.babelrc` then do not include `@babel/polyfill` in either `webpack.config.js` entry array nor source. Note, `@babel/polyfill` still needs to be installed.

  - If `useBuiltIns: 'entry'` is specified in `.babelrc` then include `@babel/polyfill` at the top of the entry point to your application via `require` or `import` as discussed above.

  - If `useBuiltIns` key is not specified or it is explicitly set with `useBuiltIns: false` in your .babelrc, add `@babel/polyfill` directly to the entry array in your `webpack.config.js`.

```js
module.exports = {
  entry: ["@babel/polyfill", "./app/js"],
};
```

- If [`@babel/preset-env`](preset-env.md) is not used then add `@babel/polyfill` to webpack entry array as discussed above. It can still be added at the top of the entry point to application via `import` or `require`, but this is not recommended.

> We do not recommend that you import the whole polyfill directly: either try the `useBuiltIns` options or import only the polyfills you need manually (either from this package or somewhere else).

## Usage in Browser

Available from the `dist/polyfill.js` file within a `@babel/polyfill` npm release.
This needs to be included **before** all your compiled Babel code. You can either
prepend it to your compiled code or include it in a `<script>`
before it.

**NOTE:** Do not `require` this via browserify etc, use `@babel/polyfill`.

## Details

> ##### If you are looking for something that won't modify globals to be used in a tool/library, checkout the [`transform-runtime`](plugin-transform-runtime.md) plugin. This means you won't be able to use the instance methods mentioned above like `Array.prototype.includes`.

Note: Depending on what ES2015 methods you actually use, you may not need to use `@babel/polyfill` or the runtime plugin. You may want to only [load the specific polyfills you are using](https://github.com/zloirock/core-js#commonjs-api) (like `Object.assign`) or just document that the environment the library is being loaded in should include certain polyfills.
