import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import versions from "../../past-versions.json";

const Versions = () => {
  const { siteConfig } = useDocusaurusContext();
  const { customFields } = siteConfig;
  const latestVersion = versions[0];
  const repoUrl = `https://github.com/${customFields.organizationName}/${
    customFields.projectName
  }`;
  return (
    <Layout>
      <div className="docMainWrapper wrapper">
        <div className="mainContainer versionsContainer">
          <div className="post">
            <header className="postHeader">
              <h2>{siteConfig.title + " Versions"}</h2>
            </header>
            <p>New versions of this project are released periodically.</p>
            <a name="latest" />
            <h3>Current version (Stable)</h3>
            <table className="versions">
              <tbody>
                <tr>
                  <th>{latestVersion}</th>
                  <td>
                    <a href={customFields.baseUrl + "docs/" + "index.html"}>
                      Documentation
                    </a>
                  </td>
                  <td>
                    <a href={`${repoUrl}/releases/tag/v${latestVersion}`}>
                      Release Notes
                    </a>
                  </td>
                  <td>
                    <a href={`${customFields.baseUrl}${latestVersion}`}>
                      Blog Post
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
            <p>This is the current stable version of the project.</p>
            <a name="rc" />
            <h3>Pre-release versions</h3>
            <p>These are the latest changes that have yet to be released.</p>
            <table className="versions">
              <tbody>
                <tr>
                  <th>main</th>
                  <td>
                    <a
                      href={
                        customFields.baseUrl + "docs/" + "next" + "/index.html"
                      }
                    >
                      Documentation
                    </a>
                  </td>
                  <td>
                    <a href={repoUrl}>Source Code</a>
                  </td>
                </tr>
              </tbody>
            </table>
            {versions && versions.length > 1 && (
              <div>
                <a name="archive" />
                <h3>Past Versions</h3>
                <table className="versions">
                  <tbody>
                    {versions.map(
                      version =>
                        version !== latestVersion && (
                          <tr key={version}>
                            <th>{version}</th>
                            <td>
                              <a
                                href={
                                  customFields.baseUrl +
                                  "docs/" +
                                  "/" +
                                  version +
                                  "/index.html"
                                }
                              >
                                Documentation
                              </a>
                            </td>
                            <td>
                              <a href={`${repoUrl}/releases/tag/v${version}`}>
                                Release Notes
                              </a>
                            </td>
                            <td>
                              <a href={`${customFields.baseUrl}${version}`}>
                                Blog Post
                              </a>
                            </td>
                          </tr>
                        )
                    )}
                    <tr>
                      <th>6.26.3</th>
                      <td>
                        <a href={customFields.v6Url}>Documentation</a>
                      </td>
                      <td>
                        <a href={`${repoUrl}/releases/tag/v6.26.3`}>
                          Release Notes
                        </a>
                      </td>
                      <td>
                        <a href={`${customFields.baseUrl}6.23.0`}>Blog Post</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Versions;
