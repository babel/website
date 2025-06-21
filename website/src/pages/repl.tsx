import "core-js";
import React from "react";
import Layout from "@theme/Layout";
import Repl from "../components/repl/Repl";

export default function () {
  return (
    <div>
      <Layout>
        <div
          id="root"
          style={{ height: "calc(100vh - var(--ifm-navbar-height))" }}
        >
          <Repl></Repl>
        </div>
      </Layout>
    </div>
  );
}
