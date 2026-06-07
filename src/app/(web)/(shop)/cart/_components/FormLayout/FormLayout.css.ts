import { createVar } from "@vanilla-extract/css";

import { style } from "@/theme";

export const gridTemplateAreasVar = createVar();

export const wrapperClass = style(({ devices }) => ({
  display: "grid",
  gridAutoFlow: "row",
  rowGap: 20,

  "@media": {
    [devices.tablet]: {
      alignContent: "start",
      alignItems: "start",
      columnGap: 24,
      gridAutoFlow: "unset",
      gridTemplateAreas: gridTemplateAreasVar,
      gridTemplateColumns: "1fr 1fr",
    },

    [devices.desktop]: {
      columnGap: 100,
    },
  },
}));
