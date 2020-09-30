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
  <div className={`${className} ${styles.loadingAnimation(size)}`}>
    <div className={styles.loadingTick(size)} />
    <div className={styles.loadingTick(size)} />
    <div className={styles.loadingTick(size)} />
    <div className={styles.loadingTick(size)} />
    <div className={styles.loadingTick(size)} />
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
  loadingAnimation: (size: number) =>
    css({
      alignItems: "center",
      display: "flex",
      height: `${size}rem`,
      marginLeft: "0.5rem",
    }),
  loadingTick: (size: number) => {
    return css({
      animation: `1.4s ${bounce} infinite ease-in-out`,
      backgroundColor: "rgba(255,255,255,0.25)",
      display: "inline-block",
      height: "100%",
      marginLeft: `${2 + (size - 1) * 2}px`,
      width: `${size * 2}px`,

      ":nth-child(1)": { animationDelay: 0, marginLeft: 0 },
      ":nth-child(2)": { animationDelay: "-1.1s" },
      ":nth-child(3)": { animationDelay: "-1.0s" },
      ":nth-child(4)": { animationDelay: "-0.9s" },
      ":nth-child(5)": { animationDelay: "-0.8s" },
    });
  },
};
