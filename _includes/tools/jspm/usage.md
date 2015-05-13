Create a new project configuration (i.e. config.js):

```sh
$ jspm init
```
when asked which transiler you would like to use:

> Which ES6 transpiler would you like to use, Traceur or Babel? [traceur]:

Type Babel and press enter.

Note: * **Transpiler**: Change this option at any time with `jspm dl-loader --babel`. Custom transpilation options can also be set through `babelOptions` or `traceurOptions` in the jspm config file (i.e. config.js). See below for details on using [Babel options](https://babeljs.io/docs/usage/options/) options in config.js.

```
System.config({
  "baseURL": "/",
  "transpiler": "babel",
  "babelOptions": {
    "optional": [
      "runtime"
    ]
  }
});
```

The code above is an example of what the config.js looks like by default when selecting Babel as the transiler from the `$jspm init` command.




