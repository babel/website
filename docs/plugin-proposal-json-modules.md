---
id: babel-plugin-proposal-json-modules
title: "@babel/plugin-proposal-json-modules"
sidebar_label: json-modules
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Transforms `import ... with { type: "json" }` declarations to platform-specific API to read and then `JSON.parse` the imported file.

The transformation applied by this plugin depends on your top-level [`targets`](https://babeljs.io/docs/options#targets) to detect whether the generated code should be compatible with Node.js, browsers, or both. When targeting Node.js, the generated code will also change depending on whether you are compiling modules to CommonJS or not.

:::caution
This plugin cannot be used when compiling modules to AMD, SystemJS, or UMD.
:::

:::caution
This plugin only transforms import decalarations and not dynamic `import()` calls.
:::

## Example
```js title="input.js"
import data from "./data.json" with { type: "json" };
```

will be transformed to

<Tabs>
  <TabItem value="browsers" label="Browsers" default>

  ```js title="output.js"
  const data = await fetch(import.meta.resolve("./data.json")).then(r => r.json());
  ```
  </TabItem>
  <TabItem value="node-esm" label="Node.js (ESM)">

  ```js title="output.mjs"
  import { readFileSync as _readFileSync } from "fs";
  const data = JSON.parse(_readFileSync(new URL(import.meta.resolve("./data.json"))));
  ```
  </TabItem>
  <TabItem value="node-cjs" label="Node.js (CommonJS)">

  ```js title="output.cjs"
  "use strict";

  const data = JSON.parse(require("fs").readFileSync(require.resolve("./data.json")));
  ```
  </TabItem>
  <TabItem value="browsers-node-cjs" label="Browsers and Node.js (ESM)">

  ```js title="output.js"
  const data = await (
    typeof process === "object" && process.versions?.node
      ? import("fs").then(fs => fs.promises.readFile(new URL(import.meta.resolve("./data.json")))).then(JSON.parse)
      : fetch(import.meta.resolve("./data.json")).then(r => r.json())
  );
  ```
  </TabItem>
</Tabs>

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-proposal-json-modules
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": [
    "@babel/plugin-proposal-json-modules"
  ]
}
```

### Via CLI

```sh title="Shell"
babel --plugins=@babel/plugin-proposal-json-modules script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: [
    "@babel/plugin-proposal-json-modules"
  ],
});
```

## References

- [Proposal: JSON Modules](https://github.com/tc39/proposal-json-modules/)
