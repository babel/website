---
id: babel-eslint-plugin
title: "@babel/eslint-plugin"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Companion rules for [`@babel/eslint-parser`](./eslint-parser.md). `@babel/eslint-parser` does a great job at adapting `eslint`
for use with Babel, but it can't change the built-in rules to support experimental features.
`@babel/eslint-plugin` re-implements problematic rules so they do not give false positives or negatives.

## Install

```shell npm2yarn
npm install @babel/eslint-plugin --save-dev
```

## Predefined configurations

`@babel/eslint-plugin` has two predefined configurations:

- `recommended`: Enables all companion rules when the reimplemented built-in rules are in the [`js/recommended` predefined configurations](https://eslint.org/docs/latest/use/configure/configuration-files#use-predefined-configurations).

- `all`: Enables all companion rules.

```js title="eslint.config.js"
import babelParser from "@babel/eslint-parser";
import babelPlugin from "@babel/eslint-plugin";
import js from "@eslint/js";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.js", "**/*.cjs", "**/*.mjs"],
    languageOptions: {
      parser: babelParser,
    },
    plugins: {
      babel: babelPlugin
    },
    extends: [
      js.configs.recommended,
      babelPlugin.configs.recommended
    ]
  },
]);
```

## Rules

Each rule corresponds to a core `eslint` rule and has the same options.

✅ means the [`recommended`](#predefined-configurations) config from `@babel/eslint-plugin` enables this rule.

🔧 means it's autofixable with `--fix`.


| Name | Description | R | F |
| --- | --- | --- | --- |
| new-cap | handles decorators (`@Decorator`) | | |
| no-empty | handles `do` expressions | ✅  | 🔧 |
| no-undef | handles class accessor properties (`class A { accessor x = 2 }`) | | |
| no-unused-expressions | handles `do` expressions | | |


### Configure Rules

Load the plugin in your ESLint config and enable all the rules you would like to use (remember to disable the built-in ones as well!).

```js title="eslint.config.js"
import js from "@eslint/js";
import babelParser from "@babel/eslint-parser";
import babelPlugin from "@babel/eslint-plugin";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.js", "**/*.cjs", "**/*.mjs"],
    languageOptions: {
      parser: babelParser,
    },
    plugins: {
      js,
      babel: babelPlugin
    },
    extends: ["js/recommended"],
    rules: {
      // Disable built-in rules in @eslint/js
      "new-cap": "off",
      "no-empty": "off",
      "no-undef": "off",
      "no-unused-expressions": "off",

      // Enable Babel rules
      "babel/new-cap": "error",
      "babel/no-empty": "error",
      "babel/no-undef": "error",
      "babel/no-unused-expressions": "error",
    }
  },
]);
```

## TypeScript

While [`@babel/eslint-parser`](https://github.com/babel/babel/tree/main/eslint/babel-eslint-parser) can parse TypeScript, we don't currently support linting TypeScript using the rules in [`@babel/eslint-plugin`](https://github.com/babel/babel/tree/main/eslint/babel-eslint-plugin). This is because the TypeScript community has centered around [`@typescript-eslint`](https://github.com/typescript-eslint/typescript-eslint) and we want to avoid duplicate work. Additionally, since [`@typescript-eslint`](https://github.com/typescript-eslint/typescript-eslint) uses TypeScript under the hood, its rules can be made type-aware, which is something Babel doesn't have the ability to do.
