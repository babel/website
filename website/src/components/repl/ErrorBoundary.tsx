import * as React from "react";
import styles from "./ErrorBoundary.module.css";

type Props = {
  children?: React.JSX.Element;
};

type State = {
  error: Error | undefined | null;
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
