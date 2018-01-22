---
id: version-6.26.3-babel-polyfill
title: babel-polyfill
sidebar_label: babel-polyfill
original_id: babel-polyfill
---

Babel includes a [polyfill](https://en.wikipedia.org/wiki/Polyfill_(programming)) that includes a custom [regenerator runtime](https://github.com/facebook/regenerator/blob/master/packages/regenerator-runtime/runtime.js) and [core-js](https://github.com/zloirock/core-js).

This will emulate a full ES2015+ environment and is intended to be used in an application rather than a library/tool. This polyfill is automatically loaded when using `babel-node`.

This means you can use new built-ins like `Promise` or `WeakMap`, static methods like `Array.from` or `Object.assign`, instance methods like `Array.prototype.includes`, and generator functions (provided you use the [regenerator](https://babeljs.io/docs/en/babel-plugin-transform-regenerator) plugin). The polyfill adds to the global scope as well as native prototypes like `String` in order to do this.

## Installation

```sh
npm install --save babel-polyfill
```

> Because this is a polyfill (which will run before your source code), we need it to be a `dependency`, not a `devDependency`

## Usage in Node / Browserify / Webpack

To include the polyfill you need to require it at the top of the **entry point** to your application.

> Make sure it is called before all other code/require statements!

```js
require("babel-polyfill");
```

If you are using ES6's `import` syntax in your application's **entry point**, you
should instead import the polyfill at the top of the **entry point** to ensure the
polyfills are loaded first:

```js
import "babel-polyfill";
```

When using Webpack there are multiple ways to include Babel Polyfill. 

* In case [`@babel/preset-env`](https://github.com/babel/babel/tree/master/packages/babel-preset-env) preset is used 

	* If `useBuiltIns: 'usage'` is specified in `.babelrc` then do not include Babel Polyfill neither in `webpack.config.js` entry array nor source. Babel Polyfill still has to be installed though.
	* If `useBuiltIns: 'entry'` is specified in `.babelrc` then include Babel Polyfill at the top of the entry point to your application via `require` or `import` as discussed above.
	* If `useBuiltIns` key is not specified or it is explicitly set to false `useBuiltIns: false` in `.babelrc` then add Babel Polyfill to Weback entry array within `webpack.config.js`.

> babel-loader 7.x | babel 6.x

```js
module.exports = {
  entry: ["babel-polyfill", "./app/js"]
};
```

> babel-loader 8.x | babel 7.x

```js
module.exports = {
  entry: ["@babel/polyfill", "./app/js"]
};
```

* In case `@babel/preset-env` is not used then add Babel Polyfill to Weback entry array as discussed above. It can still be added at the top of the entry point to application via `require` or `import`, but this is not recommended.

## Usage in Browser

Available from the `dist/polyfill.js` file within a `babel-polyfill` npm release.
This needs to be included **before** all your compiled Babel code. You can either
prepend it to your compiled code or include it in a `<script>`
before it.

**NOTE:** Do not `require` this via browserify etc, use `babel-polyfill`.

## Details

> ##### If you are looking for something that won't modify globals to be used in a tool/library, checkout the [`transform-runtime`](https://babeljs.io/docs/en/babel-plugin-transform-runtime) plugin. This means you won't be able to use the instance methods mentioned above like `Array.prototype.includes`.

Note: Depending on what ES2015 methods you actually use, you may not need to use `babel-polyfill` or the runtime plugin. You may want to only [load the specific polyfills you are using](https://github.com/zloirock/core-js#commonjs) (like `Object.assign`) or just document that the environment the library is being loaded in should include certain polyfills.

