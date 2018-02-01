const React = require("react");

const fs = require("fs");
const path = require("path");
const CompLibrary = require("../../core/CompLibrary.js");
const Container = CompLibrary.Container;
const MarkdownBlock = CompLibrary.MarkdownBlock;
const siteConfig = require(process.cwd() + "/siteConfig.js");
const setupBabelrc = siteConfig.setupBabelrc;
const toolsMD = siteConfig.toolsMD;

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

const StepSetup = () => {
  const usagesMD = toolsMD.map((tool, index) => (
    <div className="items" data-title={tool.title} key={index}>
      <MarkdownBlock key={index}>{tool.usage}</MarkdownBlock>
    </div>
  ));
  return (
    <div className="step-hidden step-setup">
      <h2>
        <span className="step-no">3</span> Usage
      </h2>
      {usagesMD}
    </div>
  );
};

const StepInstall = props => {
  const installsMD = toolsMD.map((tool, index) => (
    <div className="items" data-title={tool.title} key={index}>
      <MarkdownBlock key={index}>{tool.install}</MarkdownBlock>
    </div>
  ));
  return (
    <div className="step-hidden step-setup">
      <h2 id="installation">
        <span className="step-no">2</span> Installation
      </h2>
      {installsMD}
    </div>
  );
};

class Setup extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const tools = siteConfig.tools;
    const time = new Date().getTime();
    const showCase = tools.map((types, i) => {
      const showTools = Object.keys(types.items).map((tool, j) => {
        const isActive = false;
        return (
          <a
            key={j}
            data-title={tool}
            href={"#installation"}
            className="tools-button"
          >
            {types.items[tool]}
          </a>
        );
      });
      return (
        <div className="tools-group" key={i}>
          <h5>{types.name}</h5>
          {showTools}
        </div>
      );
    });
    return (
      <div className="mainContainer">
        <div className="page-header text-center">
          <h1>Using Babel</h1>
          <p>How to use Babel with your tool of choice.</p>
        </div>
        <Container padding={["bottom"]}>
          <div className="step">
            <div className="step-setup">
              <h2>
                <span className="step-no">1</span>
                {" Choose your tool (try CLI)"}
              </h2>
              {showCase}
            </div>
            <StepInstall />
            <StepSetup />
            <StepFour />
          </div>
        </Container>
        <script src="https://cdn.jsdelivr.net/npm/jquery@3.2.1/dist/jquery.min.js" />
        <script src={`${siteConfig.baseUrl}scripts/tools.js?t=${time}`} />
      </div>
    );
  }
}

module.exports = Setup;
