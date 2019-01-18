---
id: babel-preset-env
title: @babel/preset-env
sidebar_label: env
---

`@babel/preset-env` 是一个智能的集合，可以让你在项目需要适配的环境（即`target`）中使用最新的javascript特性，而不需要为每一个新特性都配置一个单独的语法转化器（或者browser polyfills）,也就是你只需要支持你的项目需要适配哪些浏览器或者运行环境，而不用具体去管这些运行环境究竟实现了哪些新特性，没有实现哪些新特性。 

- [安装](#安装)
- [如何工作？](#如何工作？)
- [集成浏览器列表](#集成浏览器列表)
- [选项](#选项)

## 安装

[使用npm安装](https://www.npmjs.com):

```命令
npm install --save-dev @babel/preset-env
```

或者[使用yarn安装](https://yarnpkg.com):

```命令
yarn add @babel/preset-env --dev
```

## 如何工作？

`@babel/preset-env` 来源于一些很酷的开源项目如： [`browserslist`](https://github.com/browserslist/browserslist)、[`compat-table`](https://github.com/kangax/compat-table)、[`electron-to-chromium`](https://github.com/Kilian/electron-to-chromium)等.

我们利用这些开源项目维护我们所要支持的目标环境版本和javascript语法或浏览器特性之间的映射关系，以及这些语法和特性同Babel转化器插件和core-js polyfills之间的映射关系。

> 注意： `@babel/preset-env` 不支持 `stage-x` 插件.

`@babel/preset-env`支持指定[target参数](#targets)，在编译插件列表的时候会检查`target`的映射，同时会把这些映射发送给Babel。

## 集成浏览器列表

对于浏览器项目或者Electron项目，我们推荐使用[`.browserslistrc`](https://github.com/browserslist/browserslist) 文件来指定`target`。这类的配置文件还有 [autoprefixer](https://github.com/postcss/autoprefixer)、[stylelint](https://stylelint.io/)、[eslint-plugin-compat](https://github.com/amilajack/eslint-plugin-compat)等。

如果没有配置[targets](#targets)或者设置了[ignoreBrowserslistConfig选项](#ignorebrowserslistconfig)，即默认情况下`@babel/preset-env` 使用[browserslist配置](https://github.com/ai/browserslist#queries)。

举个例子，如果项目需要适配的是市场占有率大于0.25%的浏览器（不包括没有安全更新的浏览器，比如IE10和BlackBerry）:
那[配置参数如下：](options.md#presets)

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "entry"
      }
    ]
  ]
}
```

**browserslist**

```
> 0.25%
not dead
```

**或者在package.json中添加**

```
"browserslist": "> 0.25%, not dead"
```

## 选项

更多的参数信息见 [preset选项](presets.md#preset-options)。

### `targets`

类型：`string | Array<string> | { [string]: string }`
默认值：`{}`
含义：描述项目需要兼容的环境
值：
1. [浏览器兼容](https://github.com/ai/browserslist) 查询条件:

```json
{
  "targets": "> 0.25%, not dead"
}
```

2. 需要兼容的环境的最低版本：

```json
{
  "targets": {
    "chrome": "58",
    "ie": "11"
  }
}
```

这里的环境关键字有： `chrome`, `opera`, `edge`, `firefox`, `safari`, `ie`, `ios`, `android`, `node`, `electron`。

> _注_：如果不指定`targets`，`@babel/preset-env`会转化所有的ECMAScript 2015+的代码。

> 我们不建议按照下面的方式使用`preset-env`

```json
{
  "presets": ["@babel/preset-env"]
}
```

#### `targets.esmodules`

类型：`boolean`

含义：你可以也需要兼容支持ES Modules (https://www.ecma-international.org/ecma-262/6.0/#sec-modules)的浏览器。 当这个值设置为true的时候，browsers字段会被忽略。 你可以结合`<script type="module"></script>` 让用户获取更小尺寸的代码 (https://jakearchibald.com/2017/es-modules-in-browsers/#nomodule-for-backwards-compatibility).

> _注_: 当`targets.esmodules`为`true`的时候`targets.browsers`就会被忽略。

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "esmodules": true
        }
      }
    ]
  ]
}
```

#### `targets.node`

类型：`string | "current" | true`

如果你想在当前的node环境中进行编译，那么可以设置：`"node": true` 或`"node": "current"`或`"node": process.versions.node`.

#### `targets.safari`

类型：`string | "tp"`.

如果你想针对`Safari`的[technology preview](https://developer.apple.com/safari/technology-preview/) 版本进行编译，你可以设置：`"safari": "tp"`.

#### `targets.browsers`

类型：`string | Array<string>`

含义：浏览器查询条件 (例如: last 2 versions, > 5%, safari tp) ，详情见：[browserslist](https://github.com/ai/browserslist).

> _注：_ 这个值会被`targets`中的浏览器查询条件覆盖

> _注：_  在最新版本中会移除这个选项，直接使用`targets`来配置

### `spec`

类型：`boolean`
默认值：`false`
含义：当值为`true`的时候意味着preset中的所有插件会使用更符合规范的转化方式

### `loose`

类型：`boolean`
默认值：`false`

含义：为这个preset中的所有插件开启["loose" 选项](http://2ality.com/2015/12/babel6-loose-mode.html)。

### `modules`

可选值：`"amd" | "umd" | "systemjs" | "commonjs" | "cjs" | "auto" | false`
默认值：`"auto"`

支持将ES6 module转化为其他module类型。

值 `false` 意味着不会转化模块加载方式

`cjs`是`commonjs`的简写

### `debug`

类型：`boolean`
默认值：`false`

用`console.log`输出使用的targets和plugins以及pulgin的版本，版本值见：[插件版本](https://github.com/babel/babel/blob/master/packages/babel-preset-env/data/plugins.json

### `include`

类型：`Array<string|RegExp>`
默认值：`[]`
含义：指定始终会包括的插件

可选的值有：

- [Babel plugins](https://github.com/babel/babel/blob/master/packages/babel-preset-env/data/plugin-features.js) - 同时还有 (`@babel/plugin-transform-spread`) and 以及没有@babel前缀的 (`plugin-transform-spread`)

- [Built-ins](https://github.com/babel/babel/blob/master/packages/babel-preset-env/data/built-in-features.js)，例如 `es6.map`, `es6.set`, or `es6.object.assign`.

插件的名称可以使用全称、部分指定以及正则的形式，如：

- 全称示例：`"es6.math.sign"`
- 部分指定示例：`"es6.math.*"` （代表所有以`es6.math`开头的插件)
- 正则：`/^transform-.*$/` 或者 `new RegExp("^transform-modules-.*")`

_注：_ 部分指定中`.`和在正则中的用法一样是用来匹配任何字符而不是指实际的符号`'.'`。同样值得一提的是在正则中需要使用`.*`来匹配任何字符，而不是使用`glob`中的`*`。

当原生实现有bug的时候，或者支持的特性和不支持的特性需要组合使用的时候这个选项就可以派上用场了。举个例子来说，Node 4支持classes但是不支持spread. 如果在class中`super`方法中使用spread参数，那么就需要包含`@babel/plugin-transform-classes`，否则就不能编译带有spread参数的super方法。

> _注：_:  `include`和`exclude`选项的作用范围为[preset所包含的插件](https://github.com/babel/babel/blob/master/packages/babel-preset-env/data/plugin-features.js)，所以如果`include` `@babel/plugin-proposal-do-expressions` 或者`exclude` `@babel/plugin-proposal-function-bind` 会报错。 如果要使用preset中没有的插件，可以直接在 ["plugins"选项](options.md#plugins) 中配置。

### `exclude`

类型： `Array<string|RegExp>`
默认值： `[]`
含义：需要排除在外的插件列表

同`include`选项不同的是，`exclude` 用来添加转化器的黑名单， 例如如果你不使用generators，那么你就可以排除掉`@babel/plugin-transform-regenerator`和`regeneratorRuntime`(前提是配置：`useBuiltIns`)或者使用更快的插件如 [fast-async](https://github.com/MatAtBread/fast-async) 来取代 [Babel's async-to-gen](plugin-proposal-async-generator-functions.md)

### `useBuiltIns`

可选值：`"usage"` | `"entry"` | `false` 
默认值：`false`

> This option adds direct references to the `core-js` module as bare imports. Thus `core-js` will be resolved relative to the file itself and needs to be accessible. You may need to specify `core-js@2` as a top level dependency in your application if there isn't a `core-js` dependency or there are multiple versions.

这个选项定义了`@babel/preset-env`处理polyfills的方式

#### `useBuiltIns: 'entry'`

> NOTE: Only use `require("@babel/polyfill");` once in your whole app.
> Multiple imports or requires of `@babel/polyfill` will throw an error since it can cause global collisions and other issues that are hard to trace.
> We recommend creating a single entry file that only contains the `require` statement.

This option enables a new plugin that replaces the statement `import "@babel/polyfill"` or `require("@babel/polyfill")` with individual requires for `@babel/polyfill` based on environment.

```sh
npm install @babel/polyfill --save
```

**In**

```js
import "@babel/polyfill";
```

**Out (different based on environment)**

```js
import "core-js/modules/es7.string.pad-start";
import "core-js/modules/es7.string.pad-end";
```

This will also work for `core-js` directly (`import "core-js";` or `require('core-js');`)

#### `useBuiltIns: 'usage'` (experimental)

Adds specific imports for polyfills when they are used in each file. We take advantage of the fact that a bundler will load the same polyfill only once.

**In**

a.js

```js
var a = new Promise();
```

b.js

```js
var b = new Map();
```

**Out (if environment doesn't support it)**

```js
import "core-js/modules/es6.promise";
var a = new Promise();
```

```js
import "core-js/modules/es6.map";
var b = new Map();
```

**Out (if environment supports it)**

```js
var a = new Promise();
```

```js
var b = new Map();
```

#### `useBuiltIns: false`

Don't add polyfills automatically per file, or transform `import "@babel/polyfill"` to individual polyfills.

### `forceAllTransforms`

`boolean`, defaults to `false`.

<p><details>
  <summary><b>Example</b></summary>

With Babel 7's [Javascipt config file](config-files#javascript) support, you can force all transforms to be run if env is set to `production`.

```js
module.exports = function(api) {
  return {
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            chrome: 59,
            edge: 13,
            firefox: 50,
          },
          // for uglifyjs...
          forceAllTransforms: api.env("production"),
        },
      ],
    ],
  };
};
```

</details></p>

> NOTE: `targets.uglify` is deprecated and will be removed in the next major in
> favor of this.

By default, this preset will run all the transforms needed for the targeted
environment(s). Enable this option if you want to force running _all_
transforms, which is useful if the output will be run through UglifyJS or an
environment that only supports ES5.

> NOTE: Uglify has a work-in-progress "Harmony" branch to address the lack of
> ES6 support, but it is not yet stable. You can follow its progress in
> [UglifyJS2 issue #448](https://github.com/mishoo/UglifyJS2/issues/448). If you
> require an alternative minifier which _does_ support ES6 syntax, we recommend
> using [babel-minify](preset-minify.md).

### `configPath`

`string`, defaults to `process.cwd()`

The starting point where the config search for browserslist will start, and ascend to the system root until found.

### `ignoreBrowserslistConfig`

`boolean`, defaults to `false`

Toggles whether or not [browserslist config sources](https://github.com/ai/browserslist#queries) are used, which includes searching for any browserslist files or referencing the browserslist key inside package.json. This is useful for projects that use a browserslist config for files that won't be compiled with Babel.

### `shippedProposals`

`boolean`, defaults to `false`

Toggles enabling support for builtin/feature proposals that have shipped in browsers. If your target environments have native support for a feature proposal, its matching parser syntax plugin is enabled instead of performing any transform. Note that this _does not_ enable the same transformations as [`@babel/preset-stage-3`](preset-stage-3.md), since proposals can continue to change before landing in browsers.

The following are currently supported:

**Builtins**

- [es7.array.flat-map](https://github.com/tc39/proposal-flatMap)

**Features**

- None
