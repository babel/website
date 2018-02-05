const React = require("react");

const fs = require("fs");
const path = require("path");
const CompLibrary = require("../../core/CompLibrary.js");
const Container = CompLibrary.Container;
const MarkdownBlock = CompLibrary.MarkdownBlock;
const siteConfig = require(process.cwd() + "/siteConfig.js");
const setupBabelrc = siteConfig.setupBabelrc;
const toolsMD = siteConfig.toolsMD;

const SetupHeader = () => {
  return (
    <div className="page-header text-center">
      <h1>Using Babel</h1>
      <p>How to use Babel with your tool of choice.</p>
    </div>
  );
};

const SetupSelectButton = props => {
  const showTools = Object.keys(props.types.items).map((tool, j) => {
    return (
      <a
        key={j}
        data-title={tool}
        href="#installation"
        className="tools-button"
      >
        {props.types.items[tool]}
      </a>
    );
  });
  return (
    <div className="tools-group">
      <h5>{props.types.name}</h5>
      {showTools}
    </div>
  );
};

const SetupOptions = () => {
  const tools = siteConfig.tools;
  const showCase = tools.map((types, i) => {
    return <SetupSelectButton key={i} types={types} />;
  });
  return (
    <div className="step-setup">
      <h2>
        <span className="step-no">1</span>
        {" Choose your tool (try CLI)"}
      </h2>
      {showCase}
    </div>
  );
};

const StepInstallAndUsage = props => {
  const markdownsElement = toolsMD.map((tool, index) => (
    <div className="items" data-title={tool.title} key={index}>
      <MarkdownBlock key={index}>{tool[props.name]}</MarkdownBlock>
    </div>
  ));
  return (
    <div className="step-hidden step-setup">
      <h2 id={props.name === "install" ? "installation" : ""}>
        <span className="step-no">{props.number}</span>
        {props.name === "install" ? " Installation" : " Usage"}
      </h2>
      {markdownsElement}
    </div>
  );
};

const StepFour = () => {
  return (
    <div className="step-hidden step-setup">
      <h2>
        <span className="step-no">4</span> Create <code>.babelrc</code> configuration file
      </h2>
      <MarkdownBlock>{setupBabelrc}</MarkdownBlock>
    </div>
  );
};

const SetupContent = () => {
  return (
    <Container padding={["bottom"]}>
      <div className="step">
        <SetupOptions />
        <StepInstallAndUsage name="install" number="2" />
        <StepInstallAndUsage name="usage" number="3" />
        <StepFour />
      </div>
    </Container>
  );
};

class Setup extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const time = new Date().getTime();
    return (
      <div className="mainContainer">
        <SetupHeader />
        <SetupContent />
        <script src={`${siteConfig.baseUrl}scripts/tools.js?t=${time}`} />
      </div>
    );
  }
}

module.exports = Setup;
