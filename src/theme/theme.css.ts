import { createTheme } from "@vanilla-extract/css";

import { colors, fonts } from "./variables";

const [themeClass, vars] = createTheme({
  colors,
  easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  fonts,
});

export { themeClass, vars };
