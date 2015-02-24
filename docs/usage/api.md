---
layout: docs
title: API
description: How to use the Node.js API.
permalink: /docs/usage/api/
---

```javascript
var babel = require("babel");
```

## babel.transform(code, [[options](/docs/usage/options)])

Transforms the passed in `code`. Returning an object with the generated code,
source map, and AST.

```js
babel.transform(code, [options]) // => { code, map, ast }
```

**Example**

```js
var result = babel.transform("code();", options);
result.code;
result.map;
result.ast;
```

## babel.transformFile(filename, [[options](/docs/usage/options)], callback)

Asynchronously transforms the entire contents of a file.

```js
babel.transformFile(filename, [options], callback)
```

**Example**

```js
babel.transformFile("filename.js", options, function (err, result) {
  result; // => { code, map, ast }
});
```

## babel.transformFileSync(filename, [[options](/docs/usage/options)])

Synchronous version of `babel.transformFile`. Returns the transformed contents of
the `filename`.

```js
babel.transformFileSync(filename, [options]) // => { code, map, ast }
```

**Example**

```js
babel.transformFileSync("filename.js", options).code;
```

## `require("babel-core")`

While the regular `babel` package includes the CLI, we also publish a
`babel-core` package that does not come with the CLI and has fewer dependencies
for API-only users. The API itself is identical to the `babel` package.
