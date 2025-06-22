import "core-js";
import React, { Suspense, lazy } from "react";
import Layout from "@theme/Layout";
import BrowserOnly from "@docusaurus/BrowserOnly";

const Repl = lazy(() => import("../components/repl/Repl"));

export default function () {
  return (
    <div>
      <Layout>
        <div
          id="root"
          style={{ height: "calc(100vh - var(--ifm-navbar-height))" }}
        >
          <BrowserOnly>
            {() => (
              <Suspense fallback={<div>Loading...</div>}>
                <Repl />
              </Suspense>
            )}
          </BrowserOnly>
        </div>
      </Layout>
    </div>
  );
}
