// @flow

import { css } from "emotion";
import { colors } from "./styles";
import React from "react";
import ReactJson from "react-json-view";
import {
  flatten,
  unflatten,
  filterFlatten,
  deleteFlatten,
  mergeFlatten,
} from "./ASTUtils";

type Props = {
  className?: string,
  src: Object,
};

type State = {
  src: Object,
  flattenSrc: Object,
  flattenType: Object,
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
    flattenType: {},
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
        flattenType: filterFlatten(flattenSrc, "type"),
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

    this.onChangeJson(option);
  }

  onChangeJson(option: string) {
    const { src, astOption, flattenSrc, flattenType } = this.state;
    // const OPTION_ORDER = ["autofocus", "location", "empty", "type"];

    function triggerAstOutput(type) {
      const isShow = astOption[type];
      let newSrc = {};
      const types = {
        autofocus: () => {},
        empty: () => {},
        type: () => {
          if (isShow) {
            newSrc = deleteFlatten(flattenSrc, flattenType);
          } else {
            newSrc = mergeFlatten(flattenSrc, flattenType);
          }
          return newSrc;
        },
        location: () => {
          console.log(isShow, type);
        },
        default: () => {},
      };
      return (types[type] || types["default"])();
    }

    const result = triggerAstOutput(option);
    this.setState({ flattenSrc: result, src: unflatten(result) });
  }

  render() {
    const { src, astOption } = this.state;
    const { className = "" } = this.props;

    return (
      <div className={`${styles.panel} ${className}`}>
        <div>
          {OPTION_ORDER.map(option => {
            return (
              <label>
                <input
                  checked={astOption[option]}
                  type="checkbox"
                  onChange={() => this.onOptionSettingCheck(option)}
                />
                {option}
              </label>
            );
          })}
        </div>
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

const styles = {
  codeMirror: css({
    display: "block",
    height: "100%",
    width: "100%",
    overflow: "auto",
    position: "relative",
  }),
  // error: css({
  //   order: 2,
  //   backgroundColor: colors.errorBackground,
  //   borderTop: `1px solid ${colors.errorBorder}`,
  //   color: colors.errorForeground,
  //   ...sharedBoxStyles,
  // }),
  // info: css({
  //   order: 1,
  //   backgroundColor: colors.infoBackground,
  //   borderTop: `1px solid ${colors.infoBorder}`,
  //   color: colors.infoForeground,
  //   ...sharedBoxStyles,
  // }),
  panel: css({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "stretch",
    overflow: "auto",
  }),
};
