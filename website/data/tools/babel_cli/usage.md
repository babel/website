Instead of running Babel directly from the command line we're going to put our
commands in **npm scripts** which will use our local version.

Simply add a `"scripts"` field to your `package.json` and put the babel command
inside there as `build`.

```diff
  {
    "name": "my-project",
    "version": "1.0.0",
+   "scripts": {
+     "build": "babel src -d lib"
+   },
    "devDependencies": {
      "@babel/cli": "^7.0.0"
    }
  }
```

Now from our terminal we can run:

```sh
npm run build
```

This will run Babel the same way as before and the output will be present in
`lib` directory, only now we are using a local copy.

Alternatively, you can reference the `babel` cli inside of `node_modules`.

```sh
./node_modules/.bin/babel src -d lib
```

<blockquote class="babel-callout babel-callout-info">
  <p>
    For full documentation on the Babel CLI see the
    <a href="/docs/usage/cli/">usage docs</a>.
  </p>
</blockquote>
