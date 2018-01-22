// @flow

import { css } from "emotion";
import React from "react";
import Svg from "./Svg";
import { colors, media } from "./styles";

type Props = {
  children: React$Element<any>,
  className: ?any,
  isExpanded?: boolean,
  label: React$Element<any> | string,
  toggleIsExpanded: Function,
};

export default function AccordionTab(props: Props) {
  return (
    <div className={`${styles.AccordionTab} ${props.className || ""}`}>
      <div className={styles.HeaderRow} onClick={props.toggleIsExpanded}>
        <div className={styles.Label}>{props.label}</div>
        <Svg
          className={`${styles.Arrow} ${props.isExpanded
            ? styles.ArrowExpanded
            : ""}`}
          path="
            M15.41,16.58
            L10.83,12
            L15.41,7.41
            L14,6
            L8,12
            L14,18
            L15.41,16.58
            Z"
        />
      </div>
      {props.isExpanded && (
        <div className={styles.Content}>{props.children}</div>
      )}
    </div>
  );
}

const styles = {
  AccordionTab: css({
    flex: "1 0 2.5rem",
    cursor: "default",
    borderBottom: `1px solid ${colors.inverseBackgroundDark}`,
    userSelect: "none",

    [media.medium]: {
      borderRight: `1px solid ${colors.inverseBackgroundDark}`,
    },
  }),
  HeaderRow: css({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "1rem 1.5rem",
    transition: "background-color 250ms ease-in-out, color 250ms ease-in-out",
    color: colors.inverseForegroundLight,
    cursor: "pointer",

    "&:hover": {
      backgroundColor: colors.inverseBackgroundLight,
      color: colors.inverseForeground,
    },
  }),
  Label: css({
    flex: "1",
    fontSize: "1.5rem",
    fontWeight: "bold",
  }),
  Arrow: css({
    height: "2rem",
    width: "2rem",
    transition: "transform 250ms ease-in-out",
  }),
  ArrowExpanded: css({
    transform: "rotateZ(-90deg)",
  }),
  Content: css({
    display: "flex",
    flexDirection: "column",
    padding: "1rem 1.5rem",
  }),
};
