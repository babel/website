---
id: babel-helper-validator-identifier
title: "@babel/helper-validator-identifier"
sidebar_label: helper-validator-identifier
---

`@babel/helper-validator-identifier` is a utility package for parsing JavaScript keywords and identifiers. It provides several helper functions for identifying valid identifier names and detecting reserved words and keywords.

## Installation

```shell npm2yarn
npm install @babel/helper-validator-identifier
```

## Usage

To use the package in your code, import the required functions from `@babel/helper-validator-identifier`:

```js title="my-babel-plugin.js"
import {
  isIdentifierName,
  isIdentifierStart,
  isIdentifierChar,
  isReservedWord,
  isStrictBindOnlyReservedWord,
  isStrictBindReservedWord,
  isStrictReservedWord,
  isKeyword,
} from "@babel/helper-validator-identifier";
```

### `isIdentifierName`
```typescript
function isIdentifierName(name: string): boolean
```

The `isIdentifierName` function checks whether a given string can be a valid [identifier name](https://tc39.es/ecma262/#prod-IdentifierName). Note that it doesn't handle unicode escape sequences. For example, `isIdentifierName("\\u0061")` returns `false` while `\u0061` could be an JavaScript identifier name (`a`).

### `isIdentifierStart`
```typescript
function isIdentifierStart(codepoint: number): boolean
```

The `isIdentifierStart` function checks whether a given Unicode code point can start an identifier, as defined by the [IdentifierStartChar](https://tc39.es/ecma262/#prod-IdentifierStartChar).

### `isIdentifierChar`
```typescript
function isIdentifierChar(codepoint: number): boolean
```

The `isIdentifierChar` function checks whether a given Unicode code point can be part of an identifier, as defined by the [IdentifierPartChar](https://tc39.es/ecma262/#prod-IdentifierPartChar).

### Keywords and Reserved words helpers

These helpers detect [keyword and reserved words](https://tc39.es/ecma262/#sec-keywords-and-reserved-words). For more information, see the [implementation](https://github.com/babel/babel/blob/main/packages/babel-helper-validator-identifier/src/keyword.ts).

```typescript
function isReservedWord(word: string, inModule: boolean): boolean
function isStrictReservedWord(word: string, inModule: boolean): boolean
function isStrictBindOnlyReservedWord(word: string): boolean
function isStrictBindReservedWord(word: string, inModule: boolean): boolean
function isKeyword(word: string): boolean
```
