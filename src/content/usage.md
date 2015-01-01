## Using the CLI

> 6to5 comes with a built-in CLI which can be used to compile files from the command line.

### Install

Using [npm](https://www.npmjs.com/) you can install 6to5 globally, making it available from the
command line.

```sh
$ npm install --global 6to5
```

### Compile Files

Compile the file `script.js` and **output to stdout**.

```sh
$ 6to5 script.js
# output...
```

If you would like to **output to a file** you may use `--out-file` or `-o`.

```js
$ 6to5 script.js --out-file script-compiled.js
```

### Compile with Source Maps

If you would then like to add a **source map file** you can use `--source-maps` or `-s`. [Learn more about
source maps](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/).

```js
$ 6to5 script.js --out-file script-compiled.js --source-maps
```

If you would rather have **inline source maps**, you may use `--source-maps-inline` or `-t`.

```js
$ 6to5 script.js --out-file script-compiled.js --source-maps-inline
```

### Compile Directories

Compile the entire `src` directory and output it to the `lib` directory.

```sh
$ 6to5 src --out-dir lib
```

Compile the entire `src` directory and output it to the one concatenated file.

```sh
$ 6to5 src --out-file script-compiled.js
```

### Piping Files

Pipe a file in via stdin and output it to `script-compiled.js`

```
$ 6to5 --out-file script-compiled.js < script.js
```

### 6to5-node

6to5 comes with a second CLI which works exactly the same as Node.js's CLI, only it will compile
ES6 code before running it.

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

## Using in Node.js

>

### Require hook

All subsequent files required by node with the extensions `.es6` and `.js` will
be transformed by 6to5. The polyfill specified in [Polyfill](polyfill.md) is
also required.

```javascript
require("6to5/register");
```

**NOTE:** By default all requires to `node_modules` will be ignored. You can
override this by passing an ignore regex via:

```javascript
require("6to5/register")({
  // This will override `node_modules` ignoring - you can alternatively pass
  // a regex
  ignore: false
});
```

### Register Options

```javascript
require("6to5/register")({
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
  extensions: [".js", ".es6"]
});
```

## API


```javascript
var to5 = require("6to5");
```

### to5.transform(code, [[options](#transform-options)]);

```javascript
var result = to5.transform("code();", options);
result.code;
result.map;
result.ast;
```

### to5.transformFileSync(filename, [[options](#transform-options)])

```javascript
to5.transformFileSync("filename.js", options).code;
```

### to5.transformFile(filename, [[options](#transform-options)], callback)

```javascript
to5.transformFile("filename.js", options, function (err, result) {
  result.code;
});
```

### Transform Options

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



## Experimental

6to5 also has experimental support for ES7 proposals. You can enable this with
the `experimental: true` option when using the [Node API](#node) or
`--experimental` when using the [CLI](#cli).

**WARNING:** These proposals are subject to change so use with
**extreme caution**.

## Playground

