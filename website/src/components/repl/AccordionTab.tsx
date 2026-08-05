import * as React from "react";
import Svg from "./Svg";
import styles from "./AccordionTab.module.css";

import type { SidebarTabSection } from "./lib/types";

import type { ReactElement } from "react";

type Props = {
  children: React.ReactNode;
  className: any | undefined | null;
  isExpanded?: boolean;
  label: ReactElement<any> | string;
  onToggleExpanded: (key: SidebarTabSection) => unknown;
  tabKey: SidebarTabSection;
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
          <Svg
            className={`${styles.Arrow} ${
              isExpanded ? styles.ArrowExpanded : ""
            }`}
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
          <div className={styles.Label}>{label}</div>
        </div>
        {isExpanded && <div className={styles.Content}>{children}</div>}
      </div>
    );
  }
}
