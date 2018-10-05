// @flow

import React from "react";
import ReactJson from "react-json-view";
import { flatten, unflatten, sortedKeys } from "./ASTUtils";

type Props = {
  src: Object,
};

type State = {
  src: Object,
  flattenSrc: Object,
  deleteSrc: Object,
  astOption: {
    autofocus: boolean,
    location: boolean,
    empty: boolean,
    type: boolean,
  },
};

const OPTION_ORDER = ["autofocus", "location", "empty", "type"];

export default class ASTPanel extends React.Component<Props, State> {
  state = {
    src: {},
    flattenSrc: {},
    deleteSrc: {},
    astOption: {
      autofocus: true,
      location: true,
      empty: true,
      type: true,
    },
  };

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const flattenSrc = flatten(nextProps.src);
    if (nextProps.src !== prevState.src) {
      return {
        src: unflatten(flattenSrc),
        flattenSrc: flattenSrc,
      };
    }
    return null;
  }

  onOptionSettingCheck(option: string) {
    this.setState(prevState => ({
      astOption: {
        ...prevState.astOption,
        [option]: !prevState.astOption[option],
      },
    }));
  }

  render() {
    const { src, astOption } = this.state;

    return (
      <div>
        {OPTION_ORDER.map(option => {
          return (
            <label>
              <input
                checked={astOption[option]}
                // className={styles.inputCheckboxLeft}
                type="checkbox"
                onChange={() => this.onOptionSettingCheck(option)}
              />
              {option}
            </label>
          );
        })}
        {src && (
          <ReactJson
            src={src}
            style={{
              overflowY: "scroll",
              width: "100%",
            }}
            shouldCollapse={field => field.name !== "root"}
            enableClipboard={false}
            displayObjectSize={false}
            displayDataTypes={false}
          />
        )}
      </div>
    );
  }
}
