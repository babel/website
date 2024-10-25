---
id: babel-code-frame
title: "@babel/code-frame"
---

## Install

```shell npm2yarn
npm install --save-dev @babel/code-frame
```

## Usage

### `codeFrameColumns`

The `codeFrameColumns` function allows you to decorate a code snipped with line numbers and with a marker pointing to a specific location.

It will also optionally highlight your code, defaulting to what is supported by the output terminal.

```js title="JavaScript"
import { codeFrameColumns } from "@babel/code-frame";

const rawLines = `class Foo {
  constructor()
}`;
const location = { start: { line: 2, column: 16 } };

const result = codeFrameColumns(rawLines, location, {
  /* options */
});

console.log(result);
```

```
  1 | class Foo {
> 2 |   constructor()
    |                ^
  3 | }
```

If the column number is not known, you may omit it.

You can also pass an `end` hash in `location`.

```js title="JavaScript"
import { codeFrameColumns } from "@babel/code-frame";

const rawLines = `class Foo {
  constructor() {
    console.log("hello");
  }
}`;
const location = {
  start: { line: 2, column: 17 },
  end: { line: 4, column: 3 },
};

const result = codeFrameColumns(rawLines, location, {
  /* options */
});

console.log(result);
```

```
  1 | class Foo {
> 2 |   constructor() {
    |                 ^
> 3 |     console.log("hello");
    | ^^^^^^^^^^^^^^^^^^^^^^^^^
> 4 |   }
    | ^^^
  5 | };
```

#### Options

##### `highlightCode`

`boolean`, defaults to `false`.

Toggles syntax highlighting the code as JavaScript for terminals.

##### `linesAbove`

`number`, defaults to `2`.

Adjust the number of lines to show above the error.

##### `linesBelow`

`number`, defaults to `3`.

Adjust the number of lines to show below the error.

##### `forceColor`

`boolean`, defaults to `false`.

Enable this to forcibly syntax highlight the code as JavaScript (for non-terminals); overrides `highlightCode`.

##### `message`

`string`, otherwise nothing

Pass in a string to be displayed inline (if possible) next to the highlighted
location in the code. If it can't be positioned inline, it will be placed above
the code frame.

```
1 | class Foo {
> 2 |   constructor()
  |                ^ Missing {
3 | };
```

### `highlight`

The `highlight` function adds syntax highlighting to a code snipped, to be displayed in a terminal.

```js title="JavaScript"
import { highlight } from "@babel/code-frame";

const code = `class Foo {
  constructor()
}`;

const result = highlight(code);

console.log(result);
```

```js title="JavaScript"
class Foo {
  constructor()
}
```

## Upgrading from prior versions

Prior to version 7, the only API exposed by this module was for a single line and optional column pointer. The old API will now log a deprecation warning.

The new API takes a `location` object, similar to what is available in an AST.

This is an example of the deprecated (but still available) API:

```js title="JavaScript"
import codeFrame from "@babel/code-frame";

const rawLines = `class Foo {
  constructor()
}`;
const lineNumber = 2;
const colNumber = 16;

const result = codeFrame(rawLines, lineNumber, colNumber, {
  /* options */
});

console.log(result);
```

To get the same highlighting using the new API:

```js title="JavaScript"
import { codeFrameColumns } from "@babel/code-frame";

const rawLines = `class Foo {
  constructor() {
    console.log("hello");
  }
}`;
const location = { start: { line: 2, column: 16 } };

const result = codeFrameColumns(rawLines, location, {
  /* options */
});

console.log(result);
```

## Migrating from `@babel/highlight`

The `highlight` functionality was originally split in its own package, `@babel/highlight`.

You can migrate as follows:
<table>
<thead>
<tr>
<th>Using <code>@babel/highlight</code></th>
<th>Using <code>@babel/code-frame</code></th>
</tr>
</thead>
<tbody><tr><td>

```js title="JavaScript"
import highlight from "@babel/highlight";

highlight(text, { forceColor: true });
```

</td><td>

```js title="JavaScript"
import { highlight } from "@babel/code-frame";

highlight(text);
```

</td></tr><tr><td>

```js title="JavaScript"
import highlight from "@babel/highlight";

highlight(text);
```

</td><td>

```js title="JavaScript"
import { highlight } from "@babel/code-frame";

process.stdout.hasColors() ? highlight(text) : text;
```

</td></tr></tbody></table>
