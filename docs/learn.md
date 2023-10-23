---
title: Learn ES2015
id: learn
---

:::info es6features
This document was originally taken from Luke Hoban's excellent <a href="https://git.io/es6features">es6features</a> repo. Go give it a star
on GitHub!
:::

:::info REPL
Be sure to try these features out in the online <a href="/repl">REPL</a>.
:::

## Introduction

> ECMAScript 2015 is an ECMAScript standard that was ratified in June 2015.

ES2015 is a significant update to the language, and the first major update to the language since ES5 was standardized in 2009. Implementation of these features in major JavaScript engines is [underway now](https://compat-table.github.io/compat-table/es6).

See the [ES2015 standard](http://www.ecma-international.org/ecma-262/6.0/index.html)
for full specification of the ECMAScript 2015 language.

## ECMAScript 2015 Features

<!-- To not break some existing links to here, just in case. -->
<a id="arrows"></a>

### Arrows and Lexical This

Arrows are a function shorthand using the `=>` syntax.  They are syntactically
similar to the related feature in C#, Java 8 and CoffeeScript.  They support
both expression and statement bodies.  Unlike functions, arrows share the same
lexical `this` as their surrounding code. If an arrow is inside another function,
it shares the "arguments" variable of its parent function.

```js title="JavaScript"
// Expression bodies
var odds = evens.map(v => v + 1);
var nums = evens.map((v, i) => v + i);

// Statement bodies
nums.forEach(v => {
  if (v % 5 === 0)
    fives.push(v);
});

// Lexical this
var bob = {
  _name: "Bob",
  _friends: [],
  printFriends() {
    this._friends.forEach(f =>
      console.log(this._name + " knows " + f));
  }
};

// Lexical arguments
function square() {
  let example = () => {
    let numbers = [];
    for (let number of arguments) {
      numbers.push(number * number);
    }

    return numbers;
  };

  return example();
}

square(2, 4, 7.5, 8, 11.5, 21); // returns: [4, 16, 56.25, 64, 132.25, 441]
```

### Classes

ES2015 classes are syntactic sugar over the prototype-based OO pattern.  Having a
single convenient declarative form makes class patterns easier to use, and
encourages interoperability.  Classes support prototype-based inheritance, super
calls, instance and static methods and constructors.

```js title="JavaScript"
class SkinnedMesh extends THREE.Mesh {
  constructor(geometry, materials) {
    super(geometry, materials);

    this.idMatrix = SkinnedMesh.defaultMatrix();
    this.bones = [];
    this.boneMatrices = [];
    //...
  }
  update(camera) {
    //...
    super.update();
  }
  static defaultMatrix() {
    return new THREE.Matrix4();
  }
}
```

### Enhanced Object Literals

Object literals are extended to support setting the prototype at construction,
shorthand for `foo: foo` assignments, defining methods and making super calls.
Together, these also bring object literals and class declarations closer
together, and let object-based design benefit from some of the same
conveniences.

```js title="JavaScript"
var obj = {
    // Sets the prototype. "__proto__" or '__proto__' would also work.
    __proto__: theProtoObj,
    // Computed property name does not set prototype or trigger early error for
    // duplicate __proto__ properties.
    ['__proto__']: somethingElse,
    // Shorthand for ‘handler: handler’
    handler,
    // Methods
    toString() {
     // Super calls
     return "d " + super.toString();
    },
    // Computed (dynamic) property names
    [ "prop_" + (() => 42)() ]: 42
};
```

:::caution
The <code>__proto__</code> property requires native support, and was deprecated in previous ECMAScript versions. Most engines now support the property, but <a href="https://compat-table.github.io/compat-table/es6/#proto-in-object-literals-note">some do not</a>. Also, note that only <a href="http://www.ecma-international.org/ecma-262/6.0/index.html#sec-additional-ecmascript-features-for-web-browsers">web browsers</a> are required to implement it, as it's in <a href="http://www.ecma-international.org/ecma-262/6.0/index.html#sec-object.prototype.__proto__">Annex B</a>. It is available in Node.
:::

### Template Strings

Template strings provide syntactic sugar for constructing strings. This is
similar to string interpolation features in Perl, Python and more. Optionally, a
tag can be added to allow the string construction to be customized, avoiding
injection attacks or constructing higher level data structures from string
contents.

```js title="JavaScript"
// Basic literal string creation
`This is a pretty little template string.`

// Multiline strings
`In ES5 this is
 not legal.`

// Interpolate variable bindings
var name = "Bob", time = "today";
`Hello ${name}, how are you ${time}?`

// Unescaped template strings
String.raw`In ES5 "\n" is a line-feed.`

// Construct an HTTP request prefix is used to interpret the replacements and construction
GET`http://foo.org/bar?a=${a}&b=${b}
    Content-Type: application/json
    X-Credentials: ${credentials}
    { "foo": ${foo},
      "bar": ${bar}}`(myOnReadyStateChangeHandler);
```

### Destructuring

Destructuring allows binding using pattern matching, with support for matching
arrays and objects.  Destructuring is fail-soft, similar to standard object
lookup `foo["bar"]`, producing `undefined` values when not found.

```js title="JavaScript"
// list matching
var [a, ,b] = [1,2,3];
a === 1;
b === 3;

// object matching
var { op: a, lhs: { op: b }, rhs: c }
       = getASTNode()

// object matching shorthand
// binds `op`, `lhs` and `rhs` in scope
var {op, lhs, rhs} = getASTNode()

// Can be used in parameter position
function g({name: x}) {
  console.log(x);
}
g({name: 5})

// Fail-soft destructuring
var [a] = [];
a === undefined;

// Fail-soft destructuring with defaults
var [a = 1] = [];
a === 1;

// Destructuring + defaults arguments
function r({x, y, w = 10, h = 10}) {
  return x + y + w + h;
}
r({x:1, y:2}) === 23
```

### Default + Rest + Spread

Callee-evaluated default parameter values. Turn an array into consecutive
arguments in a function call. Bind trailing parameters to an array. Rest
replaces the need for `arguments` and addresses common cases more directly.

```js title="JavaScript"
function f(x, y=12) {
  // y is 12 if not passed (or passed as undefined)
  return x + y;
}
f(3) == 15
```
```js title="JavaScript"
function f(x, ...y) {
  // y is an Array
  return x * y.length;
}
f(3, "hello", true) == 6
```
```js title="JavaScript"
function f(x, y, z) {
  return x + y + z;
}
// Pass each elem of array as argument
f(...[1,2,3]) == 6
```

### Let + Const

Block-scoped binding constructs. `let` is the new `var`. `const` is
single-assignment. Static restrictions prevent use before assignment.


```js title="JavaScript"
function f() {
  {
    let x;
    {
      // this is ok since it's a block scoped name
      const x = "sneaky";
      // error, was just defined with `const` above
      x = "foo";
    }
    // this is ok since it was declared with `let`
    x = "bar";
    // error, already declared above in this block
    let x = "inner";
  }
}
```

### Iterators + For..Of

Iterator objects enable custom iteration like CLR IEnumerable or Java
Iterable. Generalize `for..in` to custom iterator-based iteration with
`for..of`. Don’t require realizing an array, enabling lazy design patterns like
LINQ.

```js title="JavaScript"
let fibonacci = {
  [Symbol.iterator]() {
    let pre = 0, cur = 1;
    return {
      next() {
        [pre, cur] = [cur, pre + cur];
        return { done: false, value: cur }
      }
    }
  }
}

for (var n of fibonacci) {
  // truncate the sequence at 1000
  if (n > 1000)
    break;
  console.log(n);
}
```

Iteration is based on these duck-typed interfaces (using
[TypeScript](https://www.typescriptlang.org/) type syntax for exposition only):

```ts
interface IteratorResult {
  done: boolean;
  value: any;
}
interface Iterator {
  next(): IteratorResult;
}
interface Iterable {
  [Symbol.iterator](): Iterator
}
```

:::info Support via polyfill
In order to use Iterators you must include the Babel <a href="/docs/babel-polyfill">polyfill</a>.
:::

### Generators

Generators simplify iterator-authoring using `function*` and `yield`. A function
declared as function* returns a Generator instance. Generators are subtypes of
iterators which include additional `next` and `throw`. These enable values to
flow back into the generator, so `yield` is an expression form which returns a
value (or throws).

Note: Can also be used to enable ‘await’-like async programming, see also ES7 `await` [proposal](https://github.com/lukehoban/ecmascript-asyncawait).

```js title="JavaScript"
var fibonacci = {
  [Symbol.iterator]: function*() {
    var pre = 0, cur = 1;
    for (;;) {
      var temp = pre;
      pre = cur;
      cur += temp;
      yield cur;
    }
  }
}

for (var n of fibonacci) {
  // truncate the sequence at 1000
  if (n > 1000)
    break;
  console.log(n);
}
```

The generator interface is (using [TypeScript](https://www.typescriptlang.org/) type
syntax for exposition only):

```ts
interface Generator extends Iterator {
    next(value?: any): IteratorResult;
    throw(exception: any);
}
```

:::info Support via polyfill
In order to use Generators you must include the Babel <a href="/docs/babel-polyfill">polyfill</a>.
:::

### Comprehensions

Removed in Babel 6.0

### Unicode

Non-breaking additions to support full Unicode, including new unicode literal
form in strings and new RegExp `u` mode to handle code points, as well as new
APIs to process strings at the 21bit code points level.  These additions support
building global apps in JavaScript.

```js title="JavaScript"
// same as ES5.1
"𠮷".length == 2

// new RegExp behaviour, opt-in ‘u’
"𠮷".match(/./u)[0].length == 2

// new form
"\u{20BB7}" == "𠮷"
"𠮷" == "\uD842\uDFB7"

// new String ops
"𠮷".codePointAt(0) == 0x20BB7

// for-of iterates code points
for(var c of "𠮷") {
  console.log(c);
}
```

### Modules

Language-level support for modules for component definition. Codifies patterns
from popular JavaScript module loaders (AMD, CommonJS). Runtime behaviour
defined by a host-defined default loader. Implicitly async model – no code
executes until requested modules are available and processed.

```js title="JavaScript"
// lib/math.js
export function sum(x, y) {
  return x + y;
}
export var pi = 3.141593;
```
```js title="JavaScript"
// app.js
import * as math from "lib/math";
console.log("2π = " + math.sum(math.pi, math.pi));
```
```js title="JavaScript"
// otherApp.js
import {sum, pi} from "lib/math";
console.log("2π = " + sum(pi, pi));
```

Some additional features include `export default` and `export *`:

```js title="JavaScript"
// lib/mathplusplus.js
export * from "lib/math";
export var e = 2.71828182846;
export default function(x) {
    return Math.exp(x);
}
```
```js title="JavaScript"
// app.js
import exp, {pi, e} from "lib/mathplusplus";
console.log("e^π = " + exp(pi));
```

:::info Module Formatters
Babel can transpile ES2015 Modules to several different formats including
Common.js, AMD, System, and UMD. You can even create your own. For more
details see the <a href="/docs/plugins/">modules docs</a>.
:::

### Module Loaders

:::caution Not part of ES2015
This is left as implementation-defined within the ECMAScript 2015 specification. The eventual standard will be in WHATWG's <a href="https://whatwg.github.io/loader/">Loader specification</a>, but that is currently a work in progress. What is below is from a previous ES2015 draft.
:::

Module loaders support:

- Dynamic loading
- State isolation
- Global namespace isolation
- Compilation hooks
- Nested virtualization

The default module loader can be configured, and new loaders can be constructed
to evaluate and load code in isolated or constrained contexts.

```js title="JavaScript"
// Dynamic loading – ‘System’ is default loader
System.import("lib/math").then(function(m) {
  alert("2π = " + m.sum(m.pi, m.pi));
});

// Create execution sandboxes – new Loaders
var loader = new Loader({
  global: fixup(window) // replace ‘console.log’
});
loader.eval("console.log(\"hello world!\");");

// Directly manipulate module cache
System.get("jquery");
System.set("jquery", Module({$: $})); // WARNING: not yet finalized
```

:::caution Additional polyfill needed
Since Babel defaults to using common.js modules, it does not include the
polyfill for the module loader API. Get it <a href="https://github.com/ModuleLoader/es6-module-loader">here</a>.
:::

:::info Using Module Loader
In order to use this, you'll need to tell Babel to use the <code>system</code> module formatter. Also be sure to check out <a href="https://github.com/systemjs/systemjs">System.js</a>.
:::


### Map + Set + WeakMap + WeakSet

Efficient data structures for common algorithms.  WeakMaps provides leak-free
object-key’d side tables.

```js title="JavaScript"
// Sets
var s = new Set();
s.add("hello").add("goodbye").add("hello");
s.size === 2;
s.has("hello") === true;

// Maps
var m = new Map();
m.set("hello", 42);
m.set(s, 34);
m.get(s) == 34;

// Weak Maps
var wm = new WeakMap();
wm.set(s, { extra: 42 });
wm.size === undefined

// Weak Sets
var ws = new WeakSet();
ws.add({ data: 42 });
// Because the added object has no other references, it will not be held in the set
```

:::info Support via polyfill
In order to support Maps, Sets, WeakMaps, and WeakSets in all environments you must include the Babel <a href="/docs/babel-polyfill">polyfill</a>.
:::

### Proxies

Proxies enable creation of objects with the full range of behaviors available to
host objects.  Can be used for interception, object virtualization,
logging/profiling, etc.

```js title="JavaScript"
// Proxying a normal object
var target = {};
var handler = {
  get: function (receiver, name) {
    return `Hello, ${name}!`;
  }
};

var p = new Proxy(target, handler);
p.world === "Hello, world!";
```

```js title="JavaScript"
// Proxying a function object
var target = function () { return "I am the target"; };
var handler = {
  apply: function (receiver, ...args) {
    return "I am the proxy";
  }
};

var p = new Proxy(target, handler);
p() === "I am the proxy";
```

There are traps available for all of the runtime-level meta-operations:

```js title="JavaScript"
var handler =
{
  // target.prop
  get: ...,
  // target.prop = value
  set: ...,
  // 'prop' in target
  has: ...,
  // delete target.prop
  deleteProperty: ...,
  // target(...args)
  apply: ...,
  // new target(...args)
  construct: ...,
  // Object.getOwnPropertyDescriptor(target, 'prop')
  getOwnPropertyDescriptor: ...,
  // Object.defineProperty(target, 'prop', descriptor)
  defineProperty: ...,
  // Object.getPrototypeOf(target), Reflect.getPrototypeOf(target),
  // target.__proto__, object.isPrototypeOf(target), object instanceof target
  getPrototypeOf: ...,
  // Object.setPrototypeOf(target), Reflect.setPrototypeOf(target)
  setPrototypeOf: ...,
  // Object.keys(target)
  ownKeys: ...,
  // Object.preventExtensions(target)
  preventExtensions: ...,
  // Object.isExtensible(target)
  isExtensible :...
}
```

:::danger Unsupported feature
Due to the limitations of ES5, Proxies cannot be transpiled or polyfilled. See support in <a href="https://compat-table.github.io/compat-table/es6/#test-Proxy">various JavaScript engines</a>.
:::

### Symbols

Symbols enable access control for object state. Symbols allow properties to be
keyed by either `string` (as in ES5) or `symbol`. Symbols are a new primitive
type. Optional `name` parameter used in debugging - but is not part of identity.
Symbols are unique (like gensym), but not private since they are exposed via
reflection features like `Object.getOwnPropertySymbols`.

```js title="JavaScript"
(function() {

  // module scoped symbol
  var key = Symbol("key");

  function MyClass(privateData) {
    this[key] = privateData;
  }

  MyClass.prototype = {
    doStuff: function() {
      ... this[key] ...
    }
  };

  // Limited support from Babel, full support requires native implementation.
  typeof key === "symbol"
})();

var c = new MyClass("hello")
c["key"] === undefined
```

:::info Limited support via polyfill
Limited support requires the Babel <a href="/docs/babel-polyfill">polyfill</a>. Due to language limitations, some features can't be transpiled or polyfilled. See core.js's <a href="https://github.com/zloirock/core-js#caveats-when-using-symbol-polyfill">caveats section</a> for more details.
:::

### Subclassable Built-ins

In ES2015, built-ins like `Array`, `Date` and DOM `Element`s can be subclassed.

```js title="JavaScript"
// User code of Array subclass
class MyArray extends Array {
    constructor(...args) { super(...args); }
}

var arr = new MyArray();
arr[1] = 12;
arr.length == 2
```

:::caution Partial support
Built-in subclassability should be evaluated on a case-by-case basis as classes such as <code>HTMLElement</code> <strong>can</strong> be subclassed while many such as <code>Date</code>, <code>Array</code> and <code>Error</code> <strong>cannot</strong> be due to ES5 engine limitations.
:::

### Math + Number + String + Object APIs

Many new library additions, including core Math libraries, Array conversion
helpers, and Object.assign for copying.

```js title="JavaScript"
Number.EPSILON
Number.isInteger(Infinity) // false
Number.isNaN("NaN") // false

Math.acosh(3) // 1.762747174039086
Math.hypot(3, 4) // 5
Math.imul(Math.pow(2, 32) - 1, Math.pow(2, 32) - 2) // 2

"abcde".includes("cd") // true
"abc".repeat(3) // "abcabcabc"

Array.from(document.querySelectorAll("*")) // Returns a real Array
Array.of(1, 2, 3) // Similar to new Array(...), but without special one-arg behavior
[0, 0, 0].fill(7, 1) // [0,7,7]
[1,2,3].findIndex(x => x == 2) // 1
["a", "b", "c"].entries() // iterator [0, "a"], [1,"b"], [2,"c"]
["a", "b", "c"].keys() // iterator 0, 1, 2
["a", "b", "c"].values() // iterator "a", "b", "c"

Object.assign(Point, { origin: new Point(0,0) })
```

:::caution Limited support from polyfill
Most of these APIs are supported by the Babel <a href="/docs/babel-polyfill">polyfill</a>. However, certain features are omitted for various reasons (e.g. <code>String.prototype.normalize</code> needs a lot of additional code to support). You can find more polyfills <a href="https://github.com/addyosmani/es6-tools#polyfills">here</a>.
:::

### Binary and Octal Literals
Two new numeric literal forms are added for binary (`b`) and octal (`o`).

```js title="JavaScript"
0b111110111 === 503 // true
0o767 === 503 // true
```

:::caution Only supports literal form
Babel is only able to transform <code>0o767</code> and not <code>Number("0o767")</code>.
:::


### Promises

Promises are a library for asynchronous programming. Promises are a first class
representation of a value that may be made available in the future. Promises are
used in many existing JavaScript libraries.

```js title="JavaScript"
function timeout(duration = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, duration);
    })
}

var p = timeout(1000).then(() => {
    return timeout(2000);
}).then(() => {
    throw new Error("hmm");
}).catch(err => {
    return Promise.all([timeout(100), timeout(200)]);
})
```

:::info Support via polyfill
In order to support Promises you must include the Babel <a href="/docs/babel-polyfill">polyfill</a>.
:::

### Reflect API

Full reflection API exposing the runtime-level meta-operations on objects. This
is effectively the inverse of the Proxy API, and allows making calls
corresponding to the same meta-operations as the proxy traps. Especially useful
for implementing proxies.

```js title="JavaScript"
var O = {a: 1};
Object.defineProperty(O, 'b', {value: 2});
O[Symbol('c')] = 3;

Reflect.ownKeys(O); // ['a', 'b', Symbol(c)]

function C(a, b){
  this.c = a + b;
}
var instance = Reflect.construct(C, [20, 22]);
instance.c; // 42
```

:::info Support via polyfill
In order to use the Reflect API you must include the Babel <a href="/docs/babel-polyfill">polyfill</a>.
:::

### Tail Calls

Calls in tail-position are guaranteed to not grow the stack unboundedly. Makes
recursive algorithms safe in the face of unbounded inputs.

```js title="JavaScript"
function factorial(n, acc = 1) {
    "use strict";
    if (n <= 1) return acc;
    return factorial(n - 1, n * acc);
}

// Stack overflow in most implementations today,
// but safe on arbitrary inputs in ES2015
factorial(100000)
```

:::caution Temporarily Removed in Babel 6
Only explicit self referencing tail recursion was supported due to the
complexity and performance impact of supporting tail calls globally.
Removed due to other bugs and will be re-implemented.
:::
