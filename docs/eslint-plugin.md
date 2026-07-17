---
id: babel-eslint-plugin
title: "@babel/eslint-plugin"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Companion rules for [`@babel/eslint-parser`](./eslint-parser.md). `@babel/eslint-parser` does a great job at adapting `eslint`
for use with Babel, but it can't change the built-in rules to support experimental features.
`@babel/eslint-plugin` re-implements problematic rules so they do not give false positives or negatives.

> Requires Node.js 10.13 or greater

## Install

```shell npm2yarn
npm install @babel/eslint-plugin --save-dev
```

Load the plugin in your ESLint config and enable all the rules you would like to use (remember to disable the original ones as well!).

```js title=eslint.config.js
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
      babel: babelPlugin
    },
    rules: {
      "new-cap": "off",
      "no-undef": "off",
      "no-unused-expressions": "off",

      "babel/new-cap": "error",
      "babel/no-undef": "error",
      "babel/no-unused-expressions": "error",
    }
  },
]);
```



## Rules

Each rule corresponds to a core `eslint` rule and has the same options.

🛠: means it's autofixable with `--fix`.

- `@babel/new-cap`: handles decorators (`@Decorator`)
- `@babel/no-undef`: handles class accessor properties (`class A { accessor x = 2 }`)
- `@babel/no-unused-expressions`: handles `do` expressions



## TypeScript

While [`@babel/eslint-parser`](https://github.com/babel/babel/tree/main/eslint/babel-eslint-parser) can parse TypeScript, we don't currently support linting TypeScript using the rules in [`@babel/eslint-plugin`](https://github.com/babel/babel/tree/main/eslint/babel-eslint-plugin). This is because the TypeScript community has centered around [`@typescript-eslint`](https://github.com/typescript-eslint/typescript-eslint) and we want to avoid duplicate work. Additionally, since [`@typescript-eslint`](https://github.com/typescript-eslint/typescript-eslint) uses TypeScript under the hood, its rules can be made type-aware, which is something Babel doesn't have the ability to do.
