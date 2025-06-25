import "core-js";
import React from "react";
import Layout from "@theme/Layout";
import Repl from "../components/repl/index";

declare module "@theme/Layout" {
  export interface Props {
    readonly noFooter?: string;
  }
}

export default function () {
  return (
    <div>
      <Layout noFooter="true">
        <div
          id="root"
          style={{ height: "calc(100vh - var(--ifm-navbar-height))" }}
        >
          <Repl />
        </div>
      </Layout>
    </div>
  );
}
