---
layout: docs
title: Options
description: Options for babel transpiling.
permalink: /docs/usage/options/
---

## Usage

```js
babel.transform(code, options);
```

```sh
$ babel --name=value
```

## Options

| Option                   | Default              | Description                     |
| ------------------------ | -------------------- | ------------------------------- |
| `filename`               | `"unknown"`          | Filename for use in errors etc. |
| `filenameRelative`       | `(filename)`         | Filename relative to `sourceRoot`. |
| `blacklist`              | `[]`                 | Array of transformers to **exclude**. Run `babel --help` to see a full list of transformers. |
| `whitelist`              | `[]`                 | Array of transformers to **only** use. Run `babel --help` to see a full list of transformers. |
| `loose`                  | `[]`                 | Array of transformers to enable [loose mode](/docs/advanced/loose) on. |
| `optional`               | `[]`                 | Array of transformers to [optionally](/docs/advanced/transformers#optional) use. Run `babel --help` to see a full list of transformers. Optional transformers displayed inside square brackets. |
| `nonStandard`            | `true`               | Enable support for JSX and Flow. |
| `highlightCode`          | `true`               | ANSI highlight syntax error code frames |
| `only`                   | `null`               | A [glob](https://github.com/isaacs/minimatch), regex, or mixed array of both, matching paths to **only** compile. Can also be an array of arrays containing paths to explicitly match. When attempting to compile a non-matching file it's returned verbatim. |
| `ignore`                 | `null`               | Opposite to the `only` option. |
| `jsxPragma`              | `null`               | Custom pragma to use for JSX elements |
| `auxiliaryComment`       | `null`               | Attach a comment before all helper declarations and auxiliary code. eg. `"istanbul ignore next"` |
| `sourceMaps`             | `false`              | If truthy, adds a `map` property to returned output. If set to `"inline"`, a comment with a sourceMappingURL directive is added to the bottom of the returned code. If set to `"both"` then a `map` property is returned as well as a source map comment appended. |
| `inputSourceMap`         | `null`               | A source map object that the output source map will be based on. |
| `sourceMapTarget`        | `(filenameRelative)` | Set `file` on returned source map. |
| `sourceFileName`         | `(filenameRelative)` | Set `sources[0]` on returned source map. |
| `sourceRoot`             | `(moduleRoot)`       | The root from which all sources are relative. |
| `moduleRoot`             | `(sourceRoot)`       | Optional prefix for the AMD module formatter that will be prepend to the filename on module definitions. |
| `modules`                | `"common"`           | Which module formatter to use. Run `babel --help` to see a full list of module formatters. |
| `moduleIds`              | `false`              | If truthy, insert an explicit id for modules. By default, all modules are anonymous. (Not available for `common` modules) |
| `moduleId`               | `null`               | Specify a custom name for module ids. |
| `getModuleId`            | `null`               | Specify a custom callback to generate a module id with. Called as `getModuleId(moduleName)`. If falsy value is returned then the generated module id is used. |
| `resolveModuleSource`    | `null`               | Resolve a module source ie. `import "SOURCE";` to a custom value. Called as `resolveModuleSource(source, filename)`. |
| `keepModuleIdExtensions` | `false`              | Keep extensions in module ids |
| `externalHelpers`        | `false`              | Uses a reference to `babelHelpers` instead of placing helpers at the top of your code. Meant to be used in conjunction with [external helpers](/docs/advanced/external-helpers). |
| `code`                   | `true`               | Enable code generation |
| `ast`                    | `true`               | Include the AST in the returned object |
| `stage`                  | `2`                  | Set the [experimental](/docs/usage/experimental) proposal stage. |
| `compact`                | `"auto"`             | Do not include superfluous whitespace characters and line terminators. When set to `"auto"` compact is set to `true` on input sizes of >100KB. |
| `comments`               | `true`               | Output comments in generated output. |
| `metadataUsedHelpers`    | `false`              | See [external helpers - selective builds](/docs/advanced/external-helpers#selective-builds) for more information. |
| `env`                    | `{}`                 | <p>This is an object of keys that represent different environments. For example, you may have:</p> <pre><code>{ env: { production: { /* specific options */ } } }`</pre></code> <p>which will use those options when the enviroment variable <code>BABEL_ENV</code> is set to <code>"production"</code>. If <code>BABEL_ENV</code> isn't set then <code>NODE_ENV</code> will be used, if it's not set then it defaults to <code>"development"</code></p> |
| `retainLines`            | `false`              | <p>Retain line numbers. This will lead to wacky code but is handy for scenarios where you can't use source maps.</p>**NOTE:** This will obviously not retain the columns. |
