现在你可以在你的 pug 模板中使用 ES6, 如下所示：

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
    欲了解更多信息，请参阅 <a href="https://github.com/jstransformers/jstransformer-babel">jstransformers/jstransformer-babel 项目</a>。
  </p>
</blockquote>

