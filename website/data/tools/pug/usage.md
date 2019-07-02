Now you can use ES6 in your pug templates as following.

```pug
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
    For more information see the <a href="https://github.com/jstransformers/jstransformer-babel">jstransformers/jstransformer-babel repo</a>.
  </p>
</blockquote>

