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
  flattenEmpty: Object,
  flattenSrc: Object,
  flattenType: Object,
  flattenLocation: Object,
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
    flattenEmpty: {},
    flattenSrc: {},
    flattenType: {},
    flattenLocation: {},
    astOption: {
      autofocus: true,
      location: true,
      empty: true,
      type: true,
    },
  };

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (nextProps.src) {
      if (nextProps.src !== prevState.src) {
        const flattenSrc = flatten(nextProps.src);
        return {
          src: nextProps.src,
          flattenSrc: flattenSrc,
          flattenType: filterFlatten(flattenSrc, "type"),
          flattenLocation: {
            ...filterFlatten(flattenSrc, "start"),
            ...filterFlatten(flattenSrc, "end"),
          },
          flattenEmpty: filterFlatten(flattenSrc, null, "null"),
        };
      }
    }
  }

  _onOptionSettingCheck(option: string) {
    this.setState(prevState => ({
      astOption: {
        ...prevState.astOption,
        [option]: !prevState.astOption[option],
      },
    }));
    this._onChangeJson(option);
  }

  _onChangeJson(option: string) {
    const {
      astOption,
      flattenEmpty,
      flattenSrc,
      flattenType,
      flattenLocation,
    } = this.state;

    function triggerAstOutput(type) {
      const isShow = astOption[type];
      let newSrc = {};
      const types = {
        autofocus: () => {},
        empty: () => {
          newSrc = isShow
            ? deleteFlatten(flattenSrc, flattenEmpty)
            : mergeFlatten(flattenSrc, flattenEmpty);
          return newSrc;
        },
        type: () => {
          newSrc = isShow
            ? deleteFlatten(flattenSrc, flattenType)
            : mergeFlatten(flattenSrc, flattenType);
          return newSrc;
        },
        location: () => {
          newSrc = isShow
            ? deleteFlatten(flattenSrc, flattenLocation)
            : mergeFlatten(flattenSrc, flattenLocation);
          return newSrc;
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
          {OPTION_ORDER.map(option => (
            <label>
              <input
                checked={astOption[option]}
                type="checkbox"
                onChange={() => this._onOptionSettingCheck(option)}
              />
              {option}
            </label>
          ))}
        </div>
        {src && (
          <ReactJson
            src={src}
            style={{
              overflowY: "scroll",
              width: "100%",
            }}
            sortKeys={true}
            enableClipboard={false}
            displayObjectSize={true}
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
