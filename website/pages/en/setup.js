const React = require("react");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const CompLibrary = require("../../core/CompLibrary.js");
const translate = require("../../server/translate.js").translate;
const Container = CompLibrary.Container;
const MarkdownBlock = CompLibrary.MarkdownBlock;
const siteConfig = require(process.cwd() + "/siteConfig.js");
const setupBabelrc = siteConfig.setupBabelrc;
const toolsMD = siteConfig.toolsMD;

function checksumTools() {
  const str = fs.readFileSync(
    path.join(process.cwd(), "static/scripts/tools.js"),
    "utf8"
  );
  return crypto
    .createHash("md5")
    .update(str, "utf8")
    .digest("hex");
}

const SetupHeader = () => {
  return (
    <div className="page-header text-center">
      <h1>
        <translate desc="setup page - header">Using Babel</translate>
      </h1>
      <p>
        <translate desc="setup page - header desc">
          How to use Babel with your tool of choice.
        </translate>
      </p>
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
        <translate desc="setup page - step 1">
          Choose your tool (try CLI)
        </translate>
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
  const installation = (
    <translate desc="setup page - step 2">Installation</translate>
  );
  const usage = <translate desc="setup page - step 3">Usage</translate>;
  return (
    <div className="step-hidden step-setup">
      <h2 id={props.name === "install" ? "installation" : ""}>
        <span className="step-no">{props.number}</span>
        {props.name === "install" ? installation : usage}
      </h2>
      {markdownsElement}
    </div>
  );
};

const StepFour = () => {
  return (
    <div className="step-hidden step-setup">
      <h2>
        <span className="step-no">4</span>
        <translate desc="setup page - step 4 one">Create</translate>{" "}
        <code>babel.config.json</code>{" "}
        <translate desc="setup page - step 4 two">configuration file</translate>
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
    return (
      <div className="mainContainer">
        <SetupHeader />
        <SetupContent />
        <script
          src={`${siteConfig.baseUrl}scripts/tools.js?t=${checksumTools()}`}
        />
      </div>
    );
  }
}

module.exports = Setup;
