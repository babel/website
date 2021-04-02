---
id: babel-core
title: @babel/core
---

```javascript
var babel = require("@babel/core");
import { transform } from "@babel/core";
import * as babel from "@babel/core";
```

All transformations will use your local [configuration files](config-files.md).

## transform

> babel.transform(code: string, [options?](#options): Object, callback: Function)

Transforms the passed in `code`. Calling a callback with an object with the generated code,
source map, and AST.

```js
babel.transform(code, options, function(err, result) {
  result; // => { code, map, ast }
});
```

**Example**

```js
babel.transform("code();", options, function(err, result) {
  result.code;
  result.map;
  result.ast;
});
```

> Compat Note:
>
> In Babel 6, this method was synchronous and `transformSync` did not exist. For backward-compatibility, this function will behave synchronously if no callback is given. If you're starting with Babel 7 and need synchronous behavior, please use `transformSync` since this backward-compatibility will be dropped in Babel 8.

## transformSync

> babel.transformSync(code: string, [options?](#options): Object)

Transforms the passed in `code`. Returning an object with the generated code,
source map, and AST.

```js
babel.transformSync(code, options); // => { code, map, ast }
```

**Example**

```js
var result = babel.transformSync("code();", options);
result.code;
result.map;
result.ast;
```

## transformAsync

> babel.transformAsync(code: string, [options?](#options): Object)

Transforms the passed in `code`. Returning an promise for an object with the
generated code, source map, and AST.

```js
babel.transformAsync(code, options); // => Promise<{ code, map, ast }>
```

**Example**

```js
babel.transformAsync("code();", options).then(result => {
  result.code;
  result.map;
  result.ast;
});
```

## transformFile

> babel.transformFile(filename: string, [options?](#options): Object, callback: Function)

Asynchronously transforms the entire contents of a file.

```js
babel.transformFile(filename, options, callback);
```

**Example**

```js
babel.transformFile("filename.js", options, function(err, result) {
  result; // => { code, map, ast }
});
```

## transformFileSync

> babel.transformFileSync(filename: string, [options?](#options): Object)

Synchronous version of `babel.transformFile`. Returns the transformed contents of
the `filename`.

```js
babel.transformFileSync(filename, options); // => { code, map, ast }
```

**Example**

```js
babel.transformFileSync("filename.js", options).code;
```

## transformFileAsync

> babel.transformFileAsync(filename: string, [options?](#options): Object)

Promise version of `babel.transformFile`. Returns a promise for the transformed
contents of the `filename`.

```js
babel.transformFileAsync(filename, options); // => Promise<{ code, map, ast }>
```

**Example**

```js
babel.transformFileAsync("filename.js", options).then(result => {
  result.code;
});
```

## transformFromAst

> babel.transformFromAst(ast: Object, code?: string, [options?](#options): Object, callback: Function): FileNode | null

Given an [AST](https://astexplorer.net/), transform it.

```js
const sourceCode = "if (true) return;";
const parsedAst = babel.parseSync(sourceCode, {
  parserOpts: { allowReturnOutsideFunction: true },
});
babel.transformFromAst(parsedAst, sourceCode, options, function(err, result) {
  const { code, map, ast } = result;
});
```

> Compat Note:
>
> In Babel 6, this method was synchronous and `transformFromAstSync` did not exist. For backward-compatibility, this function will behave synchronously if no callback is given. If you're starting with Babel 7 and need synchronous behavior, please use `transformFromAstSync` since this backward-compatibility will be dropped in Babel 8.

## transformFromAstSync

> babel.transformFromAstSync(ast: Object, code?: string, [options?](#options): Object)

Given an [AST](https://astexplorer.net/), transform it.

```js
const sourceCode = "if (true) return;";
const parsedAst = babel.parseSync(sourceCode, {
  parserOpts: { allowReturnOutsideFunction: true },
});
const { code, map, ast } = babel.transformFromAstSync(
  parsedAst,
  sourceCode,
  options
);
```

## transformFromAstAsync

> babel.transformFromAstAsync(ast: Object, code?: string, [options?](#options): Object)

Given an [AST](https://astexplorer.net/), transform it.

```js
const sourceCode = "if (true) return;";
babel
  .parseAsync(sourceCode, { parserOpts: { allowReturnOutsideFunction: true } })
  .then(parsedAst => {
    return babel.transformFromAstAsync(parsedAst, sourceCode, options);
  })
  .then(({ code, map, ast }) => {
    // ...
  });
```

## parse

> babel.parse(code: string, [options?](#options): Object, callback: Function)

Given some code, parse it using Babel's standard behavior. Referenced presets and
plugins will be loaded such that optional syntax plugins are automatically
enabled.

> Compat Note:
>
> In Babel 7's early betas, this method was synchronous and `parseSync` did not exist. For backward-compatibility,
> this function will behave synchronously if no callback is given. If you're starting with Babel 7 stable
> and need synchronous behavior, please use `parseSync` since this backward-compatibility will be dropped in Babel 8.

## parseSync

> babel.parseSync(code: string, [options?](#options): Object)

Returns an AST.

Given some code, parse it using Babel's standard behavior. Referenced presets and
plugins will be loaded such that optional syntax plugins are automatically
enabled.

## parseAsync

> babel.parseAsync(code: string, [options?](#options): Object)

Returns a promise for an AST.

Given some code, parse it using Babel's standard behavior. Referenced presets and
plugins will be loaded such that optional syntax plugins are automatically
enabled.

## Advanced APIs

Many systems that wrap Babel like to automatically inject plugins and presets,
or override options. To accomplish this goal, Babel exposes several functions
that aid in loading the configuration part-way without transforming.

### loadOptions

> babel.loadOptions([options?](#options): Object)

Resolve Babel's options fully, resulting in an options object where:

- `opts.plugins` is a full list of `Plugin` instances.
- `opts.presets` is empty and all presets are flattened into `opts`.
- It can be safely passed back to Babel. Fields like [`"babelrc"`](options.md#babelrc) have been set to
  `false` so that later calls to Babel will not make a second attempt to load
  config files.

`Plugin` instances aren't meant to be manipulated directly, but often
callers will serialize this `opts` to JSON to use it as a cache key representing
the options Babel has received. Caching on this isn't 100% guaranteed to
invalidate properly, but it is the best we have at the moment.

### loadPartialConfig

> babel.loadPartialConfig([options?](#options): Object): PartialConfig

To allow systems to easily manipulate and validate a user's config, this function
resolves the plugins and presets and proceeds no further. The expectation is
that callers will take the config's `.options`, manipulate it as they see fit
and pass it back to Babel again.

This function accepts one additional option as part of the options object in addition to the standard [options](#options): `showIgnoredFiles`.
When set to true, `loadPartialConfig` always returns a result when a file is ignored, rather than `null`.
This is useful in order to allow the caller to access the list of files that influenced this outcome, e.g.
for watch mode. The caller can determine whether a file was ignored based on the returned `fileHandling` property.

- `babelrc: string | void` - The path of the [file-relative configuration](config-files.md#file-relative-configuration) file, if there was one.
- `babelignore: string | void` - The path of the `.babelignore` file, if there was one.
- `config: string | void` - The path of the [project-wide config file](config-files.md#project-wide-configuration) file, if there was one.
- `options: ValidatedOptions` - The partially resolved options, which can be manipulated and passed back to Babel again.
  - `plugins: Array<ConfigItem>` - See below.
  - `presets: Array<ConfigItem>` - See below.
  - It can be safely passed back to Babel. Options like [`"babelrc"`](options.md#babelrc) have been set
    to false so that later calls to Babel will not make a second attempt to
    load config files.
- `hasFilesystemConfig(): boolean` - Check if the resolved config loaded any settings from the filesystem.
- `fileHandling` - This is set to `"transpile"`, `"ignored"`, or `"unsupported"` to indicate to the caller what to do with this file.
- `files` - A `Set` of file paths that were read to build the resulting config, including project wide config files, local config files,
  extended config files, ignore files, etc. Useful for implementing watch mode or cache invalidation.

[`ConfigItem`](#configitem-type) instances expose properties to introspect the values, but each
item should be treated as immutable. If changes are desired, the item should be
removed from the list and replaced with either a normal Babel config value, or
with a replacement item created by `babel.createConfigItem`. See that
function for information about `ConfigItem` fields.

### createConfigItem

> babel.createConfigItem(value: string | {} | Function | [string | {} | Function, {} | void], { dirname?: string, type?: "preset" | "plugin" }): ConfigItem

Allows build tooling to create and cache config items up front. If this function
is called multiple times for a given plugin, Babel will call the plugin's function itself
multiple times. If you have a clear set of expected plugins and presets to
inject, pre-constructing the config items would be recommended.

### `ConfigItem` type

Each `ConfigItem` exposes all of the information Babel knows. The fields are:

- `value: {} | Function` - The resolved value of the plugin.
- `options: {} | void` - The options object passed to the plugin.
- `dirname: string` - The path that the options are relative to.
- `name: string | void` - The name that the user gave the plugin instance, e.g. `plugins: [ ['env', {}, 'my-env'] ]`
- `file: Object | void` - Information about the plugin's file, if Babel knows it.
  - `request: string` - The file that the user requested, e.g. `"@babel/env"`
  - `resolved: string` - The full path of the resolved file, e.g. `"/tmp/node_modules/@babel/preset-env/lib/index.js"`

## DEFAULT_EXTENSIONS

> babel.DEFAULT_EXTENSIONS: ReadonlyArray<string>

A list of default extensions supported by babel (".js", ".jsx", ".es6", ".es", ".mjs", "cjs").
This list is used by @babel/register and @babel/cli to determine which files need transpiling.
Extending this list isn't possible, however @babel/cli does provide ways to support other extensions with `--extensions`.

## Options

See [the full option list here](options.md).
