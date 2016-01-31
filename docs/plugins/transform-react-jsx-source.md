---
layout: docs
title: React JSX source transform
description:
permalink: /docs/plugins/transform-react-jsx-source/
package: babel-plugin-transform-react-jsx-source
---

Adds source file and line number to JSX elements.

## Example

**In**

```javascript
// this/file.js
<sometag />
```

**Out**

{% raw %}
```javascript
var _jsxFileName = "this/file.js"; // the output will be an absolute path
var x = <sometag __source={{
  fileName: _jsxFileName,
  lineNumber: 1
}} />;
```
{% endraw %}

## Installation

```sh
$ npm install babel-plugin-transform-react-jsx-source
```

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "plugins": ["transform-react-jsx-source"]
}
```
