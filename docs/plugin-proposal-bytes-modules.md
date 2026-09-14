---
id: babel-plugin-proposal-bytes-modules
title: "@babel/plugin-proposal-bytes-modules"
sidebar_label: bytes-modules
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Transforms `import ... with { type: "bytes" }` declarations to platform-specific API to read the imported file as an immutable `Uint8Array`.

:::caution

On platforms without support for [immutable ArrayBuffers](https://github.com/tc39/proposal-immutable-arraybuffer), Babel will return a `Uint8Array` backed by a mutable `ArrayBuffer`.

:::

The transformation applied by this plugin depends on your top-level [`targets`](./options.md#targets) to detect whether the generated code should be compatible with Node.js, browsers, or both. When targeting Node.js, the generated code will also change depending on whether you are compiling modules to CommonJS or not.

:::caution
This plugin cannot be used when compiling modules to AMD, SystemJS, or UMD.
:::

:::caution
This plugin only transforms import declarations and not dynamic `import()` calls.
:::

## Example

```js title="input.js"
import bytes from "./image.png" with { type: "bytes" };
```

will be transformed to

<Tabs>
  <TabItem value="browsers" label="Browsers" default>

  ```js title="output.js"
  const bytes = await fetch(import.meta.resolve("./image.png"))
    .then(r => r.bytes())
    .then(_immutableUint8Array);
  ```
  </TabItem>
  <TabItem value="node-esm" label="Node.js (ESM)">

  ```js title="output.mjs"
  import { readFileSync as _readFileSync } from "fs";
  const bytes = _immutableUint8Array(_readFileSync(new URL(import.meta.resolve("./image.png"))));
  ```
  </TabItem>
  <TabItem value="node-cjs" label="Node.js (CommonJS)">

  ```js title="output.cjs"
  "use strict";

  const bytes = _immutableUint8Array(require("fs").readFileSync(require.resolve("./image.png")));
  ```
  </TabItem>
  <TabItem value="browsers-node-esm" label="Browsers and Node.js (ESM)">

  ```js title="output.js"
  const bytes = await (
    typeof process === "object" && process.versions?.node
      ? import("fs").then(fs => fs.promises.readFile(new URL(import.meta.resolve("./image.png")))).then(_immutableUint8Array)
      : fetch(import.meta.resolve("./image.png")).then(r => r.bytes()).then(_immutableUint8Array)
  );
  ```
  </TabItem>
</Tabs>

Namespace imports are also supported, and are compiled to an object with a single `default` property:

```js title="input.js"
import * as ns from "./image.png" with { type: "bytes" };
```

Named imports are not valid for bytes modules, and will cause a compilation error.

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-proposal-bytes-modules
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-proposal-bytes-modules"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins=@babel/plugin-proposal-bytes-modules script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-proposal-bytes-modules"],
});
```

## References

- [Proposal: Import Bytes](https://github.com/tc39/proposal-import-bytes/)
- [Proposal: Immutable ArrayBuffer](https://github.com/tc39/proposal-immutable-arraybuffer/)
