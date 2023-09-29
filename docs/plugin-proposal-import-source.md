---
id: babel-plugin-proposal-import-wasm-source
title: "@babel/plugin-proposal-import-wasm-source"
sidebar_label: import-wasm-source
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Transforms `import source` declarations to `WebAssembly.Module` objects, assuming that `import source` is being used to import the source of a WebAssembly Module.

The transformation applied by this plugin depends on your top-level [`targets`](https://babeljs.io/docs/options#targets) to detect whether the generated code should be compatible with Node.js, browsers, or both. When targeting Node.js, the generated code will also change depending on whether you are compiling modules to CommonJS or not.

:::caution
This plugin cannot be used when compiling modules to AMD, SystemJS, or UMD.
:::

## Example
```js title="input.js"
import source libMod from "./lib.wasm";
```

will be transformed to

<Tabs>
  <TabItem value="browsers" label="Browsers" default>

  ```js title="output.js"
  const libMod = await WebAssembly.compileStreaming(fetch(import.meta.resolve("./lib.wasm")));
  ```
  </TabItem>
  <TabItem value="node-esm" label="Node.js (ESM)">

  ```js title="output.js"
  import { readFileSync as _readFileSync } from "fs";
  const libMod = new WebAssembly.Module(_readFileSync(new URL(import.meta.resolve("./lib.wasm"))));
  ```
  </TabItem>
  <TabItem value="node-cjs" label="Node.js (CommonJS)">

  ```js title="output.js"
  "use strict";

  const libMod = new WebAssembly.Module(require("fs").readFileSync(require.resolve("./lib.wasm")));
  ```
  </TabItem>
</Tabs>

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-proposal-import-wasm-source
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": [
    "@babel/plugin-proposal-import-wasm-source"
  ]
}
```

### Via CLI

```sh title="Shell"
babel --plugins=@babel/plugin-proposal-import-wasm-source script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: [
    "@babel/plugin-proposal-import-wasm-source"
  ],
});
```

## References

- [Proposal: Source Phase Imports](https://github.com/tc39/proposal-source-phase-imports/)
