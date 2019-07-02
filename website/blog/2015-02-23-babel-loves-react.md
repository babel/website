---
layout: post
title:  "Babel <3 React"
author: James Kyle
authorURL: https://twitter.com/thejameskyle
date:   2015-02-23 10:00:00
categories: announcements
share_text: "Babel <3 React"
---

One of the things that surprises people quite often is that Babel supports JSX
out of the box.

<!--truncate-->

Let me show you just how easy it is to switch:

> **Note:** There are _tons_ of ways to use Babel, I'll only list a few of them
> here. If you'd like to see a more complete list check out our
> [Using Babel](/docs/using-babel/) page.

**In the Browser** ([docs](/docs/usage/browser/))

Before:

```html
<script type='text/jsx'></script>
```

After:

```html
<script type='text/babel'></script>
```

**In Browserify** ([docs](/docs/using-babel/#browserify))

Before:

```sh
$ browserify -t reactify main.js
```

After:

```sh
$ browserify -t babelify main.js
```

**In Node** ([docs](/docs/usage/require/))

Before:

```js
require('node-jsx').install();
```

After:

```js
require('babel/register');
````

**In Webpack** ([docs](/docs/using-babel/#webpack))

Before:

```js
loaders: [
  { test: /\.js$/, exclude: /node_modules/, loader: 'jsx-loader'}
]
```

After:

```js
loaders: [
  { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
]
```

**In Gulp** ([docs](/docs/using-babel/#gulp))

Before:

```js
gulp.src('views/**/*.js')
    .pipe(jsx())
    .pipe(gulp.dest('dist'));
```

After:

```js
gulp.src('views/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'));
```

---

The list goes on, but you probably get how simple it is by now. If you didn't
see the tool you are looking for don't worry we have a full list of them on our
[Using Babel](/docs/using-babel/) page.

If you need more help getting setup be sure to read our [JSX](/docs/usage/jsx/)
docs or come ask other Babel users in our
[support chat](https://gitter.im/babel/babel).

<p class="text-right">— The Babel team</p>
