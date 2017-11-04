// @flow

import { css } from "emotion";
import React from "react";

type Props = {
  className: string,
  path: string,
};

const Svg = ({ className, path, ...rest }: Props) => (
  <svg className={`${styles.svg} ${className}`} viewBox="0 0 24 24" {...rest}>
    <path className={styles.path} d={path} />
  </svg>
);

const styles = {
  svg: css({
    height: "1rem",
    width: "1rem",
  }),
  path: css({
    fill: "currentColor",
  }),
};

export default Svg;
