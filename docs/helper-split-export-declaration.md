---
id: babel-helper-split-export-declaration
title: "@babel/helper-split-export-declaration"
sidebar_label: helper-split-export-declaration
---

```js title="JavaScript"
declare export default splitExportDeclaration(path: NodePath);
```

## Usage

```js title="JavaScript"
import traverse from "@babel/traverse";
import splitExportDeclaration from "@babel/helper-split-export-declaration";

// ...

traverse(file, {
  ExportDefaultDeclaration(path) {
    if (!path.get("declaration").isClassDeclaration()) return;
    splitExportDeclaration(path);
  },
});
```

