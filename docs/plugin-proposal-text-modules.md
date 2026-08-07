---
id: babel-plugin-proposal-text-modules
title: "@babel/plugin-proposal-text-modules"
sidebar_label: text-modules
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Transforms `import ... with { type: "text" }` declarations to platform-specific API to read the imported file and decode it as UTF-8 text.

The transformation applied by this plugin depends on your top-level [`targets`](./options.md#targets) to detect whether the generated code should be compatible with Node.js, browsers, or both. When targeting Node.js, the generated code will also change depending on whether you are compiling modules to CommonJS or not.

:::caution
This plugin cannot be used when compiling modules to AMD, SystemJS, or UMD.
:::

:::caution
This plugin only transforms import declarations and not dynamic `import()` calls.
:::

## Example

```js title="input.js"
import banner from "./banner.txt" with { type: "text" };
```

will be transformed to

<Tabs>
  <TabItem value="browsers" label="Browsers" default>

  ```js title="output.js"
  const banner = await fetch(import.meta.resolve("./banner.txt")).then(r => r.text());
  ```
  </TabItem>
  <TabItem value="node-esm" label="Node.js (ESM)">

  ```js title="output.mjs"
  import { readFileSync as _readFileSync } from "fs";
  const banner = String(_readFileSync(new URL(import.meta.resolve("./banner.txt"))));
  ```
  </TabItem>
  <TabItem value="node-cjs" label="Node.js (CommonJS)">

  ```js title="output.cjs"
  "use strict";

  const banner = String(require("fs").readFileSync(require.resolve("./banner.txt")));
  ```
  </TabItem>
  <TabItem value="browsers-node-esm" label="Browsers and Node.js (ESM)">

  ```js title="output.js"
  const banner = await (
    typeof process === "object" && process.versions?.node
      ? import("fs").then(fs => fs.promises.readFile(new URL(import.meta.resolve("./banner.txt")))).then(String)
      : fetch(import.meta.resolve("./banner.txt")).then(r => r.text())
  );
  ```
  </TabItem>
</Tabs>

Namespace imports are also supported, and are compiled to an object with a single `default` property:

```js title="input.js"
import * as ns from "./banner.txt" with { type: "text" };
```

Named imports are not valid for text modules, and will cause a compilation error.

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-proposal-text-modules
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-proposal-text-modules"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins=@babel/plugin-proposal-text-modules script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-proposal-text-modules"],
});
```

## References

- [Proposal: Import Text](https://github.com/tc39/proposal-import-text/)
