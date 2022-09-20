import "core-js";
import React from "react";
import ReactDOM from "react-dom";

import Repl from "./Repl";

declare var module: {
  hot: {
    accept(path?: string | null, callback?: (() => void) | null): void;
  };
};

ReactDOM.render(<Repl />, document.getElementById("root") as any);

if (module.hot) {
  module.hot.accept();
}
