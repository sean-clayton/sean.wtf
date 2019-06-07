import { lighten, transparentize } from "polished";

const colors = {
  primary: "#0077ff",
  primaryLight: lighten(0.1, "#0077ff"),
  primaryXLight: transparentize(0.95, "#0077ff"),
  bg: "#fff",
  grey: {
    dark: "rgba(0, 0, 0, 0.95)",
    default: "rgba(0, 0, 0, 0.8)",
    light: "rgba(0, 0, 0, 0.5)",
    ultraLight: "rgba(0, 0, 0, 0.25)"
  },
  white: "white"
};

const transitions = {
  normal: "0.25s"
};

const fontSize = {
  small: "0.9rem"
};

const fontFamily = {
  monospace: `"dm", "Dank Mono", "Fira Code", Monaco, Consolas, "Ubuntu Mono", monospace`
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
  maxWidth: "45em",
  baseFontSize: "18px"
};

export default theme;
