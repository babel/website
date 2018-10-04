// @flow

import React from "react";
import ReactJson from "react-json-view";

type Props = {
  ast: Object,
};

type State = {};

export default class ASTPanel extends React.Component<Props, State> {
  render() {
    const { ast } = this.props;
    return (
      <ReactJson
        src={ast}
        style={{
          overflowY: "scroll",
          width: "100%",
        }}
        shouldCollapse={field => field.name !== "root"}
        enableClipboard={false}
        displayObjectSize={false}
        displayDataTypes={false}
      />
    );
  }
}
