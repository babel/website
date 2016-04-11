---
layout: docs
title: Class properties transform
description:
permalink: /docs/plugins/transform-class-properties/
package: babel-plugin-transform-class-properties
---

Allows to use class properties

```js
class MyClass {
  myProp = 42;
  static myStaticProp = 21;

  constructor() {
    console.log(this.myProp); // Prints '42'
    console.log(MyClass.myStaticProp); // Prints '21'
  }
}
```
[Try in REPL](/repl/#?evaluate=true&presets=es2015%2Cstage-0&code=class%20MyClass%20%7B%0A%20%20myProp%20%3D%2042%3B%0A%20%20static%20myStaticProp%20%3D%2021%3B%0A%0A%20%20constructor()%20%7B%0A%20%20%20%20console.log(this.myProp)%3B%20%2F%2F%20Prints%20'42'%0A%20%20%20%20console.log(MyClass.myStaticProp)%3B%20%2F%2F%20Prints%20'21'%0A%20%20%7D%0A%7D%0A%0Anew%20MyClass()%3B)

## Example
### Basic
You can declare class properties inside the class definition:

```js
class MyClass {
  myProp = 42;
  static myStaticProp = 21;
}

// is equivalent to:

class MyClass {

}

MyClass.prototype.myProp = 42;
MyClass.myStaticProp = 21;
```

### React propTypes
According to the [React documentation](https://facebook.github.io/react/docs/reusable-components.html#es6-classes), the way to add `propTypes` to a React ES6 class component is like that:

```js
export class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: props.initialCount};
    this.tick = this.tick.bind(this);
  }
  tick() {
    this.setState({count: this.state.count + 1});
  }
  render() {
    return (
      <div onClick={this.tick}>
        Clicks: {this.state.count}
      </div>
    );
  }
}
Counter.propTypes = { initialCount: React.PropTypes.number };
Counter.defaultProps = { initialCount: 0 };
```

Using class properties, it could be simplified to:

```js
export class Counter extends React.Component {

  propTypes = { initialCount: React.PropTypes.number };
  defaultProps = { initialCount: 0 };

  constructor(props) {
    super(props);
    this.state = {count: props.initialCount};
    this.tick = this.tick.bind(this);
  }
  tick() {
    this.setState({count: this.state.count + 1});
  }
  render() {
    return (
      <div onClick={this.tick}>
        Clicks: {this.state.count}
      </div>
    );
  }
}
```
[Try in REPL](/repl/#?evaluate=true&presets=es2015%2Creact%2Cstage-0&code=export%20class%20Counter%20extends%20React.Component%20%7B%0A%0A%20%20propTypes%20%3D%20%7B%20initialCount%3A%20React.PropTypes.number%20%7D%3B%0A%20%20defaultProps%20%3D%20%7B%20initialCount%3A%200%20%7D%3B%0A%0A%20%20constructor(props)%20%7B%0A%20%20%20%20super(props)%3B%0A%20%20%20%20this.state%20%3D%20%7Bcount%3A%20props.initialCount%7D%3B%0A%20%20%20%20this.tick%20%3D%20this.tick.bind(this)%3B%0A%20%20%7D%0A%20%20tick()%20%7B%0A%20%20%20%20this.setState(%7Bcount%3A%20this.state.count%20%2B%201%7D)%3B%0A%20%20%7D%0A%20%20render()%20%7B%0A%20%20%20%20return%20(%0A%20%20%20%20%20%20%3Cdiv%20onClick%3D%7Bthis.tick%7D%3E%0A%20%20%20%20%20%20%20%20Clicks%3A%20%7Bthis.state.count%7D%0A%20%20%20%20%20%20%3C%2Fdiv%3E%0A%20%20%20%20)%3B%0A%20%20%7D%0A%7D%0A)

## Installation

```sh
$ npm install babel-plugin-transform-class-properties
```

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "plugins": ["transform-class-properties"]
}
```

## References

* [Proposal: ES Class Fields & Static Properties](https://github.com/jeffmo/es-class-static-properties-and-fields)
