---
layout: docs
title: API
description: How to use the Node.js API.
permalink: /docs/usage/api/
package: babel-core
---

[API : How to use the Node.js API.](https://babeljs.io/docs/usage/api/)  

[Options : Options for babel transpiling.](http://babeljs.io/docs/usage/options/)  

[AST : ?](https://astexplorer.net/)  

[ES2015 preset : All you need to compile ES2015 to ES5](https://babeljs.io/docs/plugins/preset-es2015/)  

[npm : babel-preset-es2015 ](https://www.npmjs.com/package/babel-preset-es2015)

## babel.transform(code, [options])

```js
var babel = require("babel-core");

// babel.transform("code();", options);
// => { code, map, ast }

var result = babel.transform("code();", options);

result.code;
result.map;
result.ast;

``` 

## babel.transformFile(filename, [options], callback)

```js
var babel = require("babel-core");

// babel.transformFile(filename, [options], callback)
// // => { code, map, ast }

babel.transformFile("filename.js", options, function (err, result) {
    result;
});

``` 

## babel.transformFileSync(filename, [options])

```js
var babel = require("babel-core");

// babel.transformFileSync(filename, [options]) 
// => { code, map, ast }

babel.transformFileSync("filename.js", options).code;

```

# babel.transformFromAst(ast, [code], [options])

```js
var babel = require("babel-core");

// babel.transformFromAst(ast, [code], [options])
// ?

const code = "if (true) return;";

const ast = babylon.parse(code, { allowReturnOutsideFunction: true });

const { code, map, ast } = babel.transformFromAst(ast, code, options);

```

