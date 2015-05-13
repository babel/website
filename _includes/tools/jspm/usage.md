Create a new project configuration (i.e. config.js):

```sh
$ jspm init
```
when asked which transiler you would like to use:

> Which ES6 transpiler would you like to use, Traceur or Babel? [traceur]:

Type Babel and press enter.

Note: * **Transpiler**: Change this option at any time with `jspm dl-loader --babel`. Custom transpilation options can also be set through `babelOptions` or `traceurOptions` in the jspm config file (i.e. config.js). See below for details on using Babel options inconfig.js.

#### babelOptions
Type: `Object`
Default: `{}`

Set the Babel transpiler options.

```javascript
System.config({
    babelOptions: {
    }
});
```

A list of options is available in the [Babel project documentation](https://babeljs.io/docs/usage/options/). An example of what a config.js looks like by default is shown below.

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



