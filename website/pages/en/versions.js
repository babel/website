const React = require("react");

const CompLibrary = require("../../core/CompLibrary.js");
const Container = CompLibrary.Container;

const CWD = process.cwd();
const siteConfig = require(CWD + "/siteConfig.js");
// const versions = require(CWD + "/versions.json");

class Versions extends React.Component {
  render() {
    return (
      <div className="pageContainer">
        <Container className="mainContainer">
          <h1>Babel Versions</h1>
          <div><a href={`${siteConfig.baseUrl}docs/en/next/index.html`}>Master Docs</a></div>
          <div><a href={`${siteConfig.baseUrl}docs/en/index.html`}>6.x Docs</a></div>
        </Container>
      </div>
    );
  }
}

Versions.defaultProps = {
  language: "en",
};

module.exports = Versions;
