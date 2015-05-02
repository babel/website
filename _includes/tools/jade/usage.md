```js
var jade = require("jade");
var babel = require("jade-babel");

jade.filters.babel = babel({});
```

OR

```js
var jade = require("jade");
var babel = require("jade-babel");

jade = babel({}, jade);
```

Now you can use ES6 in your jade templates as following.

```jade
script
  :babel
    console.log("Hello World !!!");
    class Person {
      constructor(name) {
        this.name = name;
      }
      sayName(){
        console.log(`Hello, my name is ${this.name}`);
      }
    }
    var person = new Person("Apoxx");
    person.sayName();
```

<blockquote class="babel-callout babel-callout-info">
  <p>
    For more information see the <a href="https://github.com/babel/jade-babel">babel/jade-babel repo</a>.
  </p>
</blockquote>

