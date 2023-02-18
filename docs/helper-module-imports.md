---
id: babel-helper-module-imports
title: "@babel/helper-module-imports"
sidebar_label: helper-module-imports
---

```shell npm2yarn
npm install @babel/helper-module-imports --save
```

## Usage

### `import "source"`

```js title="JavaScript"
import { addSideEffect } from "@babel/helper-module-imports";
addSideEffect(path, 'source');
```

### `import { named as _named } from "source"`

```js title="JavaScript"
import { addNamed } from "@babel/helper-module-imports";
// if the hintedName isn't set, the function will gennerate a uuid as hintedName itself such as '_named'
addNamed(path, 'named', 'source');
```

### `import { named as _hintedName } from "source"`

```js title="JavaScript"
import { addNamed } from "@babel/helper-module-imports";
addNamed(path, 'named', 'source', { nameHint: "hintedName" });
```

### `import _default from "source"`

```js title="JavaScript"
import { addDefault } from "@babel/helper-module-imports";
addDefault(path, 'source');
```

### `import _hintedName from "source"`

```js title="JavaScript"
import { addDefault } from "@babel/helper-module-imports";
// If 'hintedName' exists in scope, the name will be '_hintedName2', '_hintedName3', ...
addDefault(path, 'source', { nameHint: "hintedName" })
```

### `import * as _namespace from "source"`

```js title="JavaScript"
import { addNamespace } from "@babel/helper-module-imports";
addNamespace(path, 'source');
```

## Examples

### Adding a named import

```js title="JavaScript"
import { addNamed } from "@babel/helper-module-imports";

export default function({ types: t }) {
  return {
    visitor: {
      ReferencedIdentifier(path) {
        let importName = this.importName;
        if (importName) {
          importName = t.cloneDeep(importName);
        } else {
          // require('bluebird').coroutine
          importName = this.importName = addNamed(path, 'coroutine', 'bluebird');
        }

        path.replaceWith(importName);
      }
    },
  };
}
```

