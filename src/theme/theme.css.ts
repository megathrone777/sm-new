import { createTheme } from "@vanilla-extract/css";

import { animations, colors, fonts } from "./variables";

const [themeClass, vars] = createTheme({
  animations,
  colors,
  easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  fonts,
});

export { themeClass, vars };
