// @flow

import { css } from "emotion";
import React from "react";
import { colors } from "./styles";

type Props = {
  className?: string,
  currentTransition: Object,
  transitions: Array<Object>,
  selectTransition: (transition: Object) => void,
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
    console.log(currentTransition.code);
    return (
      <div>
        <div className={styles.timeTravelSlider}>
          {transitions &&
            transitions.map((transition, i) => {
              return (
                <div
                  className={styles.silderBox}
                  key={`${i}-transition`}
                  onMouseEnter={() =>
                    transition && this.props.selectTransition(transition)}
                />
              );
            })}
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
  timeTravelSlider: css({
    display: "flex",
    flexDirection: "row",
    justifyContent: "stretch",
    height: "50px",
    width: "100%",
    position: "relative",
    background: colors.inverseBackground,
  }),
  silderBox: css({
    borderTop: `1px solid ${colors.inverseBackgroundDark}`,
    borderLeft: `1px solid ${colors.inverseBackgroundDark}`,
    width: "100%",
    height: "50px",
    transition: "background-color 250ms ease-in-out, color 250ms ease-in-out",
    "&:hover": {
      backgroundColor: colors.inverseBackgroundDark,
      color: colors.inverseForeground,
    },
  }),
  info: css({
    marginLeft: "30px",
  }),
  statusBar: css({
    display: "flex",
    flexDirection: "row",
    justifyContent: "stretch",
    padding: "0.625rem 0.9375rem",
    margin: 0,
    fontFamily: "monospace",
    fontSize: "0.75rem",
    fontWeight: "normal",
    backgroundColor: colors.inverseBackgroundDark,
    color: colors.inverseForegroundLight,
  }),
  option: css({
    color: colors.infoBorder,
    paddingLeft: "10px",
  }),
};
