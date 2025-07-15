import LZString from "lz-string";

import type { ReplState } from "./types";

const URL_KEYS = [
  "browsers",
  "build",
  "builtIns",
  "corejs",
  "spec",
  "loose",
  "config",
  "code",
  "debug",
  "forceAllTransforms",
  "modules",
  "shippedProposals",
  "evaluate",
  "fileSize",
  "timeTravel",
  "sourceType",
  "lineWrap",
  "presets",
  "prettier",
  "targets",
  "version",
  "externalPlugins",
  "assumptions",
];

const compress = (string: string) =>
  LZString.compressToBase64(string)
    .replace(/\+/g, "-") // Convert '+' to '-'
    .replace(/\//g, "_") // Convert '/' to '_'
    .replace(/=+$/, ""); // Remove ending '='

const decompress = (string: string) =>
  LZString.decompressFromBase64(
    string
      .replace(/-/g, "+") // Convert '-' to '+'
      .replace(/_/g, "/") // Convert '_' to '/'
  );

const encode = (value: any) => window.encodeURIComponent(value);

const decode = (value: any) => {
  try {
    return window.decodeURIComponent("" + value);
  } catch (_) {
    return value;
  }
};

const mergeDefinedKeys = (raw: any, keys: Array<string>, target: any) => {
  keys.forEach((key) => {
    if (raw[key] != null) {
      target[key] = raw[key];
    }
  });
};

const parseQuery = () => {
  const raw = document.location.hash
    .replace(/^#\?/, "")
    .split("&")
    .reduce((reduced: any, pair: string) => {
      const pieces = pair.split("=");
      const name = decodeURIComponent("" + pieces[0]);

      let value: string | boolean = decodeURIComponent("" + pieces[1]);
      if (value === "true" || value === "false") {
        value = value === "true";
      }

      reduced[name] = value;
      return reduced;
    }, {});

  const state: { code?: string; config?: string } = {};

  mergeDefinedKeys(raw, URL_KEYS, state);

  if (raw.code_lz != null) {
    state.code = decompress(raw.code_lz || "");
  }
  if (raw.config_lz != null) {
    state.config = decompress(raw.config_lz || "");
  }

  return state;
};

const updateQuery = (state: ReplState) => {
  const query = URL_KEYS.map((key) => {
    const value = state[key];
    if (
      value == null ||
      value == "" ||
      (typeof value === "object" && Object.keys(value).length === 0)
    ) {
      return null;
    } else if (key === "code" || key === "config") {
      return `${key}_lz=` + compress(value);
    } else {
      return key + "=" + encode(value);
    }
  })
    .filter(Boolean)
    .join("&");

  window.location.hash = "?" + query;
};

export default {
  compress,
  decode,
  decompress,
  encode,
  parseQuery,
  updateQuery,
};
