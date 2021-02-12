const React = require("react");

const translate = require("../../server/translate.js").translate;

const dedent = str => {
  const len = str.match(/^[\n\r]+([^\S\n\r]+)/)[1].length;
  return str.replace(new RegExp(`^[^\\S\\n\\r]{0,${len}}`, "gm"), "").trim();
};

const AssumptionsHeader = () => {
  return (
    <div className="page-header text-center">
      <h1>
        <translate desc="assumptions page - header">Assumptions</translate>
      </h1>
    </div>
  );
};

const Assumption = ({ name, code, plugins, children }) => (
  <assumption-docs
    assumption={name}
    default-code={dedent(code)}
    plugins={plugins}
  >
    <h2 slot="name">
      <code>{name}</code>
    </h2>
    {children}
  </assumption-docs>
);

class AssumptionsDocs extends React.Component {
  render() {
    return (
      <div
        className="mainContainer"
        style={{ maxWidth: "1024px", margin: "0 auto" }}
      >
        <script src="/js/babel.min.js" />
        <script type="module" src="/js/components/mini-repl.js" />
        <script type="module" src="/js/components/assumption-docs.js" />

        <AssumptionsHeader />
        <Assumption
          name="arrayLikeIsIterable"
          code={`
            let images = document.getElementsByTagName("img");

            for (const img of images) {
              console.log(img);
            }

            const copy = [...images];
          `}
          plugins="transform-destructuring,transform-spread,transform-for-of"
        >
          When spreading or iterating an array-like object, assume that it
          implements a <code>[Symbol.iterator]</code> method with the same
          behavior of the native <code>Array.prototype[Symbol.iterator]</code>,
          and thus directly iterate over its element by index.
          <br />
          This can be useful, for example, to iterate DOM collections in older
          browsers
        </Assumption>
        <Assumption name="constantSuper" code={`
          class Child extends Base {
            method() {
              super.method(2);
            }
          }
        `} plugins="transform-classes">
          The super class of a class can be changed at any time by using{" "}
          <code>Object.setPrototypeOf</code>, making it impossible for Babel to
          statically know it. When this option is enabled, Babel assumes that
          it's never changed and thus it is always the value that was placed in
          the <code>extends</code> clause in the class declaration.
        </Assumption>
        <Assumption
          name="ignoreFunctionLength"
          code={`
            function fn(a, b = 2, c, d = 3) {
              return a + b + c + d;
            }
          `}
          plugins="transform-parameters"
        >
          Functions have a <code>.length</code> property that reflect the number
          of parameters up to the last non-default parameter. When this option
          is enabled, assume that the compiled code does not rely on this{" "}
          <code>.length</code> property.
        </Assumption>
        <Assumption
          name="ignoreToPrimitiveHint"
          code={`
            let str = \`a\${foo}b\`;
          `}
          plugins="transform-template-literals"
        >
          When using language features that might call the{" "}
          <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toPrimitive">
            <code>[Symbol.toPrimitive]</code>
          </a>{" "}
          method of objects, assume that they don't change their behavior based
          on the <code>hint</code> parameter.
        </Assumption>
        <Assumption
          name="iterableIsArray"
          code={`
            const [first, ...rest] = obj;

            call(first, ...obj);
            let arr = [first, ...obj];

            for (const el of obj) {
              console.log(el);
            }
          `}
          plugins="transform-for-of,transform-destructuring,transform-spread"
        >
          When using an iterable object (in array destructuring, for-of or
          spreads), assume that it is an array.
        </Assumption>
        <Assumption
          name="mutableTemplateObject"
          code={`
            let str = tag\`a\${foo}b\`;
          `}
          plugins="transform-template-literals"
        >
          When using language features that might call the{" "}
          <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toPrimitive">
            <code>[Symbol.toPrimitive]</code>
          </a>{" "}
          method of objects, assume that they don't change their behavior based
          on the <code>hint</code> parameter.
        </Assumption>
        <Assumption
          name="noClassCalls"
          code={`
            class Test {
              constructor() {
                this.x = 2;
              }
            }
          `}
          plugins="transform-classes"
        >
          When transforming classes, assume that they are always instantiate with <code>new</code> and they are never called as functions.
        </Assumption>
        <Assumption
          name="noDocumentAll"
          code={`
            let score = points ?? 0;
            let name = user?.name;
          `}
          plugins="proposal-optional-chaining,proposal-nullish-coalescing-operator"
        >
          When using operators that check for <code>null</code> or{" "}
          <code>undefined</code>, assume that they are never used with the
          special value <code>document.all</code>
        </Assumption>
        <Assumption
          name="objectRestNoSymbols"
          code={`
            let { name, ...attrs } = obj;
          `}
          plugins="transform-destructuring,proposal-object-rest-spread"
        >
          When using rest patterns in object destructuring, assume that
          destructured objects don't have symbol keys or that it's not a problem
          if they are not copied.
        </Assumption>
        <Assumption
          name="privateFieldsAsProperties"
          code={`
            class Foo {
                #method() {}

                #field = 2;
            }
        `}
          plugins="proposal-class-properties,proposal-private-methods"
        >
          Assume that "soft privacy" is enough for private fields, and thus they
          can be stored as public non-enumerable properties with an unique name
          (rather than using an external <code>WeakMap</code>). This makes
          debugging compiled private fields easier.
        </Assumption>
        <Assumption
          name="pureGetters"
          code={`
            let a = obj;

            a.b?.();
          `}
          plugins="proposal-optional-chaining"
        >
          Assume that getters, if present, don't have side-effects and can be accessed multiple times.
        </Assumption>
        <Assumption
          name="setClassMethods"
          code={`
            class Foo extends Bar {
                method() {}

                static check() {}
              }
          `}
          plugins="transform-classes"
        >
          When declaring classess, assume that methods don't shadow getters on
          the superclass and that the program doesn't depend on methods being
          non-enumerable. Thus, it's safe to assign methods rather than using{" "}
          <code>Object.defineProperty</code>.
        </Assumption>
        <Assumption
          name="setComputedProperties"
          code={`
            let obj = {
              set name(value) {},
              [key]: val
            }
          `}
          plugins="transform-computed-properties"
        >
          When using computed object properties, assume that the object doesn't
          contain properties that overwrite setter defined in the same object,
          and thus it's safe to assign them rather than defining them using{" "}
          <code>Object.defineProperty</code>.
        </Assumption>
        <Assumption
          name="setPublicClassFields"
          code={`
            class Test {
              field = 2;

              static staticField = 3;
            }
          `}
          plugins="proposal-class-properties"
        >
          When using public class fields, assume that they don't shadow any
          getter in the current class, in its subclasses or in its superclass.
          Thus, it's safe to assign them rather than using{" "}
          <code>Object.defineProperty</code>.
        </Assumption>
        <Assumption
          name="setSpreadProperties"
          code={`
            const result = {
              set name(value) {},
              ...obj,
            };
          `}
          plugins="proposal-object-rest-spread"
        >
          When using object spread, assume that spreaded properties don't
          trigger getters on the target object and thus it's safe to assign them
          rather than defining them using <code>Object.defineProperty</code>.
        </Assumption>
        <Assumption
          name="skipForOfIteratorClosing"
          code={`
            for (const val of iterable) {
              console.log(val);
            }
          `}
          plugins="transform-for-of"
        >
          When using <code>for-of</code> with an iterator, it should always be
          closed with <code>.return()</code> and with <code>.throw()</code> in
          case of an error. When this option is called Babel assumes that those
          methods are not defined or empty, and it avoids calling them.
        </Assumption>
        <Assumption
          name="superIsCallableConstructor"
          code={`
            class Child extends Parent {
              constructor() {
                super(42);
              }
            }
          `}
          plugins="transform-classes"
        >
          When extending classes, assume that the super class is callable. This
          means that it won't be possible to extend native classes or built-ins,
          but only compiled classes or ES5 <code>function</code> constructors.
        </Assumption>
        <br />
        <br />
        <br />

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}

module.exports = AssumptionsDocs;
