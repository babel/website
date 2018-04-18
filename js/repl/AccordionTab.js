// @flow

import { css } from "emotion";
import React from "react";
import Svg from "./Svg";
import { colors, media } from "./styles";

import type { SidebarTabSection } from './types';

type Props = {
  children: React$Element<any>,
  className: ?any,
  isExpanded?: boolean,
  label: React$Element<any> | string,
  onToggleExpanded: () => mixed,
  tabKey: SidebarTabSection,
};

export default class AccordionTab extends React.Component<Props> {
  handleToggle = () => {
    this.props.onToggleExpanded(this.props.tabKey);
  };

  render() {
    const { children, className, isExpanded, label } = this.props;

    return (
      <div className={`${styles.AccordionTab} ${className || ""}`}>
        <div className={styles.HeaderRow} onClick={this.handleToggle}>
          <div className={styles.Label}>{label}</div>
          <Svg
            className={`${styles.Arrow} ${isExpanded
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
        {isExpanded && (
          <div className={styles.Content}>{children}</div>
        )}
      </div>
    )
  }
}

const styles = {
  AccordionTab: css({
    flex: "1 0 1.5rem",
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
    padding: "0.625rem 0.9375rem",
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
    fontWeight: "400",
    fontSize: "0.875rem",
  }),
  Arrow: css({
    height: "1.5rem",
    width: "1.5rem",
    transition: "transform 250ms ease-in-out",
  }),
  ArrowExpanded: css({
    transform: "rotateZ(-90deg)",
  }),
  Content: css({
    display: "flex",
    flexDirection: "column",
    padding: "0rem 0.5rem 0.5rem",
  }),
};
