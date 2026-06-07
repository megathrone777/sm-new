import { createVar, fallbackVar } from "@vanilla-extract/css";

import { style } from "@/theme";

export const gridAreaVar = createVar();
export const orderVar = createVar();

export const wrapperClass = style(({ devices }) => ({
  order: fallbackVar(orderVar, "0"),

  "@media": {
    [devices.tablet]: {
      gridArea: gridAreaVar,
    },
  },
}));

export const headerClass = style(({ colors, devices }) => ({
  borderBottom: `3px solid ${colors.red}`,
  display: "grid",
  gridAutoFlow: "row",
  padding: 5,
  rowGap: 12,

  "@media": {
    [devices.tablet]: {
      alignItems: "center",
      gridAutoFlow: "column",
      justifyContent: "space-between",
      padding: 10,
    },
  },
}));

export const titleClass = style(({ colors, fonts }) => ({
  color: colors.black,
  fontSize: 20,
  fontWeight: fonts.bold,
}));

export const contentClass = style(({ devices }) => ({
  paddingBlock: 10,
  paddingInline: 5,

  "@media": {
    [devices.tablet]: {
      paddingInline: 8,
    },
  },
}));
