---
layout: docs
title: Syntax trailing function commas
description:
permalink: /docs/plugins/syntax-trailing-function-commas/
package: babel-plugin-syntax-trailing-function-commas
---


This plugin allows Babel to parse [trailing function commas](https://github.com/jeffmo/es-trailing-function-commas).

```js
function clownPuppiesEverywhere(
  param1,
  param2,
) { /* ... */ }

clownPuppiesEverywhere(
  'foo',
  'bar',
);
```

## Example
### Basic
This is an example from the Proposal.

Let's say you have this function:

```js
function clownPuppiesEverywhere(
  param1,
  param2
) { /* ... */ }

clownPuppiesEverywhere(
  'foo',
  'bar'
);
```

You want to have a new parameter called `param3`:

```js
function clownPuppiesEverywhere(
  param1,
  param2, // Change this line to add a comma
  param3  // Add param3
) { /* ... */ }

clownPuppiesEverywhere(
  'foo',
  'bar', // Change this line to add a comma
  'baz'  // Add param3
);
```
In total, you have to change 2 lines for the function declaration and 2 lines for each usage.

If you had your function defined with trailing commas:

```js
function clownPuppiesEverywhere(
  param1,
  param2,
) { /* ... */ }

clownPuppiesEverywhere(
  'foo',
  'bar',
);
```
Adding a new parameter would only change one line in the function declaration and one line for each usage:

```js
function clownPuppiesEverywhere(
  param1,
  param2,
  param3, // Add param3
) { /* ... */ }

clownPuppiesEverywhere(
  'foo',
  'bar',
  'baz', // Add param3
);
```
In the end, it would be much quicker to add a new parameter to your functions, it also makes it easier to copy paste elements and move code around.

## Installation

```sh
$ npm install babel-plugin-syntax-trailing-function-commas
```

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "plugins": ["syntax-trailing-function-commas"]
}
```

## References

* [Proposal](https://github.com/jeffmo/es-trailing-function-commas)
* [Spec](http://jeffmo.github.io/es-trailing-function-commas/)
