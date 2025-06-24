import React, { lazy } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import ReplLoading from "./ReplLoading";

const Repl = lazy(() => import("./Repl"));

export default () => {
  return (
    <BrowserOnly>
      {() => {
        return (
          <React.Suspense fallback={<ReplLoading />}>
            <Repl />
          </React.Suspense>
        );
      }}
    </BrowserOnly>
  );
};
