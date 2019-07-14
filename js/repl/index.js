// @flow

import "core-js";
import React from "react";
import ReactDOM from "react-dom";

import Repl from "./Repl";

declare var module: {
  hot: {
    accept(path: ?string, callback: ?() => void): void,
  },
};

ReactDOM.render(<Repl />, (document.getElementById("root"): any));

if (module.hot) {
  module.hot.accept();
}
