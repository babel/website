// @flow

import { css } from "emotion";
import React from "react";
import { colors } from "./styles";

type Props = {
  className?: string,
  currentTransition: Object,
  transitions: Array<Object>,
  selectTransition: (transition: Object) => () => void,
};

class TimeTravelSlider extends React.Component<Props> {
  render() {
    const { transitions, currentTransition } = this.props;
    //if (!transitions.length) return null;
    return (
      <div className={styles.sliderWrapper}>
        <div className={styles.sliderRow}>
          {transitions &&
            transitions.map((transition, i) => (
              <div
                className={styles.silderBox}
                key={`${i}-transition`}
                onMouseEnter={this.props.selectTransition(transition)}
              >
                {i == 0 ? "Original" : i}
              </div>
            ))}
        </div>
        <StatusBar
          pluginAlias={currentTransition.pluginAlias}
          visitorType={currentTransition.visitorType}
          currentNode={currentTransition.currentNode}
        />
      </div>
    );
  }
}

const StatusBar = ({
  pluginAlias = "",
  visitorType = "",
  currentNode = "",
}) => {
  return (
    <div className={styles.statusBar}>
      <div>
        Current Plugin:
        <span className={styles.option}>{`${pluginAlias}`}</span>
      </div>
      <div className={styles.info}>
        Current Visitor:
        <span className={styles.option}>{`${currentNode} ${visitorType}`}</span>
      </div>
    </div>
  );
};

export default TimeTravelSlider;

const styles = {
  sliderWrapper: css({
    height: "15%",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    backgroundColor: colors.inverseBackgroundDark,
  }),
  sliderRow: css({
    display: "flex",
    flex: "1 auto",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "stretch",
    width: "100%",
    position: "relative",
    background: colors.inverseBackground,
    padding: "0 0.25rem",
  }),
  silderBox: css({
    flex: 1,
    width: 0,
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    margin: "0.5rem 0.25rem",
    background: colors.inverseBackgroundLight,
    color: colors.inverseForegroundLight,
    fontSize: "0.65rem",
    transition: "background-color 250ms ease-in-out, color 250ms ease-in-out",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: colors.inverseBackgroundDark,
    },
  }),
  info: css({
    marginLeft: "30px",
  }),
  statusBar: css({
    display: "flex",
    flexDirection: "row",
    padding: "0.625rem 0.9375rem",
    justifyContent: "flex-start",
    margin: 0,
    fontFamily: "monospace",
    fontSize: "0.75rem",
    fontWeight: "normal",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    backgroundColor: colors.inverseBackgroundDark,
    color: colors.inverseForegroundLight,
  }),
  option: css({
    color: colors.infoBorder,
    paddingLeft: "10px",
  }),
};
