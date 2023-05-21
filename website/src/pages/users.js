import React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import "../../static/css/users.css";

const Users = () => {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();
  const showcase = customFields.users.map((user, i) => {
    return (
      <div className="babel-user" key={i}>
        <a className="babel-user-link" href={user.infoLink}>
          <img
            className="babel-user-logo"
            src={user.image}
            title={user.caption}
          />
        </a>
      </div>
    );
  });

  return (
    <Layout>
      <div className="mainContainer">
        <div className="container paddingBottom">
          <div className="wrapper">
            <div className="showcaseSection">
              <div className="prose">
                <h1>See who is using Babel</h1>
                <p>
                  Logos are submitted by company and project representatives.
                  These companies may or may not be using Babel on their main
                  web properties, but they are definitely using it somewhere in
                  their organizations 🙂
                </p>
              </div>
              <hr />
              <div className="logos">{showcase}</div>
              <hr />
              <div className="prose">
                <p>
                  Are you using this project? Please submit a logo of 500x200
                  (2.5x1) run through{" "}
                  <a href="https://jakearchibald.github.io/svgomg/">SVGO</a>
                </p>
                <p>And give us a shout on what you love about Babel!</p>
                <br />
                <a
                  href="https://github.com/babel/website/edit/main/website/data/users.yml"
                  className="button"
                >
                  Submit a Pull Request!
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
