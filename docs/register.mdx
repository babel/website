---
id: babel-register
title: "@babel/register"
---

One of the ways you can use Babel is through the require hook. The require hook
will bind itself to node's `require` and automatically compile files on the
fly. This is equivalent to CoffeeScript's
[coffee-script/register](http://coffeescript.org/v2/annotated-source/register.html).

## Install

```shell npm2yarn
npm install @babel/core @babel/register --save-dev
```

## Usage

```js title="JavaScript"
require("@babel/register");
```

All subsequent files required by node with the extensions `.es6`, `.es`, `.jsx`,
`.mjs`, and `.js` will be transformed by Babel.

:::info Polyfill not included
You must include the [polyfill](./polyfill.md) separately
when using features that require it, like generators.
:::

### Ignores `node_modules` by default

**NOTE:** By default all requires to `node_modules` will be ignored. You can
override this by passing an ignore regex via:

```js title="JavaScript"
require("@babel/register")({
  // This will override `node_modules` ignoring - you can alternatively pass
  // an array of strings to be explicitly matched or a regex / glob
  ignore: [],
});
```

## Specifying options

```js title="JavaScript"
require("@babel/register")({
  // Array of ignore conditions, either a regex or a function. (Optional)
  // File paths that match any condition are not compiled.
  ignore: [
    // When a file path matches this regex then it is **not** compiled
    /regex/,

    // The file's path is also passed to any ignore functions. It will
    // **not** be compiled if `true` is returned.
    function(filepath) {
      return filepath !== "/path/to/es6-file.js";
    },
  ],

  // Array of accept conditions, either a regex or a function. (Optional)
  // File paths that match all conditions are compiled.
  only: [
    // File paths that **don't** match this regex are not compiled
    /my_es6_folder/,

    // File paths that **do not** return true are not compiled
    function(filepath) {
      return filepath === "/path/to/es6-file.js";
    },
  ],

  // Setting this will remove the currently hooked extensions of `.es6`, `.es`, `.jsx`, `.mjs`
  // and .js so you'll have to add them back if you want them to be used again.
  extensions: [".es6", ".es", ".jsx", ".js", ".mjs"],

  // Setting this to false will disable the cache.
  cache: true,
});
```

You can pass in all other [options](options.md) as well, including `plugins` and `presets`.
Note that [config files](config-files.md) will also be loaded and the programmatic
config will be merged over top of the file config options. `@babel/register` does not support
`ignore` and `only` in config files.

## Environment variables

By default `@babel/node` cli and `@babel/register` will save to a json cache in your
temporary directory.

This will heavily improve with the startup and compilation of your files. There
are however scenarios where you want to change this behaviour and there are
environment variables exposed to allow you to do this.

### BABEL_CACHE_PATH

Specify a different cache location.

```sh title="Shell"
BABEL_CACHE_PATH=/foo/my-cache.json babel-node script.js
```

### BABEL_DISABLE_CACHE

Disable the cache.

```sh title="Shell"
BABEL_DISABLE_CACHE=1 babel-node script.js
```

## Compiling plugins and presets on the fly

`@babel/register` uses Node's `require()` hook system to compile files
on the fly when they are loaded. While this is quite helpful overall, it means
that there can be confusing cases where code within a `require()` hook causes
_more_ calls to `require`, causing a dependency cycle. In Babel's case for
instance, this could mean that in the process of Babel trying to compile a
user's file, Babel could end up trying to compile itself _as it is loading_.

To avoid this problem, this module explicitly disallows re-entrant compilation,
e.g. Babel's own compilation logic explicitly cannot trigger further compilation
of any other files on the fly. The downside of this is that if you want to
define a plugin or preset that is itself live-compiled, the process is
complicated.

The crux of it is that your own code needs to load the plugin/preset first.
Assuming the plugin/preset loads all of its dependencies up front, what you'll
want to do is:

```
require("@babel/register")({
  // ...
});

require("./my-plugin");
```

Because it is your own code that triggered the load, and not the logic within
`@babel/register` itself, this should successfully compile any plugin/preset
that loads synchronously.

## Experimental Babel 8 implementation

You can also test the new experimental implementation that will be enabled by default in Babel 8, using
```js title="JavaScript"
require("@babel/register/experimental-worker");
```

It internally runs Babel asynchronously, so it's compatible with [`.mjs` configuration files](config-files.md#configuration-file-types). You can already use it as a replacement of `@babel/register` with a few caveats:
- If you programmatically specify `@babel/register` options (using `require("@babel/register")({ /* ... options */ })`), you must make sure that they are serializable. This means that you cannot pass plugin functions defined inline, but you must move them to a separate `./my-plugin.js` file or to a `babel.config.js` file.
- The new implementation is still experimental: it _should_ have the same features as the existing one, but there may be some new bugs and regressions.

**Note:** `@babel/register` does _not_ support compiling native Node.js ES modules on the fly, since currently there is no stable API for intercepting ES modules loading.
