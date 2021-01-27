---
id: babel-preset-minify
title: babel-preset-minify
sidebar_label: minify
---

+ [Install](#install)
+ [Usage](#usage)
+ [Options](#options)

## Install

```sh
npm install babel-preset-minify --save-dev
```

## Usage

### With a configuration file (Recommended)

```json
{
  "presets": ["minify"]
}
```

or pass in options -

```json
{
  "presets": [["minify", {
    "mangle": {
      "exclude": ["MyCustomError"]
    },
    "unsafe": {
      "typeConstructors": false
    },
    "keepFnName": true
  }]]
}
```

### Via CLI

```sh
babel script.js --presets minify
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  presets: ["minify"]
});
```

## Options

Two types of options:

1. 1-1 mapping with plugin
2. The same option passed to multiple plugins

#### 1-1 mapping with plugin

+ `false` - disable plugin
+ `true` - enable plugin
+ `{ ...pluginOpts }` - enable plugin and pass pluginOpts to plugin

OptionName          | Plugin                                                         | DefaultValue
----------          | ------                                                         | ------------
booleans            | [transform-minify-booleans][booleans]                          | true
builtIns            | [minify-builtins][builtIns]                                    | true
consecutiveAdds     | [transform-inline-consecutive-adds][consecutiveAdds]           | true
deadcode            | [minify-dead-code-elimination][deadcode]                       | true
evaluate            | [minify-constant-folding][evaluate]                            | true
flipComparisons     | [minify-flip-comparisons][flipComparisons]                     | true
guards              | [minify-guarded-expressions][guards]                           | true
infinity            | [minify-infinity][infinity]                                    | true
mangle              | [minify-mangle-names][mangle]                                  | true
memberExpressions   | [transform-member-expression-literals][memberExpressions]      | true
mergeVars           | [transform-merge-sibling-variables][mergeVars]                 | true
numericLiterals     | [minify-numeric-literals][numericLiterals]                     | true
propertyLiterals    | [transform-property-literals][propertyLiterals]                | true
regexpConstructors  | [transform-regexp-constructors][regexpConstructors]            | true
removeConsole       | [transform-remove-console][removeConsole]                      | false
removeDebugger      | [transform-remove-debugger][removeDebugger]                    | false
removeUndefined     | [transform-remove-undefined][removeUndefined]                  | true
replace             | [minify-replace][replace]                                      | true
simplify            | [minify-simplify][simplify]                                    | true
simplifyComparisons | [transform-simplify-comparison-operators][simplifyComparisons] | true
typeConstructors    | [minify-type-constructors][typeConstructors]                   | true
undefinedToVoid     | [transform-undefined-to-void][undefinedToVoid]                 | true

#### The same option passed to multiple plugins

+ When multiple plugins require the same option, it's easier to declare it in one place. These options are passed on to two or more plugins.

OptionName          | Plugins
----------          | -------
keepFnName          | Passed to [mangle][mangle] & [deadcode][deadcode]
keepClassName       | Passed to [mangle][mangle] & [deadcode][deadcode]
tdz                 | Passed to [builtIns][builtIns], [evaluate][evaluate], [deadcode][deadcode], [removeUndefined][removeUndefined]

**Examples**

```json
{
  "presets": [["minify", {
    "evaluate": false,
    "mangle": true
  }]]
}
```

```json
{
  "presets": [["minify", {
    "mangle": {
      "exclude": ["ParserError", "NetworkError"]
    }
  }]]
}
```

```json
{
  "presets": [["minify", {
    "keepFnName": true
  }]]
}
// is the same as
{
  "presets": [["minify", {
    "mangle": {
      "keepFnName": true
    },
    "deadcode": {
      "keepFnName": true
    }
  }]]
}
```

[booleans]: babel-plugin-transform-minify-booleans
[builtIns]: babel-plugin-minify-builtins
[consecutiveAdds]: babel-plugin-transform-inline-consecutive-adds
[deadcode]: babel-plugin-minify-dead-code-elimination
[evaluate]: babel-plugin-minify-constant-folding
[flipComparisons]: babel-plugin-minify-flip-comparisons
[guards]: babel-plugin-minify-guarded-expressions
[infinity]: babel-plugin-minify-infinity
[mangle]: babel-plugin-minify-mangle-names
[memberExpressions]: babel-plugin-transform-member-expression-literals
[mergeVars]: babel-plugin-transform-merge-sibling-variables
[numericLiterals]: babel-plugin-minify-numeric-literals
[propertyLiterals]: babel-plugin-transform-property-literals
[regexpConstructors]: babel-plugin-transform-regexp-constructors
[removeConsole]: babel-plugin-transform-remove-console
[removeDebugger]: babel-plugin-transform-remove-debugger
[removeUndefined]: babel-plugin-transform-remove-undefined
[replace]: babel-plugin-minify-replace
[simplify]: babel-plugin-minify-simplify
[simplifyComparisons]: babel-plugin-transform-simplify-comparison-operators
[typeConstructors]: babel-plugin-minify-type-constructors
[undefinedToVoid]: babel-plugin-transform-undefined-to-void

> You can read more about configuring preset options [here](https://babeljs.io/docs/en/presets#preset-options)
