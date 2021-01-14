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
      <div className="mainContainer">
        <script src="/js/babel.min.js" />
        <script type="module" src="/js/components/mini-repl.js" />
        <script type="module" src="/js/components/assumption-docs.js" />

        <AssumptionsHeader />
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
