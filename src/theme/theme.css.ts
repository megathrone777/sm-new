import { createTheme } from "@vanilla-extract/css";

import { colors, fonts } from "./variables";

const [themeClass, vars] = createTheme({
  colors,
  fonts,
});

export { themeClass, vars };
