import React, { Component } from "react";

type Props = {
  onFileDrop: (file: File) => void,
};

export default class FileDrop extends Component {
  props: Props;

  render() {
    const  {
      className,
      children,
    } = this.props;

    return (
      <div className={className} onDrop={this._onDrop} onDragOver={this._onDragOver}>
        {children}
      </div>
    );
  }

  _onDrop = (event) => {
    event.preventDefault();

    this.props.onFileDrop(event.dataTransfer.files[0]);
  };

  _onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  };
}
