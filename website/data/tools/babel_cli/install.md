While you _can_ install Babel CLI globally on your machine, it's much better
to install it **locally** project by project.

There are two primary reasons for this.

1. Different projects on the same machine can depend on different versions of
     Babel allowing you to update one at a time.
2. It means you do not have an implicit dependency on the environment you are
     working in. Making your project far more portable and easier to setup.

We can install Babel CLI locally by running:

```sh
npm install --save-dev @babel/core @babel/cli
```

<blockquote class="babel-callout babel-callout-info">
  <p>
    <strong>Note:</strong> If you do not have a <code>package.json</code>,
    create one before installing. This will ensure proper interaction with the
    <code>npx</code> command.
  </p>
</blockquote>

After that finishes installing, your `package.json` file should include:

```diff
{
  "devDependencies": {
+   "@babel/cli": "^7.0.0",
+   "@babel/core": "^7.0.0"
  }
}
```
