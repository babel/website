---
title: "Upgrade to Babel 8"
id: v8-migration
---

This document lists the breaking changes introduced in Babel 8.0.0, and how to adapt your usage of Babel to them when upgrading from Babel 7.0.0.

If you are working directly with Babel's API (because, for example, you maintain a custom Babel plugin), please also check the [migration guide for integration](./v8-migration-api.md).

<!--truncate-->

> If you are upgrading from Babel 6, please check the [Babel 7 migration guide](./v7-migration.md) first.

## Getting ready {#getting-ready}

Before migrating to Babel 8, we recommend that you update your Babel 7 configuration to align it with Babel 8's new defaults. Once your build process is working again with Babel 7, you can then upgrade to Babel 8.

You should read this full document to understand what options you need to change and which plugins you need to remove, but here are the most important steps to modernize your config:

- If you are not using a `.browserslistrc` file, define a top-level [`targets`](./options.md#targets) option. Babel 7 defaults to `targets: ">= 0%"` (all browsers), while Babel 8 defaults to [`targets: "defaults"`](https://browsersl.ist/#q=defaults). If you are using [`@babel/preset-env`'s `targets`](./preset-env.md#targets) option, copy its value to the top-level configuration (next to `presets`).
- If you use `@babel/preset-env`, enable its [`bugfixes`](./preset-env.md#bugfixes) option.
- If you use `@babel/preset-env`'s `loose` or `spec` options, [migrate to `assumptions`](./assumptions.md#migrating-from-babelpreset-envs-loose-and-spec-modes).
- If you use `@babel/preset-react` or `@babel/plugin-transform-react-jsx`, explicitly set their [`runtime`](./preset-react.md#runtime) option (Babel 7 defaults to `"classic"`, Babel 8 to `"automatic"`). If you keep using the classic runtime, set the [`useSpread`](./babel-plugin-transform-react-jsx.md#usespread) option to `true`.
- If you use the TypeScript or Flow presets, replace the `isTSX` and `allExtensions` options with [`ignoreExtensions`](#babel-preset-typescript).
- If you are transforming TypeScript or Flow, set the `allowDeclareFields` option to `true` (see [TypeScript](./preset-typescript.md#allowdeclarefields)).
- If you use [`@babel/plugin-transform-runtime`'s `corejs`](./babel-plugin-transform-runtime.md#corejs) or [`@babel/preset-env`'s `useBuiltIns`](./preset-env.md#usebuiltins) options, remove them and use [`babel-plugin-polyfill-corejs3`](https://github.com/babel/babel-polyfills/tree/main/packages/babel-plugin-polyfill-corejs3) instead.
- If you use `@babel/plugin-proposal-decorators`, set its [`version`](./plugin-proposal-decorators.md#version) option to `legacy` or `2023-11`.
- Remove the `@babel/plugin-proposal-record-and-tuple` and `@babel/plugin-syntax-import-assertions` plugins if you are using them.

## All of Babel

### Node.js support {#nodejs-support}

All Babel 8 packages require Node.js `^20.19.0 || >=22.12.0`.

We highly encourage you to use a newer version of Node.js (LTS v22) since the previous versions are not maintained.
See [nodejs/Release](https://github.com/nodejs/Release) for more information.

This just means Babel _itself_ won't run on older versions of Node. It can still _output_ code that runs on old Node versions.

### ESM only {#esm-only}

Babel is now shipped as native ECMAScript modules ([#11701](https://github.com/babel/babel/pull/11701), [#17265](https://github.com/babel/babel/pull/17265)).

### Peer dependency requirements {#peer-dependency-requirements}

- All presets and plugins require `@babel/core@^8.0.0` as peer dependency. Some Babel 7 plugins and presets might work with `@babel/core@8`, and some Babel 8 plugins and presets might work with `@babel/core@7`, but we do not provide any official support for that.
- `@babel/eslint-parser` and `@babel/eslint-plugin` require `eslint@^8.9.0` as peer dependency. ([#15563](https://github.com/babel/babel/issues/15563))

## Renamed Packages {#renamed-packages}

The following packages has been renamed from `...-proposal-...` to `...-transform-...`, as they have reached Stage 4 ([#15614](https://github.com/babel/babel/pull/15614)). The rename process has been landed in Babel 7.22 so you can start the migration prior to the upgrade.

| Babel 7 | Babel 8 |
| --- | --- |
| `@babel/plugin-proposal-async-generator-functions` | `@babel/plugin-transform-async-generator-functions` |
| `@babel/plugin-proposal-class-properties` | `@babel/plugin-transform-class-properties` |
| `@babel/plugin-proposal-class-static-block` | `@babel/plugin-transform-class-static-block` |
| `@babel/plugin-proposal-duplicate-named-capturing-groups-regex` | `@babel/plugin-transform-duplicate-named-capturing-groups-regex` |
| `@babel/plugin-proposal-dynamic-import` | `@babel/plugin-transform-dynamic-import` |
| `@babel/plugin-proposal-export-namespace-from` | `@babel/plugin-transform-export-namespace-from` |
| `@babel/plugin-proposal-json-strings` | `@babel/plugin-transform-json-strings` |
| `@babel/plugin-proposal-logical-assignment-operators` | `@babel/plugin-transform-logical-assignment-operators` |
| `@babel/plugin-proposal-nullish-coalescing-operator` | `@babel/plugin-transform-nullish-coalescing-operator` |
| `@babel/plugin-proposal-numeric-separator` | `@babel/plugin-transform-numeric-separator` |
| `@babel/plugin-proposal-object-rest-spread` | `@babel/plugin-transform-object-rest-spread` |
| `@babel/plugin-proposal-optional-catch-binding` | `@babel/plugin-transform-optional-catch-binding` |
| `@babel/plugin-proposal-optional-chaining` | `@babel/plugin-transform-optional-chaining` |
| `@babel/plugin-proposal-private-methods` | `@babel/plugin-transform-private-methods` |
| `@babel/plugin-proposal-private-property-in-object` | `@babel/plugin-transform-private-property-in-object` |
| `@babel/plugin-proposal-unicode-property-regex` | `@babel/plugin-transform-unicode-property-regex` |

## Discontinued Packages {#discontinued-packages}

### `@babel/runtime-corejs2` {#babel-runtime-corejs2}

`core-js@2` has not been maintained for years, and you should switch to `core-js@3` instead.

Please upgrade to `@babel/runtime-corejs3` ([#11751](https://github.com/babel/babel/issues/10746#issuecomment-573402372)). After
you install the new runtime, please set the [`corejs` version](https://babel.dev/docs/babel-plugin-transform-runtime#corejs) to the `core-js` version that you are using.

```diff title="babel.config.json"
  {
    "plugins": [
-     ["@babel/transform-runtime", { corejs: 2 }]
+     "@babel/transform-runtime",
+     ["babel-plugin-polyfill-corejs3", { method: "usage-pure", version: "3.42.0" }]
    ]
  }
```

### `@babel/plugin-syntax-import-assertions` {#babel-plugin-syntax-import-assertions}

The proposal evolved into [import attributes](https://github.com/tc39/proposal-import-attributes), which now Babel supports parsing by default. You can remove `@babel/plugin-syntax-import-assertions` from your config, and  replace the following patterns in your codebase:

```diff title="input.js"
- import value from "module" assert { type: "json" };
+ import value from "module" with { type: "json" };
```

### `@babel/plugin-proposal-record-and-tuple` {#babel-plugin-proposal-record-and-tuple}

The Records and Tuples proposal has been withdrawn in TC39, which means that the syntax is not on track anymore to be included in the language.

You will need to migrate away from the Records and Tuples syntax, and you can directly use the [`@bloomberg/record-tuple-polyfill`](https://github.com/bloomberg/record-tuple-polyfill) polyfill as if it was a standalone library.

```diff title="input.mjs"
+ import { Record, Tuple } from "@bloomberg/record-tuple-polyfill"

// syntaxType: "hash"

- #{ p: "value" }
+ Record({ p: "value" })

- #[0, 1, 2]
+ Tuple(0, 1, 2)

// syntaxType: "bar"
- {| p: "value" |}
+ Record({ p: "value" })

- [|0, 1, 2|]
+ Tuple(0, 1, 2)
```

If you have to do a large scale migration. You can run Babel 7 with only the `@babel/plugin-proposal-record-and-tuple` plugin to transform the code base:
```json title="babel.record-tuple-migration.config.json"
{
  "babelrc": false,
  "configFile": false,
  "generateOpts": {
    "experimental_preserveFormat": true,
    "retainLines": true,
    "tokens": true
  },
  "parserOpts": {
    "createParenthesizedExpressions": true
  },
  "plugins": [
    "@babel/plugin-syntax-jsx",
    "@babel/plugin-syntax-typescript",

    // or syntaxType: "bar" if you are using `{||}` or `[||]`
    ["@babel/plugin-proposal-record-and-tuple", {
      "syntaxType": "hash", "importPolyfill": true
    }]
  ]
}
```

And then run `@babel/cli@7` to transform the input source `src`, this command will output the transformed source to `src-mod`:
```sh npm2yarn
npx @babel/cli@7 --config-file ./babel.record-tuple-migration.config.json src --out-lib src-mod
```

Please manually check whether `src-mod` is correct. If everything looks good, overwrite `src` with contents in `src-mod`.

### Syntax plugins {#syntax-plugins}

The following syntax plugins are no longer needed, you can safely remove them from your configuration and dependencies:

- `@babel/plugin-syntax-async-functions`
- `@babel/plugin-syntax-async-generators`
- `@babel/plugin-syntax-bigint`
- `@babel/plugin-syntax-class-properties`
- `@babel/plugin-syntax-class-static-block`
- `@babel/plugin-syntax-dynamic-import`
- `@babel/plugin-syntax-exponentiation-operator`
- `@babel/plugin-syntax-export-extensions`
- `@babel/plugin-syntax-export-namespace-from`
- `@babel/plugin-syntax-import-meta`
- `@babel/plugin-syntax-json-strings`
- `@babel/plugin-syntax-logical-assignment-operators`
- `@babel/plugin-syntax-module-string-names`
- `@babel/plugin-syntax-nullish-coalescing-operator`
- `@babel/plugin-syntax-numeric-separator`
- `@babel/plugin-syntax-object-rest-spread`
- `@babel/plugin-syntax-optional-catch-binding`
- `@babel/plugin-syntax-optional-chaining`
- `@babel/plugin-syntax-private-property-in-object`
- `@babel/plugin-syntax-top-level-await`
- `@babel/plugin-syntax-trailing-function-commas`
- `@babel/plugin-syntax-unicode-sets-regex`

## Per-package breaking changes

### `@babel/core` {#babel-core}

![high](https://img.shields.io/badge/risk%20of%20breakage%3F-high-red.svg)

- Use browserslist's `defaults` as default compilation target ([#12989](https://github.com/babel/babel/pull/12989), [#15551](https://github.com/babel/babel/pull/15551)).

  If you are already using the `targets` option or have a `.browserslistrc` config file, this change won't affect you.

  **Migration**: You'll probably be fine with the new behavior since the [browserslist's `defaults` covers most modern browsers](https://browsersl.ist/#q=defaults). If you need to support legacy browsers, create a [`.browserslistrc` config](https://github.com/browserslist/browserslist#queries), or specify the [`targets`](https://babeljs.io/docs/options#targets) option.

![medium](https://img.shields.io/badge/risk%20of%20breakage%3F-medium-yellow.svg)

- The root AMD/UMD/SystemJS options, namely [`moduleIds`](./options.md#moduleids), [`getModuleId`](./options.md#getmoduleid), [`moduleRoot`](./options.md#moduleroot), [`moduleId`](./options.md#moduleid) and [`filenameRelative`](./options.md#filenamerelative) are moved to plugin options ([#5473](https://github.com/babel/babel/issues/5473), [#12724](https://github.com/babel/babel/pull/12724)).

  **Migration**: Move these options to the plugin you are using to transform modules. For example, if you are using
  `@babel/plugin-transform-modules-systemjs`:
  ```js title="babel.config.js"
  module.exports = {
    plugins: [
      ['@babel/plugin-transform-modules-systemjs', {
        // highlight-start
        moduleIds: true,
        moduleRoot: 'myApp',
        getModuleId (name) {
          return name + "suffix";
        },
        // highlight-end
      }],
    ],
  };
  ```
  Adapt the example above if you are using `@babel/plugin-transform-modules-amd` or `@babel/plugin-transform-modules-umd`. You can start the migration prior to Babel 8.0.

  If you are using `@babel/cli` and passing `--module-ids`, `--module-root` and `--module-id` from command line, please create a Babel config `babel.config.js` and specify options there.

  If you are transforming ESM through `@babel/preset-env`, you will need to explicitly use one of the `@babel/plugin-transform-modules-...` plugins.

- `targets.esmodules: true` option now behaves as same as `targets.esmodules: "intersect"` ([#17188](https://github.com/babel/babel/pull/17188))

  **Migration**: In Babel 7, specifying `esmodules: true` will override the `browsers` target or `browserslist`'s targets, while specifying `"intersect"` will intersect with such targets.

  If your app targets modern browsers released after 2019, you can safely remove the `esmodules` option as they all support ES modules.

  If your app targets legacy browsers such as IE, you can also remove the `esmodules` option as IE requires more transforms than any other browser.

  If your app targets browsers released before 2019 and you want to preserve the Babel 7 `esmodules: true` behavior, remove the `esmodules` option and set the following `browsers` target:

  ```json title="babel.config.json"
  {
    "targets": {
      "browsers": "chrome 61, firefox 60, safari 10.1, node 13.2"
    }
  }
  ```

- Remove `uglify` target ([#12594](https://github.com/babel/babel/pull/12594))

  **Migration**: The `uglify` target had been deprecated since 7.0.0. If you are using it to force `@babel/preset-env` to transpile down to ES5 and you still need to do so, you can use its [`forceAllTransforms`](preset-env.md#forcealltransforms) option.

### `@babel/parser` {#babel-parser}

![medium](https://img.shields.io/badge/risk%20of%20breakage%3F-medium-yellow.svg)

- Remove the `estree` parser plugin's `classFeatures`  option ([#13752](https://github.com/babel/babel/pull/13752))

  **Migration**: Remove the option from your config, since it's now enabled by default. Previously the `classFeatures` plugin enables `@babel/parser` to produce class properties AST compatible with ESLint 8, following the ESTree specification. In Babel 8 the `eslint-parser` only works with ESLint 8 and above.

- Remove the `decimal` parser plugin ([#16741](https://github.com/babel/babel/pull/16741))

  **Migration**: Migrate your project to the latest proposal and remove the plugin from your config since the proposal doesn't include syntax anymore.

  ```diff title="example.js"
  - 1.03m
  + new Decimal("1.03")
  - decimal1 + decimal2
  + decimal1.add(decimal2)
  ```

- Remove the `importAssertions` parser plugin ([#16770](https://github.com/babel/babel/pull/16770))

  This plugin was for an old version of the import attributes proposal, using the `assert` keyword instead of `with`. The proposal moved ahead without the `assert` keyword.

  **Migration**: If possible, replace `assert` with `with` in your code. If doing so is not possible, you can temporarily use the `deprecatedImportAssert` parser plugin.

- Remove the `importReflection` parser plugin ([#16808](https://github.com/babel/babel/pull/16808))

  The "import reflection" proposal does not exist anymore, and it was superseeded by the "source phase imports" proposal, which uses the `source` modifier for imports instead of `module`.

  **Migration**: Replace the plugin with `sourcePhaseImports`, and migrate your code to use `source` instead of `module` in import declarations.

  ```diff title="example.js"
  - import module x from "foo";
  + import source x from "foo";
  ```

![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

- [Disallow sequence expressions inside JSX attributes](https://github.com/babel/babel/issues/8604) ([#12447](https://github.com/babel/babel/pull/12447))

  **Migration**: Find and replace the following code patterns. You can start the migration prior to Babel 8:
  ```diff title="input.jsx"
  - <p key={foo, bar}></p> // Invalid
  + <p key={(foo, bar)}></p> // Valid
  ```

- [Disallow `{`, `}`, `<` and `>` in JSX text](https://github.com/babel/babel/issues/11042) ([#12451](https://github.com/babel/babel/pull/12451))

  **Migration**: Use `{'{'}`, `{'}'}`, `{'<'}` and `{'>'}` instead. Find and replace the following code patterns. You can start the migration prior to Babel 8:
  ```diff title="input.jsx"
  - <p>">" is greater than.</p>
  + <p>"{'>'}" is greater than.</p>
  ```
  **Notes**: This is technically a spec compliance fix because the [JSX specification](https://facebook.github.io/jsx/#prod-JSXTextCharacter) already forbids them. However, we have chosen to postpone it until Babel 8 because it could break someone's code.

### `@babel/generator` {#babel-generator}

![medium](https://img.shields.io/badge/risk%20of%20breakage%3F-medium-yellow.svg)

- Remove the `jsonCompatibleStrings` option ([#9943](https://github.com/babel/babel/issues/9943), [#12477](https://github.com/babel/babel/pull/12477))

  **Migration**: `@babel/generator` allows to specify options for [jsesc](https://github.com/mathiasbynens/jsesc), a library used to escape printed values. If you are using the `jsonCompatibleStrings` option, you can replace it with `jsescOption: { json: true }`.

![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

- Output non-ASCII characters as-is in string literals ([#12675](https://github.com/babel/babel/pull/12675))

  If you are using any one of `@babel/cli`, webpack, Rollup, or other Node.js powered bundlers, the transformed code is always encoded with `utf-8` and your app will not be affected. The issue only affects if you are manually calling the `babel.transform` API and your web server is not serving js files in the `utf8` encoding.

  **Migration**: Ensure your server is always serving js files in the `utf8` encoding. If you can not control the server output, specify the `charset` attribute of the `script` tag in the html files.
  ```html
  <script charset="utf-8" src="your-app.js"></script>
  ```
  You can also restore to the Babel 7 behaviour by setting
  ```js title="babel.config.js"
  {
    generatorOpts: {
      jsescOption: {
        minimal: false
      }
    }
  }
  ```

### `@babel/preset-env` {#babel-preset-env}

:::note
`@babel/preset-env`'s `targets` option inherits its behavior from the top-level `targets` option, so make sure to check the [@babel/core](#babel-core) section.
:::

![high](https://img.shields.io/badge/risk%20of%20breakage%3F-high-red.svg)

- The `loose` and `spec` options have been removed ([#16043](https://github.com/babel/babel/pull/16043))

  **Migration**: You can use the [`assumptions`](https://babeljs.io/docs/assumptions) top-level option instead. See ["Migrating from @babel/preset-env's "loose" and "spec" modes"](https://babeljs.io/docs/assumptions#migrating-from-babelpreset-envs-loose-and-spec-modes) for the ready-to-copy equivalent configuration.

![medium](https://img.shields.io/badge/risk%20of%20breakage%3F-medium-yellow.svg)

- `includes` and `excludes` respect renamed package names ([#15576](https://github.com/babel/babel/pull/15576))

  **Migration**: If `includes` or `excludes` contain any plugins mentioned in the [Packages Renames section](./v8-migration.md#renamed-packages), change it to the new name. For example,

  ```diff title="babel.config.json"
  {
    "presets": [[
      "@babel/preset-env",
      {
  -     "includes": ["proposal-optional-chaining"]
  +     "includes": ["transform-optional-chaining"]
      }
    ]]
  }
  ```

![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

- Enable the [`bugfixes`](./preset-env.md#bugfixes) option by default ([#13866](https://github.com/babel/babel/pull/13866))

  **Migration**: You will probably be fine with the new behaviour as Babel now tries to compile the broken syntax to the closest _non-broken modern syntax_ supported by your target browsers. If anyhow you want to restore the Babel 7 behaviour, you can specify `bugfixes: false`.

- Removed syntax plugins can not be used in `includes` and `excludes` ([#15810](https://github.com/babel/babel/pull/15810))

  **Migration**: You can safely remove them if you are using any of [syntax plugins listed above](#syntax-plugins) in the `includes` and `excludes` options.

### `@babel/preset-react` and `@babel/plugin-transform-react-jsx` {#babel-preset-react}

:::note
`@babel/parser` also includes some JSX-related breaking changes, so make sure to check the [@babel/parser](#babel-parser) section.
:::

![high](https://img.shields.io/badge/risk%20of%20breakage%3F-high-red.svg)

- [Use the new JSX implementation by default](https://github.com/babel/babel/pull/11154#issuecomment-591188203) ([#12630](https://github.com/babel/babel/pull/12630))

  **Migration**: If you are using a modern version of React or Preact, it should work without any configuration changes. Otherwise, you can pass the [`runtime: "classic"`](preset-react.md#runtime) option to `@babel/preset-react` or `@babel/plugin-transform-react-jsx` to be explicit about your usage of `createElement` (or the equivalent function in other libraries).

- Make the `development` option default to the configured environment ([#16927](https://github.com/babel/babel/pull/16927))

  Note that Babel's environment, set through [`envName` option](./options.md#envname), defaults to
  `process.env.BABEL_ENV || process.env.NODE_ENV || "development"`: if you don't specify neither the `envName` option
  nor the `BABEL_ENV` or `NODE_ENV` environment variables, it will default to `development`.

  **Migration**: In production builds, set the `BABEL_ENV` or `NODE_ENV` environment variables, or the `envName` Babel
  option, to `"production"`. If you want to run _only this preset_ in production mode, then you can explicitly set the
  `development` option to `false`.

![medium](https://img.shields.io/badge/risk%20of%20breakage%3F-medium-yellow.svg)

- Remove `useSpread` and `useBuiltIns` options ([#12593](https://github.com/babel/babel/pull/12593))

  **Migration**: Babel 8 always compiles JSX spread elements to object spread:
  ```jsx title="input.jsx"
  <div {...props}></div>
  // transforms to
  jsx("div", { ...props })
  ```

  If your app targets to modern browsers released after 2019, you can safely remove these options as object spread has less code footprint.

  If your code needs to run in an environment which doesn't support object spread, you can either use `@babel/preset-env` (recommended) or `@babel/plugin-transform-object-rest-spread`. If you want to transpile `Object.assign` down, you also need to enable `@babel/plugin-transform-object-assign`.

  In Babel 7.7.0, you can opt into the Babel 8 behavior by using the `useSpread: true` option.

- Type check input options ([#12460](https://github.com/babel/babel/pull/12460))

  **Migration**: The preset will also report invalid option names. Refer to the [docs](./preset-react.md#options) and ensure valid usage.

![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

- Disallow `filter` option in automatic runtime ([#15068](https://github.com/babel/babel/pull/15068/commits/e2dd3be6e38b0254bc69a8e52c265214235829c6))

  **Migration**: The `filter` option can only be used with the `classic` runtime. If you have switched to `automatic` runtime, you can safely remove this option. Otherwise please specify `runtime: "classic"`.

### `@babel/preset-typescript` {#babel-preset-typescript}

:::note
Make sure to also check the [@babel/plugin-transform-typescript](#babel-plugin-transform-typescript) changes changes, since it's what this preset uses under the hood.
:::

![high](https://img.shields.io/badge/risk%20of%20breakage%3F-high-red.svg)

- Remove `isTSX` and `allExtensions` options ([#14955](https://github.com/babel/babel/pull/14955))

  **Migration**:
  - `isTSX: true` and `allExtensions: true`

    If you are already using `@babel/preset-react`, `@babel/plugin-transform-react-jsx` or any other third-party jsx presets such as `@vue/babel-preset-jsx`, and you want to transpile `.tsx` files, you can safely remove these two options. Babel 8 will automatically handle `.tsx` files using this preset and the other JSX plugin.

    ```diff title="babel.config.json"
    {
      "presets": [
        ["@babel/preset-react", { "runtime": "automatic" }],
    -   ["@babel/preset-typescript", { "allExtensions": true, "isTSX": true }]
    +   ["@babel/preset-typescript"]
      ]
    }
    ```

    If you want to transpile files other than `.tsx`, such as `.vue`, use `ignoreExtensions: true`:

    ```diff title="babel.config.js"
    {
      overrides: [{
        include: /\.vue$/,
        presets: [
          ['@babel/preset-typescript', {
    -       allExtensions: true, isTSX: true
    +       ignoreExtensions: true
          }]
        ]
      }]
    }
    ```

    If you want to preserve the JSX format but transpile the TypeScript part, use `ignoreExtensions: true` and enable the [`@babel/plugin-syntax-jsx`](./plugin-syntax-jsx.md) plugin.

  - `isTSX: false` and `allExtensions: true`

    Use `ignoreExtensions: true`, see the example above.

  - `isTSX: false` and `allExtensions: false`

    You can safely remove them.


![medium](https://img.shields.io/badge/risk%20of%20breakage%3F-medium-yellow.svg)

- Remove `allowDeclareFields` option ([#12461](https://github.com/babel/babel/pull/12461))

  **Migration**: Remove the option from your config, since it's now enabled by default.

- Type check input options ([#12460](https://github.com/babel/babel/pull/12460))

  **Migration**: The preset will also report invalid option names. Refer to the [docs](./preset-typescript.md#options) and ensure valid usage. For example, `runtime` is not a valid `preset-typescript` option and thus should be removed.

### `@babel/plugin-transform-typescript` {#babel-plugin-transform-typescript}

![high](https://img.shields.io/badge/risk%20of%20breakage%3F-high-red.svg)

- [Preserve uninitialized class fields](https://github.com/babel/babel/issues/10039) ([#12461](https://github.com/babel/babel/pull/12461))

  **Migration**: If you don't want fields to be initialized to `undefined` use the `declare` syntax, introduced in TypeScript 3.7:
  ```ts title="input.ts"
  class A {
    foo: string | void; // initialized to undefined
    declare bar: number; // type-only, will be removed
  }
  ```

![medium](https://img.shields.io/badge/risk%20of%20breakage%3F-medium-yellow.svg)

- Remove `allowDeclareFields` option ([#12461](https://github.com/babel/babel/pull/12461))

  **Migration**: Remove the option from your config, since it's now enabled by default.

### `@babel/plugin-syntax-typescript` {#babel-plugin-syntax-typescript}

![high](https://img.shields.io/badge/risk%20of%20breakage%3F-high-red.svg)

- Remove `isTSX` option ([#14955](https://github.com/babel/babel/pull/14955))

  **Migration**: If you are using `isTSX: true`, remove this option and enable the [`@babel/plugin-syntax-jsx`](./plugin-syntax-jsx.md) plugin:

  ```diff title="babel.config.json
  {
    "plugins": [
  -   ["@babel/plugin-syntax-typescript", { "isTSX": true }]
  +   "@babel/plugin-syntax-typescript",
  +   "@babel/plugin-syntax-jsx"
    ]
  }
  ```

  If you are using `isTSX: false`, you can safely remove it.

### `@babel/preset-flow` {#babel-preset-flow}

:::note
Make sure to also check the [@babel/plugin-transform-flow-strip-types](#babel-plugin-transform-flow-strip-types) changes, since it's what this preset uses under the hood.
:::

![medium](https://img.shields.io/badge/risk%20of%20breakage%3F-medium-yellow.svg)

- Type check input options ([#12460](https://github.com/babel/babel/pull/12460))

  **Migration**: The preset will also report invalid option names. Refer to the [docs](./preset-flow.md#options) and ensure valid usage.

- Remove the `allowDeclareFields` and `enums` options ([#12457](https://github.com/babel/babel/pull/12457), [#16792](https://github.com/babel/babel/pull/16792))

  **Migration**: Remove these options from your config, since they are now enabled by default.

### `@babel/plugin-transform-flow-strip-types` {#babel-plugin-transform-flow-strip-types}

![high](https://img.shields.io/badge/risk%20of%20breakage%3F-high-red.svg)

- [Preserve uninitialized class fields](https://github.com/babel/babel/issues/10039) ([#12457](https://github.com/babel/babel/pull/12457))

  **Migration**:
  Use the new `declare` syntax, introduced in Flow 0.120, if you don't want fields to be initialized to `undefined`:
  ```flow title="input.js"
  class A {
    foo: string | void; // initialized to undefined
    declare bar: number; // type-only, will be removed
  }
  ```

![medium](https://img.shields.io/badge/risk%20of%20breakage%3F-medium-yellow.svg)

- Remove the `allowDeclareFields` and `enums` options ([#12457](https://github.com/babel/babel/pull/12457), [#16792](https://github.com/babel/babel/pull/16792))

  **Migration**: Remove these options from your config, since they are now enabled by default.

### `@babel/plugin-transform-runtime` {#babel-plugin-transform-runtime}

![high](https://img.shields.io/badge/risk%20of%20breakage%3F-high-red.svg)

- The `corejs` option has been removed ([#16311](https://github.com/babel/babel/pull/16311))

  **Migration**: To inject polyfills, you can use [`babel-plugin-polyfill-corejs3`](https://github.com/babel/babel-polyfills/blob/main/packages/babel-plugin-polyfill-corejs3/README.md) or the deprecated [`babel-plugin-polyfill-corejs2`](https://github.com/babel/babel-polyfills/blob/main/packages/babel-plugin-polyfill-corejs2/README.md) directly.

![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

- The `useESModules` option has been removed ([#16141](https://github.com/babel/babel/pull/16141))

  **Migration**: Delete it from your configuration. `@babel/runtime` will now automatically expose ES modules when needed, using `package.json#exports`.

- The `runtime` and `helpers` options have been removed ([#16311](https://github.com/babel/babel/pull/16311))

  **Migration**: Delete them from your configuration: `@babel/runtime` will now always import helpers. If you don't want to inject imports to helpers, remove `@babel/plugin-transform-runtime` from your config.


### `@babel/plugin-transform-modules-systemjs` {#babel-plugin-transform-modules-systemjs}

![medium](https://img.shields.io/badge/risk%20of%20breakage%3F-medium-yellow.svg)

- [Require `@babel/plugin-transform-dynamic-import` when transforming `import()` to SystemJS](https://github.com/babel/babel/blob/78cd63d9cfcd96e6a151c58fed392c3ee757d861/packages/babel-plugin-transform-modules-systemjs/src/index.js#L183-L185) ([#12700](https://github.com/babel/babel/pull/12700))

  **Migration**: Add `@babel/plugin-transform-dynamic-import` to your config: you can already do it in Babel 7. If you are using `@babel/preset-env`, you don't need to do anything.
  ```diff title="babel.config.js.diff"
  {
    "plugins": [
  +   "@babel/plugin-transform-dynamic-import",
      "@babel/plugin-transform-modules-systemjs",
    ]
  }
  ```
  **Notes**: All the other plugins which support dynamic import (`transform-modules-commonjs` and `transform-modules-amd`) require the separate plugin since it was introduced. We couldn't change it for `transform-modules-systemjs` because that package did already support dynamic import.

### `@babel/plugin-transform-regenerator` {#babel-plugin-transform-regenerator}

![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

- Do not replace global `regeneratorRuntime` references ([#17237](https://github.com/babel/babel/pull/17237))

  Babel 7 used to replace references to a `regeneratorRuntime` global with Babel's `regeneratorRuntime` helper:
  ```js title="input.js"
  console.log(regeneratorRuntime.isGeneratorFunction(fn));
  ```
  ```js title="output.js"
  import _regeneratorRuntime from "@babel/runtime/regenerator";
  console.log(_regeneratorRuntime.isGeneratorFunction(fn));
  ```

  This doesn't happen anymore in Babel 8.

  **Migration**: The recommended approach is to update your code to not rely on a non-existent `regeneratorRuntime` global. If that's not possible, you can either import the unmaintained [`regenerator-runtime`](https://www.npmjs.com/package/regenerator-runtime) package in your application entrypoint, which will define the `regeneratorRuntime` global, or use [`babel-plugin-polyfill-regenerator`](https://github.com/babel/babel-polyfills/blob/main/packages/babel-plugin-polyfill-regenerator/README.md) to automatically inject that import for you.

### `@babel/plugin-proposal-decorators` {#babel-plugin-proposal-decorators}

![medium](https://img.shields.io/badge/risk%20of%20breakage%3F-medium-yellow.svg)

- Only support the `legacy` and `2023-11` versions of the proposal. In addition to that, the plugin now requires a [`version`](./plugin-proposal-decorators.md#version) option ([#12712](https://github.com/babel/babel/pull/12712), [#15676](https://github.com/babel/babel/pull/15676))

  **Migration**: You should migrate to the [latest version of the proposal](https://github.com/tc39/proposal-decorators/), `"2023-11"`.

  ```diff title="babel.config.json"
  {
    "plugins": [
      ["@babel/plugin-proposal-decorators", {
  -     "decoratorsBeforeExport": true,
  -     "version": "2018-09",
  +     "version": "2023-11"
      }]
    ]
  }
  ```
  The syntax is the same, but you will need to rewrite your decorator functions. The spec repo provides [comparison between the latest version and the `2018-09` version](https://github.com/tc39/proposal-decorators#comparison-with-the-previous-stage-2-decorators-proposal). You can already migrate since Babel 7.22.0, using the `"version": "2023-11"` option of `@babel/plugin-proposal-decorators`.

  Although Babel 8 still supports the `legacy` version, it is advisable to migrate to the `2023-11` version regardless: both Babel 8 and TypeScript 5.0 support the `2023-11` version, while there are [a few behaviour differences](https://github.com/babel/babel/issues/8864#issuecomment-688535867) in the `legacy` version between Babel and `tsc`'s implementation. Browsers will only implement the latest version of the proposal.


### `@babel/eslint-parser` {#babel-eslint-parser}

![medium](https://img.shields.io/badge/risk%20of%20breakage%3F-medium-yellow.svg)

- Remove `allowImportExportEverywhere` option ([#13921](https://github.com/babel/babel/pull/13921))

  **Migration**: Use `babelOptions.parserOpts.allowImportExportEverywhere` instead.

  ```diff title=".eslintrc"
  {
    "parser": "@babel/eslint-parser",
    "parserOptions": {
  -   "allowImportExportEverywhere": true,
  +   "babelOptions": {
  +     "parserOpts": {
  +       "allowImportExportEverywhere": true
  +     }
  +   }
    }
  }
  ```

![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

- `parserOpts.allowSuperOutsideMethod` defaults to `false` ([#13921](https://github.com/babel/babel/pull/13921))

  **Migration**: If you want to restore to Babel 7 behaviour, set `babelOptions.parserOpts.allowSuperOutsideMethod` to `true`.

- `allowReturnOutsideFunction` is inferred from `ecmaFeatures.globalReturn` ([#13921](https://github.com/babel/babel/pull/13921))

  **Migration**: If you want to enable `allowReturnOutsideFunction`, set [`ecmaFeatures.globalReturn`](https://eslint.org/docs/latest/use/configure/language-options#specifying-parser-options) to `true`.

  ```json title=".eslintrc"
  {
    "parser": "@babel/eslint-parser",
    "parserOptions": {
      "ecmaFeatures": {
        "globalReturn": true
      }
    }
  }
  ```

### `@babel/node` {#babel-node}

![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

- The `-gc` and `-d` command-line flags have been removed ([#15956](https://github.com/babel/babel/pull/15956))
  **Migration**: Use the `--expose-gc` and `--inspect` Node.js flags respectively. Note that although `-d` was short for `--debug`, the latter has been [deprecated since Node.js 7.7.0](https://nodejs.org/en/docs/guides/debugging-getting-started#legacy-debugger).

- Command-line flags for Node.js and Babel must now be passed _before_ the filename, while flags for the script itself must be passed after. ([#16706](https://github.com/babel/babel/pull/16706)):

  ```
  babel-node --flag-for-node --flag-for-babel script.js --flag-for-script
  ```
