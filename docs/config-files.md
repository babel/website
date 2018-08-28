---
title: Config Files
id: config-files
---

## Configuration File Types

Babel has two parallel config file formats, which can be used together, or independently.

* Project-wide configuration
* File-relative configuration
  * `.babelrc` (and `.babelrc.js`) files
  * `package.json` files with a `"babel"` key


## Project-wide configuration

New in Babel 7.x, Babel has as concept of a ["root"](options.md#root) directory, which defaults
to the current working directory. For project-wide configuration, Babel will automatically search
for a `"babel.config.js"` in this root directory. Alternatively, users can use an explicit
["configFile"](options.md#configFile) value to override the default config file search behavior.

Because project-wide config files are separated from the physical location of the config
file, they can be ideal for configuration that must apply broadly, even allowing
plugins and presets to easily apply to files in `node_modules` or in symlinked packages,
which were traditionally quite painful to configure in Babel 6.x.

The primary downside of this project-wide config is that, because it relies on the working
directory, it can be more painful to use in monorepos if the working directory is not the monorepo root.
For example, if you have

```text
babel.config.js
packages/
  mod1/
    package.json
    src/index.js
  mod2/
    package.json
    src/index.js
```
and the individual packages are responsible for running their builds (and their working
directory for Babel is the individual packages), the `babel.config.js` file will not be automatically
loaded, and users will be required to set the path to it manually.

Project-wide configs can also be disabled by setting ["configFile"](options.md#configFile) to `false`.

## File-relative configuration

Babel loads `.babelrc` (and `.babelrc.js` / `package.json#babel`) files by searching up the
directory structure starting from the ["filename"](options.md#filename) being compiled. This can
be powerful because it allows you to create independent configurations for subsections of
a repository. File-relative configurations are also [merged](options.md#merging) over top of
project-wide config values, making them potentially useful for specific overrides, though that can
also be accomplished through ["overrides"](options.md#overrides).

There are a few edge cases to consider when using a file-relative config:
* Searching will stop once a directory containing a `package.json` is found, so a relative config
  only applies within a single package.
* The ["filename"](options.md#filename) being compiled must be inside of
  ["babelrcRoots"](options.md#babelrcRoots) packages, or else searching will be skipped entirely.

File-relative configs can also be disable by setting ["babelrc"](options.md#babelrc) to `false`.

### 6.x vs 7.x `.babelrc` loading

Users coming from Babel 6.x will likely trip up on these two edge cases, which are new in Babel 7.x.
These two restrictions were added to address common footguns in Babel 6.x:

* `.babelrc` files applied to `node_modules` dependencies, often unexpectedly.
* `.babelrc` files _failed_ to apply to symlinked `node_modules` when people expected them to behave like normal dependencies.
* `.babelrc` files _in_ `node_modules` dependencies would be detected, even though the plugins and
  presets inside they were generally not installed, and may not even be valid in the version of
  Babel compiling the file.

These cases will _primarily_ cause issues for users with a monorepo structure, because if you
have
```text
.babelrc
packages/
  mod1/
    package.json
    src/index.js
  mod2/
    package.json
    src/index.js
```
the config will now be entirely ignored, because it is across a package boundary.

One alternative would be to create a `.babelrc` in each sub-package that uses ["extends"](options.md#extends) as
```json
{ "extends": "../../.babelrc" }
```
Unfortunately, this approach can be a bit repetitive, and depending on how Babel is being used,
could require setting ["babelrcRoots"](options.md#babelrcRoots).

Given that, it may be more desirable to rename the `.babelrc` to be a
[project-wide "babel.config.js"](#project-wide-configuration). As mentioned in the project-wide
section above, this may then require explicitly setting ["configFile"](options.md#configFile)
since Babel will not find the config file if the working directory isn't correct.


## Config Format

The format of individual config files themselves separates into JS files vs [JSON5](https://json5.org/) files.

### JSON5

Any file that isn't a `.js` file will be parsed as JSON5 and should contain an object matching
the [options](options.md) format that Babel accepts.

### JavaScript

Any `.js` file will be `require()`ed and should export either a configuration object, or a function
that will return a configuration object when called. The main benefit being that users can include
JS logic to build up their config structures, potentially allowing config logic to be shared
more easily. `.js` files can be used as [project-wide configuration](#project-wide-configuration) or
via `.babelrc.js` files for [file-relative configuration](#file-relative-configuration).

Function-returning configs are given a few special powers because they can access an API exposed
by Babel itself. See [Config Function API](#config-function-api) for more information.

## Config Function API

JS config files may export a function that will be passed config function API:

```js
module.exports = function(api) {
  return {};
}
```

The `api` object exposes everthing Babel itself exposes from its index module, along with
config-file specific APIs:

### `api.version`

Type: `string`<br />

The version string for the Babel version that is loading the config file.

### `api.cache`

JS configs are great because they can compute a config on the fly, but the downside
there is that it makes caching harder. Babel wants to avoid re-executing the
config function every time a file is compiled, because then it would also need to
re-execute any plugin and preset functions referenced in that config.

The avoid this, Babel expects users of config functions to tell it how to manage
caching within a config file.

* `api.cache.forever()` - Permacache the computed config and never call the function again.
* `api.cache.never()` - Do not cache this config, and re-execute the function every time.
* `api.cache.using(() => process.env.NODE_ENV)` - Cache based on the value of `NODE_ENV`.
  Any time the `using` callback returns a value other than the one that was expected, the overall
  config function will be called again and a new entry will be added to the cache.
* `api.cache.invalidate(() => process.env.NODE_ENV)` - Cache based on the value of `NODE_ENV`.
  Any time the `using` callback returns a value other than the one that was expected, the overall
  config function will be called again and all entries in the cache will be replaced with the result.

Since the actual callback result is used to check if the cache entry is valid, it is recommended
that:

* Callbacks should be small and side-effect free.
* Callbacks should return values with the smallest range possible. For example, the
  `.using(() => process.env.NODE_ENV)` usage above is not idea because it would create an unknown
  number of cache entries depending on how many values of `NODE_ENV` are detected. It would be
  safer to do `.using(() => process.env.NODE_ENV === "development")` because then the cache entry
  can only ever be `true` or `false`.


### `api.env(...)`

Since `NODE_ENV` is a fairly common way to toggle behavior, Babel also includes an API function
meant specifically for that. This API is used as a quick way to check the
["envName"](options.md#envName) that Babel was loaded with, which takes `NODE_ENV` into account
if no other overriding environment is set.

It has a few different forms:

* `api.env("production")` returns `true` if `envName === "production"`.
* `api.env(["development", "test"])` returns `true` if `["development", "test"].includes(envName)`.
* `api.env()` returns the current `envName` string.
* `api.env(envName => envName.startsWith("test-"))` returns `true` if the env starts with "test-".

This function internally makes use of `api.cache` mentioned below to ensure that
Babel is aware that this build depends on a specific `envName`.


### `api.caller(cb)`

This API is used as a way to access the `caller` data that has been passed to Babel.
Since many instances of Babel may be running in the same process with different `caller`
values, this API is designed to automatically configure `api.cache`, the same way `api.env()` does.

The `caller` value is available as the first parameter of the callback function. It is best used
with something like
```js
function isBabelRegister(caller) {
  return !!(caller && caller.name === "@babel/register");
}

module.exports = function(api) {
  const isRegister = api.caller(isBabelRegister);

  return {
    // ...
  };
}
```
to toggle configuration behavior based on a specific environment.


### `api.assertVersion(range)`

While `api.version` can be useful in general, it's sometimes nice to just declare your version.
This API exposes a simple way to do that with:
```js
module.exports = function(api) {
  api.assertVersion("^7.2");

  return {
    // ...
  };
};
```


