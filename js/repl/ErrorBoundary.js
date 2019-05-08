// @flow

import * as React from "react";
import { css } from "emotion";
import { colors } from "./styles";

type Props = {
  children?: React.Node,
};

type State = {
  error: ?Error,
};

export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = {
    error: null,
  };

  componentDidCatch(error: Error) {
    this.setState({ error });
  }

  render() {
    if (this.state.error) {
      return (
        <div className={styles.errorBoundary}>
          An unexpected error occurred. :(
        </div>
      );
    }
    return this.props.children || null;
  }
}

const styles = {
  errorBoundary: css({
    alignItems: "center",
    background: colors.inverseBackgroundDark,
    color: colors.inverseForegroundLight,
    display: "flex",
    height: "100vh",
    justifyContent: "center",
  }),
};
