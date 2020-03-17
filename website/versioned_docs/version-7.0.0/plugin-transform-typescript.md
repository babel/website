---
id: version-7.0.0-babel-plugin-transform-typescript
title: @babel/plugin-transform-typescript
sidebar_label: transform-typescript
original_id: babel-plugin-transform-typescript
---

Does not type-check its input. For that, you will need to install and set up TypeScript.

## Caveats

* Does not support [`namespace`][namespace]s.

  **Workaround**: Move to using [file exports][fm], or migrate to using the `module { }` syntax instead.

* Does not support [`const enum`][const_enum]s because those require type information to compile.

  **Workaround**: Remove the `const`, which makes it available at runtime.

* Does not support [`export =`][exin] and [`import =`][exin], because those cannot be compiled to ES.next.

  **Workaround**: Convert to using `export default` and `export const`, and `import x, {y} from "z"`.

* Behaves as if the `--isolatedModules` option was passed to the TypeScript Compiler. This can't be worked around because Babel doesn't support cross-file analysis.

* Does not load `tsconfig.json` files. Some options are supported in alternative ways: see [`TypeScript Compiler Options`](#typescript-compiler-options)

## Example

**In**

```javascript
const x: number = 0;
```

**Out**

```javascript
const x = 0;
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-typescript
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-transform-typescript"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-transform-typescript script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-transform-typescript"]
});
```
## Options

### `isTSX`

`boolean`, defaults to `false`

Forcibly enables `jsx` parsing. Otherwise angle brackets will be treated as typescript's legacy type assertion `var foo = <string>bar;`. Also, `isTSX: true` requires `allExtensions: true`.

### `jsxPragma`

`string`, defaults to `React`

Replace the function used when compiling JSX expressions. This is so that we know that the import is not a type import, and should not be removed.

> You can read more about configuring plugin options [here](https://babeljs.io/docs/en/plugins#plugin-options)

## TypeScript Compiler Options

The official TypeScript compiler has many [options][tsc-options] which allow configuring both
the compiler and the type checker. While many of them don't make sense for Babel (for example,
`--allowUnusedLabels`), some of them might be useful. Their behavior can be achieved in Babel
using different configuration options or plugins.

- `--alwaysStrict`
  You can use the `strictMode` [parser option](https://babeljs.io/docs/en/babel-parser#options):
  ```js
  module.exports = {
    parserOpts: { strictMode: true },
  };
  ```
- `--downlevelIteration`
  You can use the `@babel/plugin-transform-for-of` plugin. If you are using `@babel/preset-env`, `for...of` is already transpiled using iterators when it isn't supported by your compilation target.
- `--emitDecoratorMetadata`
  This option isn't supported by an official Babel package since it is not part of the decorators proposal, but it is a TypeScript-specific addition.
  If you rely on this feature, you can use the community plugin [babel-plugin-transform-typescript-metadata](https://github.com/leonardfactory/babel-plugin-transform-typescript-metadata#readme).
- `--esModuleInterop`
  This is the default behavior of Babel when transpiling ECMAScript modules.
- `--experimentalDecorators`
  This option enables support for the "legacy" decorator proposal. You can enable it in Babel using the `@babel/plugin-proposal-decorators` plugin, although there are some minor differences.
  ```js
  module.exports = {
    plugins: [
      ["@babel/plugin-proposal-decorators", { legacy: true }]
    ]
  };
  ```
- `--importHelpers`
  This is the equivalent of the `@babel/plugin-transform-runtime` package.
- `--inlineSourceMap`
  You can set the [`sourceMaps: "inline"`](https://babeljs.io/docs/en/options#sourcemaps) option in your `babel.config.js` file.
- `--isolatedModules`
  This is the default Babel behavior, and it can't be turned off because Babel doesn't support cross-file analysis.
- `--jsx`
  JSX support is provided using another plugin.
  If you want your output to contains JSX code (i.e. `--jsx preserve`), you need the `@babel/plugin-syntax-jsx` plugin; if you want to transpile it to standard JavaScript (i.e. `--jsx react` or `--jsx react-native`), you should use the `@babel/plugin-transform-react-jsx` plugin.
- `--jsxFactory`
  It can be customized using the [`pragma` option](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx#pragma) of the `@babel/plugin-transform-react-jsx` package. You also need to set the `jsxPragma` option of this plugin.
- `--module`, `-m`
  If you are using a bundler (Webpack or Rollup), this option is set automatically.
  If you are using `@babel/preset-env`, you can use the [`modules` option](https://babeljs.io/docs/en/babel-preset-env#modules); otherwise you can load the specific plugin.

  | **`--module` value** | **`@babel/preset-env`'s `modules`** | **Single plugin** |
  |:--------------------:|:-----------------------------------:|:-----------------:|
  | `None` | `false` | / |
  | `CommonJS` | `"commonjs"` or `"cjs"` | `@babel/plugin-transform-modules-commonjs` |
  | `AMD` | `"amd"` | `@babel/plugin-transform-modules-amd` |
  | `System` | `"systemjs"` | `@babel/plugin-transform-modules-systemjs` |
  | `UMD` | `"umd"` | `@babel/plugin-transform-modules-umd` |
  | `ES6` or `ES2015` | `false` | / |

- `--outDir`
  When using `@babel/cli`, you can set the [`--out-dir` option](https://babeljs.io/docs/en/babel-cli#compile-directories).
- `--outFile`
  Babel doesn't support concatenating output files: you should use a bundler (like Webpack, Rollup or Parcel) for that.
  When using `@babel/cli`, you can compile a single file using the [`--out-file` option](https://babeljs.io/docs/en/babel-cli#compile-files).
- `--sourceMap`
  You can use the top-level [`sourceMaps: true` option](https://babeljs.io/docs/en/options#sourcemaps).
- `--target`
  Babel doesn't support targeting a specific version of the language, but you can choose which engines you want to target using [`@babel/preset-env`](https://babeljs.io/docs/en/babel-preset-env).
  If you prefer, you can enable [individual plugins](https://babeljs.io/docs/en/plugins) for every ECMAScript feature.
- `--watch`, `-w`
  When using `@babel/cli`, you can specify the [`--watch` option](https://babeljs.io/docs/en/babel-cli#compile-files).

[const_enum]: https://www.typescriptlang.org/docs/handbook/enums.html#const-enums
[namespace]: https://www.typescriptlang.org/docs/handbook/namespaces.html
[exin]: https://www.typescriptlang.org/docs/handbook/modules.html#export--and-import--require
[fm]: https://github.com/Microsoft/dtslint/blob/master/docs/no-single-declare-module.md
[tsc-options]: https://www.typescriptlang.org/docs/handbook/compiler-options.html
