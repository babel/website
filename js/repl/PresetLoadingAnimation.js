import { css } from "glamor";
import React from "react";

type PresetLoadingAnimationProps = {
  className: ?string,
};

const PresetLoadingAnimation = ({
  className = "",
}: PresetLoadingAnimationProps) =>
  <div className={`${className || ""} ${styles.loadingAnimation}`}>
    <div className={`${styles.loadingTick} ${styles.loadingTick1}`} />
    <div className={`${styles.loadingTick} ${styles.loadingTick2}`} />
    <div className={`${styles.loadingTick} ${styles.loadingTick3}`} />
    <div className={`${styles.loadingTick} ${styles.loadingTick4}`} />
    <div className={`${styles.loadingTick} ${styles.loadingTick5}`} />
  </div>;

export default PresetLoadingAnimation;

const bounce = css.keyframes({
  "0%": { transform: "scaleY(0.25)" },
  "40%": { transform: "scaleY(0.75)" },
  "80%": { transform: "scaleY(0.25)" },
  "100%": { transform: "scaleY(0.25)" },
});

const styles = {
  loadingAnimation: css({
    height: "2rem",
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
