import React from "react";
import { css } from "@emotion/css";

import PresetLoadingAnimation from "./PresetLoadingAnimation";
import { colors } from "./lib/styles";

const styles = {
  loader: css({
    alignItems: "center",
    background: colors.inverseBackgroundDark,
    color: colors.inverseForegroundLight,
    display: "flex",
    height: "100%",
    justifyContent: "center",
  }),
  loadingAnimation: css({
    justifyContent: "center",
    margin: "2rem 0 0 0",
  }),
  loaderContent: css({
    margin: "auto",
    textAlign: "center",
  }),
};

export default ({
  message = "Loading Babel...",
  hasError,
}: {
  message?: string;
  hasError?: boolean;
}) => {
  return (
    <div className={styles.loader}>
      <div className={styles.loaderContent}>
        {message}
        {!hasError && (
          <PresetLoadingAnimation className={styles.loadingAnimation} />
        )}
      </div>
    </div>
  );
};
