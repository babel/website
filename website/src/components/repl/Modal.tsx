import styles from "./Modal.module.css";
import React, { Component } from "react";
import { createPortal } from "react-dom";

import type { ReactNode, SyntheticEvent } from "react";

type Props = {
  children: ReactNode;
  onClick?: () => void;
  onClose: () => void;
};

export default class Modal extends Component<Props> {
  static defaultProps = {
    onClose: () => {},
  };

  _node: HTMLDivElement | undefined | null;
  _content: HTMLDivElement | undefined | null;

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

  handleContentClick = (e: SyntheticEvent<any>) => {
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

    const { children, onClick, onClose, ...props } = this.props;

    const result = (
      <React.Fragment>
        <div className={styles.overlay} />
        <div
          className={styles.content}
          onClick={this.handleContentClick}
          ref={(x) => {
            this._content = x;
          }}
          {...props}
        >
          {children}
        </div>
      </React.Fragment>
    );

    return createPortal(result, this._node);
  }
}
