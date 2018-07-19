// @flow

import { css } from "emotion";
import React from "react";
import { colors } from "./styles";

type Props = {
  className?: string,
  transitions: Array<Object>,
};

type State = {
  current: Object,
};

type SelectTransition = {
  code: string,
  currentNode: string,
  pluginAlias: string,
  visitorType: string,
};

class TimeTravelSlider extends React.Component<Props, State> {
  _isMounted = false;
  constructor(props: Props) {
    super(props);
    this.state = {
      current: {},
    };

    this.handleMouse = this.handleMouse.bind(this);
  }

  componentDidMount = () => {
    this._isMounted = true;
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  handleMouse = (transition: SelectTransition) => {
    this.setState({ current: transition });
  };

  render() {
    const { transitions } = this.props;
    const { current } = this.state;
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
                    transition && this.handleMouse(transition)}
                />
              );
            })}
        </div>
        <StatusBar
          pluginAlias={current.pluginAlias}
          visitorType={current.visitorType}
          currentNode={current.currentNode}
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
