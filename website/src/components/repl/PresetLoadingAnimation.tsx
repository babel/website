import * as React from "react";
import styles from "./PresetLoadingAnimation.module.css";

type PresetLoadingAnimationProps = {
  className?: string;
  size?: number;
};

const PresetLoadingAnimation = ({
  className = "",
  size = 2,
}: PresetLoadingAnimationProps) => (
  <div
    className={`${className} ${styles.loadingAnimation}`}
    style={{ "--loading-animation-size": size } as React.CSSProperties}
  >
    <div className={styles.loadingTick} />
    <div className={styles.loadingTick} />
    <div className={styles.loadingTick} />
    <div className={styles.loadingTick} />
    <div className={styles.loadingTick} />
  </div>
);

export default PresetLoadingAnimation;
