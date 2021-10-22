// @flow

import generate from "@babel/generator";
import type { Transition } from "./types";

type Parent = {
  isProgram: () => boolean,
  parentPath: Parent,
  node: {
    type: string,
  },
};

export default class Transitions {
  _transitions: Array<Transition> = [];

  _getProgramParent = (path: Parent) => {
    let parent = path;
    do {
      if (parent.isProgram()) return parent;
    } while ((parent = parent.parentPath));
  };

  getValue = () => {
    return this._transitions;
  };

  addExitTransition = (code: string) => {
    this._transitions.push({
      code,
      pluginAlias: "output",
      visitorType: "exit",
      size: new Blob([code], { type: "text/plain" }).size,
    });
  };

  wrapPluginVisitorMethod = (
    pluginAlias: any,
    visitorType: any,
    callback: any
  ) => {
    return (...args: any) => {
      const currentNode = args[0].node.type;

      callback.call(this, ...args);

      // $FlowFixMe
      const { code } = generate(this._getProgramParent(args[0]).node);

      if (
        this._transitions.length === 0 ||
        this._transitions[this._transitions.length - 1].code !== code
      ) {
        this._transitions.push({
          code,
          pluginAlias,
          visitorType,
          currentNode,
          size: new Blob([code], { type: "text/plain" }).size,
        });
      }
    };
  };
}
