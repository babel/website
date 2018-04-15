// @flow
import React from "react";
import { css } from "emotion";
import PresetLoadingAnimation from "./PresetLoadingAnimation";
import { colors } from "./styles";

type Props = {
  isLoading: boolean,
  message: string,
};

const ReplLoader = ({ isLoading, message }: Props) => {
  return (
    <div className={styles.loader}>
      <div className={styles.loaderContent}>
        {message}
        {isLoading && (
          <PresetLoadingAnimation className={styles.loadingAnimation} />
        )}
      </div>
    </div>
  );
};

const styles = {
  loader: css({
    alignItems: "center",
    background: colors.inverseBackgroundDark,
    color: colors.inverseForegroundLight,
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    width: "100vw",
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

export default ReplLoader;
