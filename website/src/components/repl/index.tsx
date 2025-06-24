import React, { lazy } from "react";
import PresetLoadingAnimation from "./PresetLoadingAnimation";
import BrowserOnly from "@docusaurus/BrowserOnly";
import { loadingStyles } from "./styles";

const Repl = lazy(() => import("./Repl"));

export default () => {
  return (
    <BrowserOnly>
      {() => {
        return (
          <React.Suspense
            fallback={
              <div className={loadingStyles.loader}>
                <div className={loadingStyles.loaderContent}>
                  Loading Babel...
                  <PresetLoadingAnimation
                    className={loadingStyles.loadingAnimation}
                  />
                </div>
              </div>
            }
          >
            <Repl />
          </React.Suspense>
        );
      }}
    </BrowserOnly>
  );
};
