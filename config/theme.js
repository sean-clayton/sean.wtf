import { lighten, transparentize, darken } from "polished";

const colors = {
  primary: "#0077ff",
  primaryLight: lighten(0.1, "#0077ff"),
  primaryDark: darken(0.05, "#0077ff"),
  primaryXDark: darken(0.3, "#0077ff"),
  primaryXLight: transparentize(0.95, "#0077ff"),
  bg: "#fff",
  grey: {
    dark: "rgba(0, 0, 0, 0.95)",
    default: "rgba(0, 0, 0, 0.8)",
    light: "rgba(0, 0, 0, 0.5)",
    ultraLight: "rgba(0, 0, 0, 0.25)"
  },
  white: "white",
  black: "black",
  text: "#333"
};

const transitions = {
  normal: "0.25s"
};

const fontSize = {
  small: "0.9rem"
};

const fontFamily = {
  serif: `"Georgia", serif`,
  monospace: `SFMono-Regular, Menlo, Monaco, "Cascadia Code", Consolas, "Liberation Mono", "Courier New", monospace`
};

const breakpoints = {
  tablet: "1200px",
  phone: "600px"
};

const theme = {
  colors,
  transitions,
  fontSize,
  breakpoints,
  fontFamily,
  maxWidth: "100ch",
  baseFontSize: "16px"
};

export default theme;
