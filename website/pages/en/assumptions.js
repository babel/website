const React = require("react");

const translate = require("../../server/translate.js").translate;

const dedent = ([str]) => {
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
  <assumption-docs assumption={name} default-code={code} plugins={plugins}>
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
        <script src="https://35264-24560307-gh.circle-artifacts.com/0/~/babel/packages/babel-standalone/babel.min.js" />
        <script src="https://unpkg.com/ace-builds@1.3.3/src-min-noconflict/ace.js" />
        <script type="module" src="/js/components/mini-repl.js" />
        <script type="module" src="/js/components/assumption-docs.js" />

        <AssumptionsHeader />
        <Assumption
          name="noDocumentAll"
          code={dedent`
            let score = points ?? 0;
            let name = user?.name;
          `}
          plugins="proposal-optional-chaining,proposal-nullish-coalescing-operator"
        >
          When using operators that check for <code>null</code> or{" "}
          <code>undefined</code>, assume that they are never used with the
          special value <code>document.all</code>
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
