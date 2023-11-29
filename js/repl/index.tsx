import "core-js";
import { createRoot } from "react-dom/client";

import Repl from "./Repl";

declare var module: {
  hot: {
    accept(path?: string | null, callback?: (() => void) | null): void;
  };
};

createRoot(document.getElementById("root")).render(<Repl/>);

if (module.hot) {
  module.hot.accept();
}
