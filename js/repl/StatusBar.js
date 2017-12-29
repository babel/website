import { css } from "emotion";
import React from "react";
import { colors } from "./styles";

type Props = {
  status: Object,
};
export default function StatusBar(props: Props) {
  const { status } = props;
  return (
    <div className={styles.statusBar}>
      {Object.keys(status).map(key => (
        <span key={key} className={styles.statusItem}>
          {key}: {status[key]}
        </span>
      ))}
    </div>
  );
}

const styles = {
  statusBar: css({
    backgroundColor: colors.inverseBackground,
    color: colors.inverseForegroundLight,
    order: 2,
    borderTop: `1px solid ${colors.infoBorder}`,
    flex: "0 0 auto",
    maxHeight: "33%",
    overflow: "auto",
    margin: 0,
    padding: "0.5rem 0.75rem",
    whiteSpace: "pre-wrap",
    "-webkit-overflow-scrolling": "touch",
  }),
  statusItem: css({
    marginLeft: "5px",
  }),
};
