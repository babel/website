// @flow
import { css, keyframes } from "emotion";
import React, { Component } from "react";
import ReactDOM from "react-dom";

type Props = {
  children: React$Node,
  onClick?: () => void,
  onClose: () => void,
};

export default class Modal extends Component<Props> {
  static defaultProps = {
    onClose: () => {},
  };

  _node: ?HTMLDivElement;
  _content: ?HTMLDivElement;

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeydown);

    if (!document.body) return;

    const width = document.body.clientWidth;

    document.body.style.overflow = "hidden";
    document.body.style.width = `${width}px`;
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeydown);

    if (document.body) {
      document.body.style.overflow = "";
      document.body.style.width = "";
    }

    if (this._node && document.body) {
      document.body.removeChild(this._node);
    }

    this._node = null;

    this.props.onClose();
  }

  handleKeydown = (e: KeyboardEvent) => {
    if (e.keyCode === /* esc */ 27) {
      this.props.onClose();
    }
  };

  handleContentClick = (e: SyntheticEvent<*>) => {
    if (e.target !== this._content) return;

    this.props.onClose();
  };

  render() {
    if (!this._node) {
      this._node = document.createElement("div");

      if (document.body) {
        document.body.appendChild(this._node);
      }
    }

    // eslint-disable-next-line no-unused-vars
    const { children, onClick, onClose, ...props } = this.props;

    const result = (
      <React.Fragment>
        <div className={styles.overlay} />
        <div
          className={styles.content}
          onClick={this.handleContentClick}
          ref={x => (this._content = x)}
          {...props}
        >
          {children}
        </div>
      </React.Fragment>
    );

    return ReactDOM.createPortal(result, this._node);
  }
}

// STYLES

const modalFadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const styles = {
  overlay: css`
    animation: ${modalFadeIn} 175ms ease 1 forwards;
    background-color: rgba(0, 0, 0, 0.75);
    cursor: pointer;
    height: 100%;
    opacity: 0;
    position: fixed;
    right: 0;
    top: 0;
    width: 100%;
    z-index: 10000;
  `,
  content: css`
    animation: ${modalFadeIn} 175ms ease 1 forwards;
    background: transparent;
    height: 100%;
    overflow-y: auto;
    position: fixed;
    right: 0;
    top: 0;
    width: 100%;
    z-index: 10001;
  `,
};
