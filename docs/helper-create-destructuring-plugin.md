---
id: babel-helper-create-destructuring-plugin
title: "@babel/helper-create-destructuring-plugin"
sidebar_label: helper-create-destructuring-plugin
---

:::caution Internal helper
This library is an internal Babel helper, used by Babel plugins. This page describes its design for Babel contributors: its API is not meant to be used by third-party plugins and may change without notice. You can check out the [source](https://github.com/babel/babel/tree/main/packages/babel-helper-create-destructuring-plugin) here.
:::

`@babel/helper-create-destructuring-plugin` compiles destructuring patterns, object rest and spread properties, and private destructuring. It is a plugin factory, shared by the plugins compiling these features:

| Plugin | Features |
| --- | --- |
| [`@babel/plugin-transform-destructuring`](plugin-transform-destructuring.md) | `destructuring` |
| [`@babel/plugin-transform-object-rest-spread`](plugin-transform-object-rest-spread.md) | `objectRest`, `objectSpread` |
| [`@babel/plugin-proposal-destructuring-private`](plugin-proposal-destructuring-private.md) | `privateDestructuring` |

This helper observes the following assumptions: [`arrayLikeIsIterable`](assumptions.md#arraylikeisiterable), [`ignoreFunctionLength`](assumptions.md#ignorefunctionlength), [`iterableIsArray`](assumptions.md#iterableisarray), [`noNewArrows`](assumptions.md#nonewarrows), [`objectRestNoSymbols`](assumptions.md#objectrestnosymbols), [`pureGetters`](assumptions.md#puregetters) and [`setSpreadProperties`](assumptions.md#setspreadproperties).

## Goals

- Compile each feature once. These plugins used to implement the same mechanisms independently: memoising the right-hand side and computed keys, building the list of keys excluded from an object rest element, moving destructured parameters into the function body. Running them together also meant that a pattern could be partially lowered by one plugin, and then lowered again by another one.
- Follow the evaluation order of the specification, including in the cases where it can be observed: getters, iterators, computed keys and default values with side effects, `null` and `undefined` values, assignments to member expressions, and the scopes in which default values are evaluated.
- Produce small output. Values are only stored in temporary variables when it's needed, and array literals are unpacked when it's safe.
- Maintain the scope information. Keep the scope information exact without crawling the scope after every lowered pattern, which was a significant part of the compilation time of these plugins.

## Installation

```sh npm2yarn
npm install @babel/helper-create-destructuring-plugin
```

## Usage

### Plugin Factory

```ts
import { createDestructuringPlugin, FEATURES } from "@babel/helper-create-destructuring-plugin";

createDestructuringPlugin({
  name: string,
  api: PluginAPI,
  feature: number, // a combination of FEATURES
  options?: FeatureOptions,
  manipulateOptions?: PluginObject["manipulateOptions"],
}): PluginObject;
```

A plugin wrapper can resolve its own options and assumptions, and passes them to the factory:

```js title="@babel/plugin-transform-object-rest-spread"
export default declare((api, opts) => {
  api.assertVersion(REQUIRED_VERSION("^7.0.0-0 || ^8.0.0"));

  const { useBuiltIns = supportsObjectAssign, loose = false } = opts;

  return createDestructuringPlugin({
    name: "transform-object-rest-spread",
    api,
    feature: FEATURES.objectRest | FEATURES.objectSpread,
    options: {
      useBuiltIns,
      ignoreFunctionLength: api.assumption("ignoreFunctionLength") ?? loose,
      objectRestNoSymbols: api.assumption("objectRestNoSymbols") ?? loose,
      pureGetters: api.assumption("pureGetters") ?? loose,
      setSpreadProperties: api.assumption("setSpreadProperties") ?? loose,
    },
  });
});
```

### Features

| Feature | Lowered syntax |
| --- | --- |
| `destructuring` | Array and object patterns (ES2015) |
| `objectRest` | `...rest` elements in object patterns (ES2018) |
| `objectSpread` | `...spread` elements in object literals (ES2018) |
| `privateDestructuring` | `#x: value` properties in object patterns ([proposal](https://tc39.es/proposal-destructuring-private)) |

Without the `destructuring` feature, the lowering is _partial_: only the parts of a pattern that contain an enabled feature are lowered, and the rest of the pattern stays native (see [Full and partial lowering](#full-and-partial-lowering)).

### Shared state

In its `pre` hook, each plugin instance records its features and options on the `File`, with string keys so that different copies of the helper (e.g. when it isn't deduplicated by the package manager) share them:

- Features are combined in a bitmask.
- Options are stored per feature. When a lowering needs an option, it reads the value of the plugin that "owns" the behavior: object rest options (`useBuiltIns`, `objectRestNoSymbols`, `pureGetters`, `setSpreadProperties`) come from `transform-object-rest-spread` first, and array options (`iterableIsArray`, `arrayLikeIsIterable`) from `transform-destructuring` first. The resolved options are cached on the file.
- Assumptions that are the same for all the plugins of a configuration (`noNewArrows`) are stored as they are.
- The version of the newest copy of the helper is recorded. Every visitor of every instance is guarded: only the instances created by that copy do anything, so that a node is never lowered twice by different versions. They lower the union of the features recorded on the file, including the ones enabled by plugins depending on an older copy.

### Visitors

| Node | Transform |
| --- | --- |
| `VariableDeclaration` | Lowers the declarators containing patterns that need to be lowered. |
| `AssignmentExpression` | Lowers `pattern = value`, in a statement, in an arrow function body, or in any expression (where the value of the assignment is preserved when it's used). |
| `ForXStatement` | Moves the pattern of `for (... of/in ...)` into the loop body, as a declaration or an assignment lowered by the visitors above. |
| `CatchClause` | Moves the pattern of `catch (pattern)` into the block, as a `let` declaration. |
| `ExportNamedDeclaration` | Splits `export const { a } = b` into a declaration and an export list. |
| `Function` (`objectRest`, `privateDestructuring`) | Moves the parameters containing these features into the function body (see [Function parameters](#function-parameters)). |
| `ObjectExpression` (`objectSpread`) | Compiles object spread (see [Object spread](#object-spread)). |
| `Loop` exit (`objectSpread`) | Declares the per-iteration bindings of the home objects of the spread objects created in the loop. |
| `Class` (`privateDestructuring`) | Runs all the visitors above in the body of classes with private elements first, so that private names are lowered to private member expressions before the class features plugins compile the class. |

## The lowering engine

The lowering of a pattern is implemented by the `Lowering` class (`src/lowering.ts`), which walks the pattern once, left to right, in the order in which the specification evaluates it. It doesn't produce AST nodes directly, but a list of _steps_:

| Step | Meaning |
| --- | --- |
| `Temp` | `id = init`, where `id` is a new temporary variable assigned once. |
| `Bind` | `target = init`, where `target` is a binding, a member expression, or a native pattern. |
| `Effect` | An expression evaluated for its side effects only (e.g. the `RequireObjectCoercible` check of an empty pattern). |

The visitors then materialize the steps for their context: declarators of a variable declaration (split by `Effect` steps), a sequence expression replacing an assignment, the statements of the body of an arrow function, or the single `init` of a `for (;;)` statement (where side effects are folded into the initializers, without wrapping an anonymous function whose name would be lost).

An assignment is replaced by a single expression, also in statement position, so that the statement stays a single statement (e.g. the body of an `if` without braces). Its temporaries are declared with `var` in the enclosing function, in the order of the values they hold, and a temporary is assigned where it is first read when nothing is evaluated before:

```js title="input.js"
({ a, ...b } = c);
```

```js title="output.js"
var _c;
({ a } = _c = c), b = _objectWithoutProperties(_c, ["a"]);
```

### Lazy references

Every value that is destructured (the right-hand side, the value of a property, an element of an array, a default value...) is represented by a `Ref`. The code reading a value calls `ref.use()`, which returns a placeholder, and records at which step it was read. Once the whole pattern has been walked, each reference is decided:

- Inline: it is read once, and nothing is evaluated between its evaluation and its read. The placeholder is replaced by the expression itself.
- Temp: it is read several times, or something is evaluated in between. A `Temp` step is inserted where the value must be evaluated, and the placeholders read the temporary variable.
- Effect: it isn't read, but its evaluation may have side effects.
- None: it isn't read, and its evaluation has no side effects.

The temporary variables are named in creation order, which follows the evaluation order, and from the expression they store. For example,

```js title="input.js"
const { a, [key()]: b = 1, ...rest } = obj;
```

```js title="output.js"
const _obj = obj,
  a = _obj.a,
  _toPropertyKey2 = _toPropertyKey(key()),
  _obj$_toPropertyKey = _obj[_toPropertyKey2],
  b = _obj$_toPropertyKey === void 0 ? 1 : _obj$_toPropertyKey,
  rest = _objectWithoutProperties(_obj, ["a", _toPropertyKey2]);
```

Here `obj` is read three times, so it's stored in `_obj`. `key()` has side effects and is needed twice (to read the property and to exclude it from `rest`), so it's converted to a property key once, where the specification does it, and stored. `_obj.a` is read once, right away, so it's inlined.

Static values are never copied to temporaries: each read is a copy of the expression. They are literals, constant bindings, and the plugin's own temporaries (including the ones declared by `for-of`/`for-in` heads), which user code never assigns. The identifiers that `scope.rename` generates for user bindings are not considered static, as user code may reassign them.

### Full and partial lowering

With the `destructuring` feature, every pattern is lowered. Otherwise, the lowering keeps everything it can native:

- Object patterns are split in chunks: consecutive properties that don't need to be lowered stay together in a native pattern, and the properties containing an object rest or a private key are lowered between them. Computed keys that are needed again to exclude them from a rest element are memoised inline, in the native pattern: `{ [_key = f()]: x }`. A rest element that doesn't need to be lowered stays native when the only lowered properties before it have private keys, which are never copied to the rest object:

  ```js title="input.js"
  const { #x: x, y, ...z } = obj;
  ```

  ```js title="output.js"
  const _obj = obj,
    x = _obj.#x,
    { y, ...z } = _obj;
  ```

- Array patterns can't be split, because an iterator can't be read twice. The elements that need to be lowered are replaced by temporaries in the native pattern, and lowered afterwards, in order. The following elements stay in the native pattern, so that a nested array pattern is iterated while the outer iterator is still open, unless they must be evaluated after the lowered elements: when they read a name bound by a lowered element, or run user code (default values, computed keys, member expression targets):

  ```js title="input.js"
  const [a, { ...b }, [c], d = f()] = arr;
  ```

  ```js title="output.js"
  const [a, _ref, [c], _ref2] = arr,
    b = _objectWithoutProperties(Object.assign(Object.create(null), (_objectDestructuringEmpty(_ref), _ref)), []),
    d = _ref2 === void 0 ? f() : _ref2;
  ```

### Evaluation order

The steps are produced where the specification evaluates the corresponding values. The cases that need care:

- `RequireObjectCoercible`. Destructuring `null` or `undefined` throws before any property name is evaluated, and before any assignment target. Reading a property of the value throws anyway, so an explicit check (`_objectDestructuringEmpty(value)`, or an empty native pattern in partial mode) is only emitted when something observable would happen before the first read: evaluating a computed key, or evaluating a member expression target. It is also emitted when the pattern is empty or only contains `void` properties, and when the object rest helper would be called with excluded keys (it returns `{}` for `null`). Evaluating a key is not observable when it's a primitive that can't throw, a well-known symbol, `Symbol.for` of such a key, or an identifier read by the property access itself (`_obj[key]` checks `_obj` before converting `key`) whose binding is initialized at that point. The properties of an object pattern are classified once (rest element, kept in a native pattern, skipped with `pureGetters`, or lowered), and both the check and the lowering are derived from this classification.
- Computed keys are evaluated in source order, after the bindings that precede them, and converted to property keys once. They are memoised when they are needed again (to exclude them from a rest element) or when a member expression target must be evaluated after them; keys that can be evaluated again without observable effects (see above) are not.
- Assignment targets. In `({ x: obj[f()] } = g())`, the specification evaluates `g()`, checks it, then evaluates the property name, then the target `obj[f()]`, then reads the property. Assigning to the target is a `Bind` step `obj[f()] = <value>`, where the target is evaluated before its value: the values the read depends on are moved to temporaries evaluated before it, when the target or the values can affect each other.

  ```js title="output.js"
  var _g;
  _g = g(), _objectDestructuringEmpty(_g), obj[f()] = _g.x;
  ```

  With a default value, the read is memoised inline: `obj.x = (_ref$x = _ref.x) === void 0 ? 1 : _ref$x`. Patterns that stay native read their value once before evaluating their targets, so they don't need a temporary.

- Default values are evaluated only when the value is `undefined`.
- `void` discard bindings don't read the property, but the value is still checked, a computed key is still evaluated and converted, and the key is still excluded from the rest element; array elements are still consumed.
- Array literals are _unpacked_ when it's safe: `const [a, b] = [1, 2]` becomes `const a = 1, b = 2`. The specification evaluates the whole literal before destructuring it, so unpacking is only done when the array and the pattern have the same length, the elements can't be affected by the destructuring of the previous ones (getters, default values, nested targets, assignments to undeclared names, which may call a setter of the global object), the elements don't refer to or assign the bindings of the pattern, and the array isn't also the value of the assignment.

  ```js title="input.js"
  const [{ x }, y] = [obj, z];
  ```

  ```js title="output.js"
  const _ref = [obj, z],
    x = _ref[0].x,
    y = _ref[1];
  ```

  Elements that may run user code when they are evaluated, by coercing a value (`i - 1`, a template literal), are stored in temporaries in order, before any target is assigned, without building the array: `const [a, b] = [i - 1, i + 1]` becomes `const _ref = i - 1, _ref2 = i + 1, a = _ref, b = _ref2`. Initialized bindings can't throw, and are read in place.

- The value of an assignment, when it's used (`result = [a, b] = pair`), is the original right-hand side: it's stored in a temporary, which is also the value of the replacing sequence expression. This also applies when the assignment is the completion value of a script, of an `eval` or of a `do` expression: it is the last statement that doesn't complete empty (declarations, empty statements, `break` and `continue` complete empty). Similarly, the pattern assigned by a `for-of`/`for-in` head is assigned in a declaration (`var _ref = ({ a } = _ref)`) when the completion value is observable and the loop body completes empty, so that it doesn't replace the completion value of the loop.

### Names of default values

Anonymous functions and classes used as the default value of an identifier get its name ([NamedEvaluation](https://tc39.es/ecma262/#sec-runtime-semantics-namedevaluation)), in `src/named-evaluation.ts`:

- Functions are named with the `setFunctionName` helper.
- Classes are defined as a property, `{ x: class {} }.x`, so that the name is set before their static initialization can observe it, and a class with its own static `name` member keeps it. A `__proto__` property would set the prototype instead, so it uses a computed key: `{ ["__proto__"]: class {} }["__proto__"]`.
- A parenthesized target, `[(a) = function () {}] = []`, isn't an identifier reference, so nothing is named.

Conversely, an anonymous function that isn't a default value but ends up assigned to an identifier (e.g. an element of an unpacked array literal, or a temporary) is wrapped in `(0, fn)`, so that it doesn't get a name it wouldn't have natively.

### Scopes

Patterns moved out of their position must keep resolving their references the same way:

- The pattern of a `catch` clause or of a `for-of`/`for-in` head is evaluated outside of the body's block. When the body declares a name that the moved pattern refers to (in a default value or a computed key), the body is wrapped in another block, so that its declarations don't capture the reference. This also handles names without a declaration in the enclosing scopes, such as globals.
- For function parameters, see below.

## Function parameters

`@babel/plugin-transform-destructuring` doesn't lower parameters: patterns in parameters are compiled by `@babel/plugin-transform-parameters`. The object rest and private destructuring features do lower them, by moving the parameters that contain them into the function body:

```js title="input.js"
function f({ ...a }, b = g()) {}
```

```js title="output.js"
function f(_ref) {
  let a = _objectWithoutProperties(Object.assign(Object.create(null), (_objectDestructuringEmpty(_ref), _ref)), []);
  let b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : g();
}
```

Only the object patterns that need to be lowered are moved: an array pattern stays in the parameter list, with the elements that don't need to be lowered, so that it is still iterated in order (by the engine, or by `@babel/plugin-transform-parameters`). For example, `function f([{ ...a }, b]) {}` becomes `function f([_ref, b]) { var a = ... }`.

When nothing else is affected, each moved pattern is replaced by a temporary and destructured by a `var` declaration at the beginning of the body, which is then lowered by the `VariableDeclaration` visitor. Otherwise, the parameters are moved with `convertFunctionParams` from `@babel/plugin-transform-parameters`:

- when another parameter, or a part of the same parameter staying in the list, refers to a binding of a moved pattern (`function f([{ ...r }, b = r]) {}`), or a moved pattern refers to an outer binding shadowed in the body, or to a parameter that the body redeclares (with parameter expressions, the body has its own binding for it, which a closure in the parameters must not see);
- when a moved parameter is redeclared in the function body;
- when a following parameter has an observable evaluation (here `b = g()`, or the default value of another lowered parameter), which must happen after the destructuring of the moved parameter (e.g. after the brand check of a private key);
- when the function is a generator: its parameters are initialized when it's called, not when it's first resumed. `convertFunctionParams` evaluates them in a function wrapping the generator body.

`convertFunctionParams` takes a predicate of the parameters to move, and extends it: the following parameters whose evaluation is observable, and every parameter after a default value read from `arguments`, are moved too. It converts arrow functions to function expressions when needed, converts a remaining rest parameter with `convertFunctionRest` (building its array before the function wrapping the body, when there is one), and skips the TypeScript `this` parameter when reading `arguments`. The pattern of a rest parameter (`...[{ ...a }]`) isn't a scope of its own in `@babel/traverse`, unlike the other parameter patterns: its references are checked against the declarations of the body like the ones of the other parameters.

`convertFunctionParams` declares the moved parameters with `let`, so that a function declared in a block of the body can't override them (see [Annex B](#annex-b)), and with `var` when the body calls `eval` directly: the `var`s declared by the `eval` would conflict with lexical declarations.

### `arguments`

A function with default, rest or destructuring parameters has an unmapped `arguments` object, also in sloppy mode: assigning a parameter doesn't change the corresponding element, and reading `arguments.callee` throws. Once its patterns are replaced, the parameter list may become simple, which would make `arguments` mapped. This is only observable when `arguments` is written or escapes (as a whole, or through a direct `eval`), when `arguments.callee` is read, or when its elements are read while a parameter staying in the list is assigned. In that case only, an unmapped copy is created at the beginning of the body, before any parameter is initialized:

```js title="input.js"
function f({ ...a }) {
  return arguments;
}
```

```js title="output.js"
function f(_ref) {
  arguments = function () {
    "use strict";

    return arguments;
  }.apply(void 0, arguments);
  var a = _objectWithoutProperties(Object.assign(Object.create(null), (_objectDestructuringEmpty(_ref), _ref)), []);
  return arguments;
}
```

A function declaration of the body redeclaring a parameter would overwrite an element of the mapped object before it is copied: the body is then wrapped in a function. Whether the source reads `arguments` or calls `eval` at all is recorded once per file, so that functions are only traversed when needed.

### Annex B

In sloppy mode, a function declared in a block is also declared as a `var` of the enclosing function, unless its name is a parameter or conflicts with a lexical declaration. The names bound by the patterns moved into the body aren't parameters anymore, so the blocks declaring such functions are wrapped in a block with a `let` declaration of the name, which prevents the hoisting:

```js title="input.js"
function f({ ...a }) {
  {
    function a() {}
  }
  return a;
}
```

```js title="output.js"
function f(_ref) {
  var a = _objectWithoutProperties(Object.assign(Object.create(null), (_objectDestructuringEmpty(_ref), _ref)), []);
  {
    let a;
    {
      function a() {}
    }
  }
  return a;
}
```

The same exclusions are preserved when the body is wrapped in a function, for `if` and `switch` function declarations too.

## Object rest

A rest element is compiled with the `objectWithoutProperties` helper (`objectWithoutPropertiesLoose` with `objectRestNoSymbols`), with the keys of the previous properties:

```js title="output.js"
const _obj = obj,
  { a } = _obj,
  rest = _objectWithoutProperties(_obj, ["a"]);
```

The keys are converted to property keys once, and the list is hoisted to the top of the program (`_excluded`) when it only contains literals. When no key is excluded, the value is first copied with `Object.assign` (or the `extends` helper, depending on `useBuiltIns`) into an object with a `null` prototype, so that the properties are read in the order of `CopyDataProperties`, and an own `__proto__` property is defined on the rest object instead of setting its prototype.

## Object spread

Object spread doesn't use the lowering engine: consecutive properties are grouped in object literals, and the spread elements are passed to `objectSpread2` (or to `Object.assign`/`extends` with `setSpreadProperties`), preserving the order in which the properties are evaluated and defined. With `pureGetters`, the groups are passed to a single call. A `__proto__: value` property after a spread element sets the prototype of the object being built, when it's evaluated:

```js title="output.js"
const o = _setPrototypeOf(_objectSpread(_objectSpread({}, a), {}, { b }), _getPrototypeOf({ __proto__: p }));
```

The methods of the object literal are moved to the object passed to the helper, so their home object would be that object instead of the result: their `super` references are rewritten against the result, stored in a temporary. In a loop, the temporary is declared with `let` in the loop body, so that the methods of each iteration see their own object:

```js title="input.js"
const o = { ...a, m() { return super.x; } };
```

```js title="output.js"
var _obj;
const o = _obj = _objectSpread(_objectSpread({}, a), {}, {
  m() {
    return _superPropGet(_obj, "x", this);
  }
});
```

## Scope information

The previous plugins often crawled the scope again after transforming a pattern, to update the bindings and their references. The helper maintains the scope information incrementally instead (`src/scope.ts`), and keeps it identical to the result of a crawl. A lowering:

1. collects the references and constant violations recorded for the nodes of the statement before lowering it, because the lowering reads them (e.g. `pureGetters` skips the properties whose binding is never referenced) and mutates the patterns;
2. forgets them once the statement is replaced. References are tracked by node rather than by path, since a node may have been registered through several paths (e.g. by the crawl of a nested scope after it was moved). A node is forgotten from all the bindings with its name in the enclosing scopes, since resolving it from the scope of the statement isn't enough: e.g. a parameter default doesn't see the declarations of the function body, which share the function's scope in Babel;
3. registers the nodes replacing the statement: the declared bindings, moved from the old declaration with their reference information, the references (including to the temporaries and helpers), and the assignments.

The replacement is registered by walking it directly rather than with `path.traverse`, and paths are only created for the nodes that are registered: the nodes moved from the original statement keep their paths, and the new references are added without searching the existing ones.

Temporaries hoisted with `scope.push` are registered in the function scope, where a crawl registers `var` declarations. They are declared in the function scope directly when the lowered statement is the body of a loop without braces: `scope.push` would wrap it in a block, whose new scope would be crawled while the lowered nodes are still in the tree. The `for-of`/`for-in`, `catch` and conflicting function parameter transforms, and object spread with `super` in a loop, still crawl the scope they rewrite (after forgetting the information of its nodes when they move them).

## Known limitations

- Different versions of the helper. Only the newest copy of the helper lowers the code, with its own implementation of the features enabled by plugins depending on older copies.
- Iterators are consumed eagerly by the array helpers (`slicedToArray`, `toArray`): the elements are read before the targets and default values are evaluated, instead of one at a time, and in partial mode nested patterns are destructured after the whole array pattern. The helpers also iterate real arrays directly, ignoring a patched `Array.prototype[Symbol.iterator]`. Being fully spec-compliant would require iterating manually.
- Generators with lowered parameters are wrapped in a function that returns the generator, as `@babel/plugin-transform-parameters` does: the generator objects don't inherit from the outer function's `prototype`.
- Comments attached to the properties of a lowered pattern, or to the pattern of a `for-of` head, are dropped.
