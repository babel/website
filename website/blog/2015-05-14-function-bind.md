---
layout: post
title:  "Function Bind Syntax"
author: James Kyle
authorURL: https://twitter.com/thejameskyle
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

```js
/* ES7 */
import { map, takeWhile, forEach } from "iterlib";

getPlayers()
::map(x => x.character())
::takeWhile(x => x.strength > 100)
::forEach(x => console.log(x));
```
```js
/* ES6 */
import { map, takeWhile, forEach } from "iterlib";

let _val;
_val = getPlayers();
_val = map.call(_val, x => x.character());
_val = takeWhile.call(_val, x => x.strength > 100);
_val = forEach.call(_val, x => console.log(x));
```

> **Note:** Babel's [output](/repl/#?experimental=true&evaluate=false&loose=false&spec=false&playground=false&code=import%20%7B%20map%2C%20takeWhile%2C%20forEach%20%7D%20from%20%22iterlib%22%3B%0A%0AgetPlayers()%0A%3A%3Amap(x%20%3D%3E%20x.character())%0A%3A%3AtakeWhile(x%20%3D%3E%20x.strength%20%3E%20100)%0A%3A%3AforEach(x%20%3D%3E%20console.log(x))%3B)
> looks different than this in order to be more concise.

Using a jquery-like library of virtual methods:

```js
/* ES7 */
// Create bindings for just the methods that we need
let { find, html } = jake;

// Find all the divs with class="myClass", then get all of the
// "p"s and replace their content.
document.querySelectorAll("div.myClass")::find("p")::html("hahaha");
```
```js
/* ES6 */
let _val;
_val = document.querySelectorAll("div.myClass");
_val = find.call(_val, "p");
_val = html.call(_val, "hahaha");
```

### Method Extraction

Using method extraction to print the eventual value of a promise to the console:

```js
/* ES7 */
Promise.resolve(123).then(::console.log);
```
```js
/* ES6 */
// Which could be written in ES6 as:
Promise.resolve(123).then(console.log.bind(console));
```

Using method extraction to call an object method when a DOM event occurs:

```js
/* ES7 */
$(".some-link").on("click", ::view.reset);
```
```js
/* ES6 */
$(".some-link").on("click", view.reset.bind(view));
```

> **Note:** You can read more about this syntax in the
> [Function Bind Syntax proposal](https://github.com/zenparsing/es-function-bind).

### Usage

Enable by stage:

```sh
$ babel --stage 0
```

Enable by transformer:

```sh
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
