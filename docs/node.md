---
id: babel-node
title: @babel/node
sidebar_label: node
---

babel-node is a CLI that works exactly the same as the Node.js CLI, with the added benefit of compiling with Babel presets and plugins before running it.

## Install

```sh
npm install --save-dev @babel/core @babel/node
```

> #### Not meant for production use
>
> You should not be using `babel-node` in production. It is unnecessarily heavy, with high memory usage due to the cache being stored in memory. You will also always experience a startup performance penalty as the entire app needs to be compiled on the fly.
>
> Check out the [example Node.js server with Babel](https://github.com/babel/example-node-server) for an idea of how to use Babel in a production deployment.

> #### ES6-style module-loading may not function as expected
>
> Due to technical limitations ES6-style module-loading is not fully supported in a `babel-node REPL`.

babel comes with a second CLI which works exactly the same as Node.js's CLI, only
it will compile ES6 code before running it.

Launch a REPL (Read-Eval-Print-Loop).

```sh
npx babel-node
```

Evaluate code.

```sh
npx babel-node -e "class Test { }"
```

Compile and run `test.js`.

```sh
npx babel-node test
```

> **Tip:** Use `rlwrap` to get a REPL with input history
>
> ```sh
> npx rlwrap babel-node
> ```
>
> On some platforms (like OSX), extra arguments may be required for `rlwrap` to function properly, eg:
>
> ```sh
> NODE_NO_READLINE=1 npx rlwrap --always-readline babel-node
> ```

### Usage

```sh
babel-node [options] [ -e script | script.js ] [arguments]
```

When arguments for user script have names conflicting with node options, double dash placed before script name can be used to resolve ambiguities

```sh
npx babel-node --debug --presets es2015 -- script.js --debug
```

### Options

| Option                 | Default                     | Description                                                                                                                                 |
| ---------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `-e, --eval [script]`  |                             | Evaluate script                                                                                                                             |
| `-p, --print`          |                             | Evaluate script and print result                                                                                                            |
| `-i, --ignore [regex]` | `node_modules`              | Ignore all files that match this regex when using the require hook                                                                          |
| `-x, --extensions`     | `".js",".jsx",".es6",".es"` | List of extensions to hook into                                                                                                             |
| `--presets`            | `[]`                        | Comma-separated list of [presets](presets.md) (a set of plugins) to load and use.                                                           |
| `--plugins`            | `[]`                        | Comma-separated list of [plugins](plugins.md) to load and use.                                                                              |
| `--config-file [path]` | `[]`                        | Path to the babel config file to use. Defaults to working directory babel.config.js                                                         |
| `--env-name [name]`    | `[]`                        | The name of the 'env' to use when loading configs and plugins. Defaults to the value of BABEL_ENV, or else NODE_ENV, or else 'development'. |

