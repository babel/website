---
id: babel-helper-annotate-as-pure
title: "@babel/helper-annotate-as-pure"
sidebar_label: helper-annotate-as-pure
---

```js title="JavaScript"
declare export default annotateAsPure(nodeOrPath: Node | NodePath);
```

## Usage

```js title="JavaScript"
import traverse from "@babel/traverse";
import annotateAsPure from "@babel/helper-annotate-as-pure";

// ...

traverse(file, {
  CallExpression(path) {
    annotateAsPure(path);
  },
});
```

## Caveat with UglifyJS pre v3.1.0

`@babel/helper-annotate-as-pure` will append any existing leading comments to the `#__PURE__` annotation. Versions of UglifyJS prior to v3.1.0 will **ignore** these annotations, as they only check the _last_ leading comment for the annotation.

For example, using the `Usage` snippet above:

**In**

```js title="JavaScript"
const four = /* foo */ add(2, 2);
```

**Out**

```js title="JavaScript"
const four = /* #__PURE__ */ /* foo */ add(2, 2);
```

