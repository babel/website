Globally install the jspm CLI:

```sh
$ npm install jspm/jspm-cli -g
```

Create a folder, then lock down jspm for the project

```sh
$ cd my-project
$ npm install jspm --save-dev
```

> It is advisable to locally install to lock the version of jspm. This will ensure upgrades to the global jspm will not alter the behavior of your application. Use `jspm -v` to confirm the local version.
