import { createVar } from "@vanilla-extract/css";

import { css } from "@/theme";

export const gridAreaVar = createVar();

export const wrapperClass = css(({ devices }) => ({
  "@media": {
    [devices.desktop]: {
      gridArea: gridAreaVar,
    },
  },
}));

export const headerClass = css(({ colors, devices }) => ({
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

export const titleClass = css(({ colors, fonts }) => ({
  color: colors.black,
  fontSize: 20,
  fontWeight: fonts.bold,
}));

export const contentClass = css(({ devices }) => ({
  paddingBlock: 10,
  paddingInline: 5,

  "@media": {
    [devices.tablet]: {
      paddingInline: 10,
    },
  },
}));
