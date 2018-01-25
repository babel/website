const React = require("react");

const CompLibrary = require("../../core/CompLibrary.js");
const Container = CompLibrary.Container;

const siteConfig = require(process.cwd() + "/siteConfig.js");

class Users extends React.Component {
  render() {
    const showcase = siteConfig.users.map((user, i) => {
      return (
        <a href={user.infoLink} key={i}>
          <img src={user.image} title={user.caption} />
        </a>
      );
    });

    return (
      <div className="mainContainer">
        <Container padding={["bottom", "top"]}>
          <div className="showcaseSection">
            <div className="prose">
              <h1>See who is using Babel</h1>
              <p>
                Logos are submitted by company and project representatives.
                These companies may or may not be using Babel on their main web
                properties, but they are definitely using it somewhere in their
                organizations 🙂
              </p>
            </div>
            <div className="logos">{showcase}</div>
            <div className="prose">
              <p>
                Are you using this project? Please submit a logo of 500x200
                (2.5x1) run through{" "}
                <a href="https://jakearchibald.github.io/svgomg/">SVGO</a>
              </p>
              <p>And give us a shout on what you love about Babel!</p>
              <br />
              <a
                href="https://github.com/babel/website/edit/master/website/data/users.yml"
                className="button"
              >
                Submit a Pull Request!
              </a>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

module.exports = Users;
