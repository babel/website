// @flow

import { css, keyframes } from "emotion";
import * as React from "react";

type PresetLoadingAnimationProps = {
  className?: string,
  size?: number,
};

const PresetLoadingAnimation = ({
  className = "",
  size = 2,
}: PresetLoadingAnimationProps) => (
  <div
    className={`${className} ${styles.loadingAnimation} ${css({
      height: `${size}rem`,
    })}`}
  >
    <div className={`${styles.loadingTick} ${styles.loadingTick1}`} />
    <div className={`${styles.loadingTick} ${styles.loadingTick2}`} />
    <div className={`${styles.loadingTick} ${styles.loadingTick3}`} />
    <div className={`${styles.loadingTick} ${styles.loadingTick4}`} />
    <div className={`${styles.loadingTick} ${styles.loadingTick5}`} />
  </div>
);

export default PresetLoadingAnimation;

const bounce = keyframes({
  "0%": { transform: "scaleY(0.25)" },
  "40%": { transform: "scaleY(0.75)" },
  "80%": { transform: "scaleY(0.25)" },
  "100%": { transform: "scaleY(0.25)" },
});

const styles = {
  loadingAnimation: css({
    display: "flex",
    alignItems: "center",
    marginLeft: "0.5rem",
  }),
  loadingTick: css({
    width: "4px",
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.25)",
    display: "inline-block",
    animationName: bounce,
    animationDuration: "1.4s",
    animationIterationCount: "infinite",
    animationTimingFunction: "ease-in-out",
    marginLeft: "6px",
  }),
  loadingTick1: css({
    animationDelay: 0,
    marginLeft: 0,
  }),
  loadingTick2: css({
    animationDelay: "-1.1s",
  }),
  loadingTick3: css({
    animationDelay: "-1.0s",
  }),
  loadingTick4: css({
    animationDelay: "-0.9s",
  }),
  loadingTick5: css({
    animationDelay: "-0.8s",
  }),
};
