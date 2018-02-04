// @flow

import React from "react";
import ReactDOM from "react-dom";

import Repl from "./Repl";

ReactDOM.render(<Repl />, document.getElementById("root"));

if (module.hot) {
  // $FlowFixMe
  module.hot.accept();
}
