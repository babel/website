Create a new project configuration (i.e. config.js):

```sh
$jspm init
```

when asked which transpiler you would like to use:

> Which ES6 transpiler would you like to use, Traceur or Babel? [traceur]:

Type `babel` and press enter.

Note: **Transpiler**: Change this option at any time with `jspm dl-loader --babel`. Custom transpilation options can also be set through `babelOptions` in the jspm config file (i.e. config.js). 

The JSON below shows the default [Babel options](https://babeljs.io/docs/usage/options/) set in `config.js` when selecting Babel as the transpiler from the `$jspm init` command.

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




