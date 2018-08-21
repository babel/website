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
  _isMounted = false;
  componentDidMount = () => {
    this._isMounted = true;
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  render() {
    const { transitions, currentTransition } = this.props;
    return (
      <div className={styles.sliderWrapper}>
        <div className={styles.sliderRow}>
          {transitions.map((transition, i) => (
            <div
              className={styles.silderBox}
              key={`${i}-transition`}
              onMouseEnter={this.props.selectTransition(transition)}
            />
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
  }),
  silderBox: css({
    flex: 1,
    width: 0,
    "&:last-child": {
      marginRight: 0,
    },
    borderTop: `1px solid ${colors.inverseBackgroundDark}`,
    borderLeft: `1px solid ${colors.inverseBackgroundDark}`,
    color: colors.inverseForeground,
    fontSize: "0.5rem",
    transition: "background-color 250ms ease-in-out, color 250ms ease-in-out",
    "&:hover": {
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
