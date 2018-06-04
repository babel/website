---
id: version-6.x-babel-helpers
title: babel-helpers
sidebar_label: babel-helpers
original_id: babel-helpers
---

## Install

```sh
npm install --save-dev babel-helpers
```

## Usage

```js
import * as helpers from 'babel-helpers';
import * as t from 'babel-types';

const typeofHelper = helpers.get('typeof');

t.isExpressionStatement(typeofHelper);
// true
```

