---
id: version-7.1.0-babel-cli
title: @babel/cli
sidebar_label: cli
original_id: babel-cli
---

Babel comes with a built-in CLI which can be used to compile files from the command line.

In addition, various entry point scripts live in the top-level package at `@babel/cli/bin`. There is a shell-executable utility script, `babel-external-helpers.js`, and the main Babel cli script, `babel.js`.

## Install

While you _can_ install Babel CLI globally on your machine, it's much better
to install it **locally** project by project.

There are two primary reasons for this.

1. Different projects on the same machine can depend on different versions of
     Babel allowing you to update them individually.
2. Not having an implicit dependency on the environment you are working in
     makes your project far more portable and easier to setup.

We can install Babel CLI locally by running:

```sh
npm install --save-dev @babel/core @babel/cli
```

> **Note:** If you do not have a `package.json`, create one before installing. This will ensure proper interaction with the `npx` command.

After that finishes installing, your `package.json` file should include:

```diff
{
  "devDependencies": {
+   "@babel/cli": "^7.0.0",
+   "@babel/core": "^7.0.0"
  }
}
```

## Usage

```sh
babel script.js
```

> **Note:** These instructions use the excellent [npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) command to run the locally installed executables. You can drop it inside of an [npm run script](https://docs.npmjs.com/cli/run-script) or you may instead execute with the relative path instead. `./node_modules/.bin/babel`

### Compile Files

Compile the file `script.js` and **output to stdout**.

```sh
npx babel script.js
# output...
```

If you would like to **output to a file** you may use `--out-file` or `-o`.

```sh
npx babel script.js --out-file script-compiled.js
```

To compile a file **every time that you change it**, use the `--watch` or `-w` option:

```sh
npx babel script.js --watch --out-file script-compiled.js
```

### Compile with Source Maps

If you would then like to add a **source map file** you can use
`--source-maps` or `-s`. [Learn more about source maps](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/).

```sh
npx babel script.js --out-file script-compiled.js --source-maps
```

Or, if you'd rather have **inline source maps**, use `--source-maps inline` instead.

```sh
npx babel script.js --out-file script-compiled.js --source-maps inline
```

### Compile Directories

Compile the entire `src` directory and output it to the `lib` directory by using either `--out-dir` or `-d`. This doesn't overwrite any other files or directories in `lib`.

```sh
npx babel src --out-dir lib
```

Compile the entire `src` directory and output it as a single concatenated file.

```sh
npx babel src --out-file script-compiled.js
```

### Ignore files

Ignore spec and test files

```sh
npx babel src --out-dir lib --ignore "src/**/*.spec.js","src/**/*.test.js"
```

### Copy files

Copy files that will not be compiled

```sh
npx babel src --out-dir lib --copy-files
```

### Piping Files

Pipe a file in via stdin and output it to `script-compiled.js`

```sh
npx babel --out-file script-compiled.js < script.js
```

### Using Plugins

Use the `--plugins` option to specify plugins to use in compilation

```sh
npx babel script.js --out-file script-compiled.js --plugins=transform-runtime,transform-es2015-modules-amd
```

### Using Presets

Use the `--presets` option to specify plugins to use in compilation

```sh
npx babel script.js --out-file script-compiled.js --presets=es2015,react
```

### Ignoring .babelrc

Ignore the configuration from the project's `.babelrc` file and use the cli options e.g. for a custom build

```sh
npx babel --no-babelrc script.js --out-file script-compiled.js --presets=es2015,react
```

### Advanced Usage

There are many more options available, see [options](options.md), `babel --help` and other sections for more information.
