import React, { useState } from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Translate from '@docusaurus/Translate';
import MarkdownBlock from "../components/v1/MarkdownBlock";

import "../../static/css/setup.css";

const SetupHeader = () => {
  return (
    <div className="page-header text-center">
      <h1>
        <Translate id="setupPage.header" description="setup page - header">Using Babel</Translate>
      </h1>
      <p>
        <Translate id="setupPage.headerDesc" description="setup page - header desc">
          How to use Babel with your tool of choice.
        </Translate>
      </p>
    </div>
  );
};

const SetupSelectButton = (props) => {
  const { items, name } = props.types;
  const { activeTool } = props;
  const showTools = Object.keys(items).map((tool, j) => {
    const className = "button button--secondary" + (tool === activeTool ? " button--active" : "");
    return (
      <Link
        key={j}
        href="#installation"
        className={className}
        onClick={() => props.onSelectTool(tool)}
      >
        {items[tool]}
      </Link>
    );
  });
  return (
    <div className="tools-group">
      <h5>{name}</h5>
      <div className="button-group" style={{display: "flex", flexWrap: "wrap"}}>
      {showTools}
      </div>
    </div>
  );
};

const SetupOptions = (props) => {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();

  const tools = customFields.tools;
  const showCase = tools.map((types, i) => {
    return <SetupSelectButton key={i} types={types} onSelectTool={props.onSelectTool} activeTool={props.activeTool} />;
  });
  return (
    <div className="step-setup">
      <h2>
        <span className="step-no">1</span>
        <Translate id="setupPage.step1" description="setup page - step 1">
          Choose your tool (try CLI)
        </Translate>
      </h2>
      {showCase}
    </div>
  );
};

const StepInstallAndUsage = (props) => {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();
  const markdownsElement = customFields.toolsMD
    .filter((tool) => tool.title === props.tool)
    .map((tool, index) => (
      <div className="items" data-title={tool.title} key={index}>
        <MarkdownBlock>{tool[props.name]}</MarkdownBlock>
      </div>
    ));
  const installation = (
    <Translate id="setupPage.step2" description="setup page - step 2">Installation</Translate>
  );
  const usage = <Translate id="setupPage.step3" description="setup page - step 3">Usage</Translate>;
  return (
    <div className="step-setup" hidden={!props.tool}>
      <h2 id={props.name === "install" ? "installation" : ""}>
        <span className="step-no">{props.number}</span>
        {props.name === "install" ? installation : usage}
      </h2>
      {markdownsElement}
    </div>
  );
};

const StepFour = (props) => {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();
  return (
    <div className="step-setup" hidden={props.hidden}>
      <h2>
        <span className="step-no">4</span>
        <Translate id="setupPage.step4_1" description="setup page - step 4 one">Create</Translate>{" "}
        <code>babel.config.json</code>{" "}
        <Translate id="setupPage.step4_2" description="setup page - step 4 two">configuration file</Translate>
      </h2>
      <MarkdownBlock>{customFields.setupBabelrc}</MarkdownBlock>
    </div>
  );
};

const SetupContent = () => {
  const [tool, setTool] = useState();
  return (
    <div className="container paddingBottom">
      <div className="step">
        <SetupOptions onSelectTool={setTool} activeTool={tool}/>
        <StepInstallAndUsage name="install" number="2" tool={tool} />
        <StepInstallAndUsage name="usage" number="3" tool={tool} />
        <StepFour hidden={tool === undefined}/>
      </div>
    </div>
  );
};

const Setup = () => {
  return (
    <Layout>
      <div className="mainContainer">
        <SetupHeader />
        <SetupContent />
      </div>
    </Layout>
  );
};

export default Setup;
