---
layout: post
title:  "Function Bind Syntax"
authors: james_kyle
date:   2015-05-14 19:30:00
categories: announcements
share_text: "New in Babel 5.4: Function Bind Syntax"
---

Babel 5.4 was just released and with it comes support for a new
[experimental ES7 syntax](https://github.com/zenparsing/es-function-bind)
proposed by Kevin Smith ([@zenparsing](https://github.com/zenparsing)) and
implemented in Babel by Ingvar Stepanyan
([@RReverser](https://github.com/RReverser)).

<!--truncate-->

> ***Warning: This syntax is highly experimental and you should not use
> it for anything serious (yet).*** If you do use this syntax, please
> provide feedback on [GitHub](https://github.com/zenparsing/es-function-bind).

The function bind syntax introduces a new operator `::` which performs function
binding and method extraction.

### Virtual Methods

Using an iterator library implemented as a module of "virtual methods":

```js title="JavaScript"
/* ES7 */
import { map, takeWhile, forEach } from "iterlib";

getPlayers()
::map(x => x.character())
::takeWhile(x => x.strength > 100)
::forEach(x => console.log(x));
```
```js title="JavaScript"
/* ES6 */
import { map, takeWhile, forEach } from "iterlib";

let _val;
_val = getPlayers();
_val = map.call(_val, x => x.character());
_val = takeWhile.call(_val, x => x.strength > 100);
_val = forEach.call(_val, x => console.log(x));
```

> **Note:** Babel's [output](https://babeljs.io/repl#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=false&corejs=3.21&spec=false&loose=false&code_lz=JYWwDg9gTgLgBAbziAhmANHGKDWBTAdQAtgAbPTAM2gFEUBjIuAXzkqghDgCJgY8opYACNuAbgBQEgOZ4YABVIoAngIDOACgCUEgFy7UYDQA84AXgB8cYwDpGKKA35RtO_dnzEyeE-au21GCg8ADtpGCYrAEYABhi3XWooOkZfSzh6CBC1CHIbUghpEy0tMSA&debug=false&forceAllTransforms=false&modules=false&shippedProposals=false&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=env%2Creact%2Cstage-2&prettier=false&targets=&version=7.25.6&externalPlugins=%40babel%2Fplugin-proposal-function-bind%407.24.7&assumptions=%7B%7D)
> looks different than this in order to be more concise.

Using a jquery-like library of virtual methods:

```js title="JavaScript"
/* ES7 */
// Create bindings for just the methods that we need
let { find, html } = jake;

// Find all the divs with class="myClass", then get all of the
// "p"s and replace their content.
document.querySelectorAll("div.myClass")::find("p")::html("hahaha");
```
```js title="JavaScript"
/* ES6 */
let _val;
_val = document.querySelectorAll("div.myClass");
_val = find.call(_val, "p");
_val = html.call(_val, "hahaha");
```

### Method Extraction

Using method extraction to print the eventual value of a promise to the console:

```js title="JavaScript"
/* ES7 */
Promise.resolve(123).then(::console.log);
```
```js title="JavaScript"
/* ES6 */
// Which could be written in ES6 as:
Promise.resolve(123).then(console.log.bind(console));
```

Using method extraction to call an object method when a DOM event occurs:

```js title="JavaScript"
/* ES7 */
$(".some-link").on("click", ::view.reset);
```
```js title="JavaScript"
/* ES6 */
$(".some-link").on("click", view.reset.bind(view));
```

> **Note:** You can read more about this syntax in the
> [Function Bind Syntax proposal](https://github.com/zenparsing/es-function-bind).

### Usage

Enable by stage:

```sh title="Shell"
$ babel --stage 0
```

Enable by transformer:

```sh title="Shell"
$ babel --optional es7.functionBind
```

---

The function bind syntax will only make it into ES7 if there is enough interest.
If you would like to see this syntax make it in, please give it a star on
[GitHub](https://github.com/zenparsing/es-function-bind) and provide any
feedback you have on [GitHub issues](https://github.com/zenparsing/es-function-bind/issues).

Special thanks to Ingvar Stepanyan ([@RReverser](https://github.com/RReverser))
for the [implementation](https://github.com/babel/babel/pull/1518) in Babel.

<p class="text-right">— The Babel team</p>
