---
layout: docs
title: Usage
description: All of the built-in ways to use 6to5.
permalink: /docs/usage/
---

##  CLI

> 6to5 comes with a built-in CLI which can be used to compile files from the command line.

#### Install

Using [npm](https://www.npmjs.com/) you can install 6to5 globally, making it
available from the command line.

```sh
$ npm install --global 6to5
```

### 6to5

#### Compile Files

Compile the file `script.js` and **output to stdout**.

```sh
$ 6to5 script.js
# output...
```

If you would like to **output to a file** you may use `--out-file` or `-o`.

```js
$ 6to5 script.js --out-file script-compiled.js
```

#### Compile with Source Maps

If you would then like to add a **source map file** you can use
`--source-maps` or `-s`. [Learn more about source maps](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/).

```js
$ 6to5 script.js --out-file script-compiled.js --source-maps
```

If you would rather have **inline source maps**, you may use
`--source-maps-inline` or `-t`.

```js
$ 6to5 script.js --out-file script-compiled.js --source-maps-inline
```

#### Compile Directories

Compile the entire `src` directory and output it to the `lib` directory.

```sh
$ 6to5 src --out-dir lib
```

Compile the entire `src` directory and output it to the one concatenated file.

```sh
$ 6to5 src --out-file script-compiled.js
```

#### Piping Files

Pipe a file in via stdin and output it to `script-compiled.js`

```
$ 6to5 --out-file script-compiled.js < script.js
```

### 6to5-node

6to5 comes with a second CLI which works exactly the same as Node.js's CLI, only
it will compile ES6 code before running it.

Launch a REPL (Read-Eval-Print-Loop).

```sh
$ 6to5-node
```

Evaluate code.

```sh
$ 6to5-node -e "class Test { }"
```

Compile and run `test.js`.

```sh
$ 6to5-node test
```

## Require Hook

All subsequent files required by node with the extensions `.es6` and `.js` will
be transformed by 6to5. The polyfill specified in Polyfill is also required.

#### Install

```sh
$ npm install 6to5
```

#### Usage

```js
require('6to5/register');
```

**NOTE:** By default all requires to node_modules will be ignored. You can
override this by passing an ignore regex via:

```js
require('6to5/register')({
  // This will override `node_modules` ignoring - you can alternatively pass
  // a regex
  ignore: false
});
```

#### Register Options

```javascript
require('6to5/register')({
  // Optional ignore regex - if any filenames **do** match this regex then they
  // aren't compiled
  ignore: /regex/,

  // Optional only regex - if any filenames **don't** match this regex then they
  // aren't compiled
  only: /my_es6_folder/,

  // See options above for usage
  whitelist: [],
  blacklist: [],

  // This will remove the currently hooked extensions of .es6 and .js so you'll
  // have to add them back if you want them to be used again.
  extensions: ['.js', '.es6']
});
```

## API

```javascript
var to5 = require('6to5');
```

### `to5.transform(code, [options])`

Transforms the passed in `code`.

**Example**

```js
var result = to5.transform('code();', options);
result.code;
result.map;
result.ast;
```

### `to5.transformFile(filename, [options], callback)`

Asynchronously transforms the entire contents of a file.

**Example**

```js
to5.transformFile('filename.js', options, function (err, result) {
  result.code;
});
```

### `to5.transformFileSync(filename, [options])`

Synchronous version of `to5.transformFile`. Returns the transformed contents of
the `filename`.

**Example**

```js
to5.transformFileSync('filename.js', options).code;
```

## Options

| Option | Default | Description |
| ------ | ------- | ----------- |
| `filename` | `"unknown"` | Filename for use in errors etc. |
| `fileNameRelative` | `(filename)` | Filename relative to `sourceRoot`. |
| `blacklist` | `[]` | Array of transformers to **exclude**. Run `6to5 --help` to see a full list of transformers. |
| `whitelist` | `[]` | Array of transformers to **only** use. Run `6to5 --help` to see a full list of transformers. |
| `modules` | `"common"` | Which module formatter to use. Run `6to5 --help` to see a full list of module formatters. |
| `sourceMap` | `false` | If truthy, adds a `map` property to returned output. If set to `"inline"`, a comment with a sourceMappingURL directive is added to the bottom of the returned code. |
| `sourceMapName` | `(filenameRelative)` | Set `file` on returned source map. |
| `sourceFileName` | `(filenameRelative)` | Set `sources[0]` on returned source map. |
| `sourceRoot` | `(moduleRoot)` | The root from which all sources are relative. |
| `moduleRoot` | `(sourceRoot)` | Optional prefix for the AMD module formatter that will be prepend to the filename on module definitions. |
| `amdModuleIds` | `false` | If truthy, insert an explicit id for each defined AMD module. By default, AMD modules are anonymous. |
| `runtime` | `false` | Optionally replace all 6to5 helper declarations with a referenece to this variable. If set to `true` then the default namespace is used `to5Runtime`. |
| `comments` | `true` | Output comments in generated output. |
| `experimental` | `false` | Enable support for experimental ES7 features. |

## Polyfill

> 6to5 includes a polyfill that includes a custom
> [regenerator runtime](https://github.com/facebook/regenerator/blob/master/runtime.js) and
> [core.js](https://github.com/zloirock/core-js).

This will emulate a full ES6 environment. This polyfill is automatically loaded
when using `6to5-node` and `6to5/register`.

#### Usage in Node/Browserify

You need to include the polyfill require at the top the **entry point** to
your application.

```js
require('6to5/polyfill');
```

Fortunately, this is automatically loaded when using:

```js
require('6to5/register');
```

#### Usage in Browser

Available from the `browser-polyfill.js` file within the 6to5 directory of an
npm release. This needs to be included **before** all your compiled 6to5 code.
You can either prepend it to your compiled code or include it in a `<script>`
before it.

**NOTE:** Do not `require` this via browserify etc, use `6to5/polyfill`.

<blockquote class="to5-callout to5-callout-warning">
  <h4>Polyfills are not perfect</h4>
  <p>
    Due to limitations in various ES5 environments not every polyfill will work
    in every environment.
  </p>
</blockquote>

<blockquote class="to5-callout to5-callout-warning">
  <h4>Certain polyfills not included</h4>
  <p>
    Certain polyfills are too large/complex for their implemented features to
    justify including them for all builds. You may have to include additional
    polyfills for a subset of ES6 features.
  </p>
</blockquote>

## Experimental

> 6to5 also has experimental support for ES7 proposals.

You can enable this with the `experimental: true` option when using the
[Node API](#node) or `--experimental` when using the [CLI](#cli).

<blockquote class="to5-callout to5-callout-danger">
  <h4>Subject to change</h4>
  <p>
    These proposals are subject to change so use with <strong>extreme
    caution</strong>. 6to5 may update without warning in order to track spec
    changes.
  </p>
</blockquote>

## Playground

> Playground is a proving ground for **possible** ES7 proposals.

<blockquote class="to5-callout to5-callout-danger">
  <h4>Unofficial</h4>
  <p>
    These features are in no way endorsed by Ecma International and are not a
    part of ES6. They might become a part of ECMAScript in the future.
  </p>
</blockquote>

#### Usage

```js
$ 6to5 --playground
```

```js
to5.transform('code', { playground: true });
```

<blockquote class="to5-callout to5-callout-info">
  <h4>Enables experimental</h4>
  <p>
    Enabling playground also enables experimental support.
  </p>
</blockquote>

### Memoization assignment operator

**Uses**

```js
var obj = {};
obj.x ?= 2;
obj.x; // 2

obj = { x: 1 };
obj.x ?= 2;
obj.x; // 1

obj = { x: undefined }
obj.x ?= 2;
obj.x; // undefined
```

**Example**

```js
var obj = {};
obj.x ?= 2;
```

is equivalent to:

```js
var obj = {};
if (!Object.prototype.hasOwnProperty.call(obj, 'x')) obj.x = 2;
```

### Method binding


```js
var fn = obj#method;
var fn = obj#method('foob');

['foo', 'bar'].map(#toUpperCase); // ['FOO', 'BAR']
[1.1234, 23.53245, 3].map(#toFixed(2)); // ['1.12', '23.53', '3.00']
```

is equivalent to:

```
var fn = obj.method.bind(obj);
var fn = obj.method.bind(obj, 'foob');

['foo', 'bar'].map(function (val) { return val.toUpperCase(); });
[1.1234, 23.53245, 3].map(function (val) { return val.toFixed(2); });
```

### Object getter memoization

```js
var foo = {
  memo bar() {
    return complex();
  }
};

class Foo {
  memo bar() {
    return complex();
  }
}
```

is equivalent to

```js
var foo = {
  get bar() {
    return Object.defineProperty(this, "bar", {
      value: complex(),
      enumerable: true,
      configurable: true,
      writable: true
    }).bar;
  }
};

class Foo {
  get bar() {
    return Object.defineProperty(this, "bar", {
      value: complex(),
      enumerable: true,
      configurable: true,
      writable: true
    }).bar;
  }
}
```

### This shorthand

```js
@foo
```

is equivalent to

```
this.foo
```
