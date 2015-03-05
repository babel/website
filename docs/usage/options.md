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
| `loose`                  | `[]`                 | Array of transformers to enable [loose mode](/docs/usage/loose) on. |
| `optional`               | `[]`                 | Array of transformers to [optionally](/docs/usage/transformers#optional) use. Run `babel --help` to see a full list of transformers. Optional transformers displayed inside square brackets. |
| `modules`                | `"common"`           | Which module formatter to use. Run `babel --help` to see a full list of module formatters. |
| `sourceMap`              | `false`              | If truthy, adds a `map` property to returned output. If set to `"inline"`, a comment with a sourceMappingURL directive is added to the bottom of the returned code. |
| `sourceMapName`          | `(filenameRelative)` | Set `file` on returned source map. |
| `sourceFileName`         | `(filenameRelative)` | Set `sources[0]` on returned source map. |
| `sourceRoot`             | `(moduleRoot)`       | The root from which all sources are relative. |
| `moduleRoot`             | `(sourceRoot)`       | Optional prefix for the AMD module formatter that will be prepend to the filename on module definitions. |
| `moduleIds`              | `false`              | If truthy, insert an explicit id for modules. By default, all modules are anonymous. (Not available for `common` modules) |
| `moduleId`               | `null`               | Specify a custom name for module ids. |
| `resolveModuleSource`    | `null`               | Resolve a module source ie. `import "SOURCE";` to a custom value. Called as `resolveModuleSource(source, filename)`. |
| `keepModuleIdExtensions` | `false`              | Keep extensions in module ids |
| `externalHelpers`        | `false`              | Uses a reference to `babelHelpers` instead of placing helpers at the top of your code. Meant to be used in conjunction with [external helpers](/docs/usage/external-helpers). |
| `code`                   | `true`               | Enable code generation |
| `ast`                    | `true`               | Include the ÅST in the returned object |
| `playground`             | `false`              | Enable [playground](/docs/usage/playground) support. |
| `experimental`           | `false`              | Enable support for [experimental](/docs/usage/experimental) ES7 features. |
| `compact`                | `"auto"`             | Do not include superfluous whitespace characters and line terminators. When set to `"auto"` compact is set to `true` on input sizes of >100KB. |
| `comments`               | `true`               | Output comments in generated output. |
| `returnUsedHelpers`      | `false`              | See [external helpers - selective builds](/docs/usage/external-helpers#selective-builds) for more information. |
