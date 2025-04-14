import "core-js";
import { createRoot } from "react-dom/client";

import Repl from "./Repl";

declare const module: {
  hot: {
    accept(path?: string | null, callback?: (() => void) | null): void;
  };
};

createRoot(document.getElementById("root")).render(
  // @ts-expect-error We don't need to import `React`
  <Repl />
);

if (module.hot) {
  module.hot.accept();
}
