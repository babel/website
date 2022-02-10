/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import Layout from "@theme/Layout";
import Translate, { translate } from "@docusaurus/Translate";
import "../../static/css/error.css";
function NotFound() {
  return (
    <Layout
      title={translate({
        id: "theme.NotFound.title",
        message: "Page Not Found",
      })}
    >
      <div className="error-page">
        <div className="error-message">
          <div className=" error-message-container container">
            <span>404 </span>
            <p>Page Not Found.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default NotFound;
