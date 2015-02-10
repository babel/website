---
layout: docs
title: Require Hook
description: How to use the require hook.
permalink: /docs/usage/require/
---

One of the ways you can use 6to5 is through the require hook. The require hook
will bind itself to node's `require` and automatically transpile files on the
fly. This is equivalent to CoffeeScript's
[coffee-script/register](http://coffeescript.org/documentation/docs/register.html).

<blockquote class="to5-callout to5-callout-warning">
  <h4>Not suitable for libraries</h4>
  <p>
    The require hook automatically hooks itself into <strong>all</strong> node requires. This will pollute the global scope and introduce conflicts. Because of this it's not suitable for libraries, if however you're writing an application then it's completely fine to use.
  </p>
</blockquote>

## Install

```sh
$ npm install 6to5
```

## Usage

```js
require("6to5/register");
```

All subsequent files required by node with the extensions `.es6`, `.es`, `.jsx`
and `.js` will be transformed by 6to5. The polyfill specified in
[/docs/usage/polyfill](/docs/usage/polyfill) is also automatically required.

**NOTE:** By default all requires to `node_modules` will be ignored. You can
override this by passing an ignore regex via:

```js
require("6to5/register")({
  // This will override `node_modules` ignoring - you can alternatively pass
  // a regex
  ignore: false
});
```

## Register Options

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

  // Setting this will remove the currently hooked extensions of .es6, `.es`, `.jsx`
  // and .js so you'll have to add them back if you want them to be used again.
  extensions: [".es6", ".es", ".jsx", ".js"]
});
```
