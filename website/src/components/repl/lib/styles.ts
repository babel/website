import { preferDarkColorScheme } from "./utils";

const lightColors = {
  // Inspired by: Chrome's console.error() colors
  errorBackground: "#fff0f0",
  errorBorder: "#ffd6d6",
  errorForeground: "#ff0000",

  foregroundLight: "#aaaaaa",

  // Inspired by: Nuclide's "One Dark" theme
  inverseBackground: "#21252b",
  inverseBackgroundDark: "#181a1f",
  inverseBackgroundLight: "#292d36",
  inverseForeground: "#faffff",
  inverseForegroundLight: "#9da5b4",

  // Inspired by: Chrome's console.warn() colors
  infoBackground: "#fffbe5",
  infoBorder: "#fff5c2",
  infoForeground: "#5c3c00",
};

const darkColors = {
  ...lightColors,

  foregroundLight: "#777777",

  inverseBackground: "#2C3138",
  inverseBackgroundDark: "#1D2025",
  inverseBackgroundLight: "#363942",

  inverseForegroundLight: "#838C9B",
  inverseForeground: "#A7ABB4",
};

const media = {
  small: "@media(max-width: 600px)",
  medium: "@media(min-width: 601px) and (max-width: 1000px)",
  mediumAndDown: "@media(max-width: 1000px)",
  mediumAndUp: "@media(min-width: 601px)",
  large: "@media(min-width: 1001px)",
};
const colors = preferDarkColorScheme() ? darkColors : lightColors;

export { colors, media };
