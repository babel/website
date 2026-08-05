import React from "react";
import PresetLoadingAnimation from "./PresetLoadingAnimation";

import styles from "./ReplLoading.module.css";

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
