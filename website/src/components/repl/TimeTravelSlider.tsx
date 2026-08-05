import React from "react";
import styles from "./TimeTravelSlider.module.css";

type Props = {
  className?: string;
  currentTransition: any;
  transitions: Array<any>;
  selectTransition: (transition: any) => () => void;
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
                className={styles.sliderBox}
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
