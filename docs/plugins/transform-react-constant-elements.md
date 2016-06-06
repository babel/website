---
layout: docs
title: React constant elements transformer
description:
permalink: /docs/plugins/transform-react-constant-elements/
package: babel-plugin-transform-react-constant-elements
---

Hoists element creation to the top level for subtrees that are fully static, which reduces call to `React.createElement` and the resulting allocations. More importantly, it tells React that the subtree hasn't changed so React can completely skip it when reconciling.

This transform **should be enabled only in production** (e.g., just before minifying your code) because although it improves runtime performance, it makes warning messages more cryptic.

**In**

```js
const Hr = () => {
  return <hr className="hr" />;
}
```

**Out**

```js
const _ref = <hr className="hr" />;

const Hr = () => {
  return _ref;
};
```

**Deopts**

```js
// The plugin will not run on the use of `refs` or `object rest spread`
<foo {...foobar} />
<foo ref="foobar" />;
```

## Installation

```sh
$ npm install babel-plugin-transform-react-constant-elements
```

## Usage

Add the following line to your `.babelrc`:

```json
{
  "plugins": ["transform-react-constant-elements"]
}
```
