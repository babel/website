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
      <div className="mainContainer" style={{ maxWidth: "1024px", margin: "0 auto" }}>
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
