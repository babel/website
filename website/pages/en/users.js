const React = require("react");

const CompLibrary = require("../../core/CompLibrary.js");
const Container = CompLibrary.Container;

const siteConfig = require(process.cwd() + "/siteConfig.js");

class Users extends React.Component {
  render() {
    return (
      <div className="mainContainer">
        <Container padding={["bottom"]}>
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
            <div className="hr">
              <span>Who&#39;s Using</span>
            </div>
            <div
              className="users"
              data-users={JSON.stringify(siteConfig.users)}
            />
            <hr />
            <div className="prose">
              <p>
                Are you using this project?
                <a
                  href="https://build.amsterdam/your-company/babel"
                  target="_blank"
                  className="button"
                >
                  Add your company
                </a>
                or submit a{" "}
                <a
                  href="https://github.com/babel/website/edit/master/website/data/users.js"
                  target="_blank"
                >
                  Pull Request
                </a>{" "}
                manually.
              </p>
            </div>
          </div>
          <script src="/js/build/users.js" />
        </Container>
      </div>
    );
  }
}

module.exports = Users;
