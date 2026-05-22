import { css } from "@/theme";

export const wrapperClass = css(({ colors, devices }) => ({
  alignContent: "center",
  alignItems: "center",
  backgroundColor: "white",
  borderBottom: `2px solid ${colors.black}`,
  display: "grid",
  gridAutoFlow: "row",
  justifyContent: "space-between",
  marginBottom: 25,
  paddingBlock: "16px 10px",
  position: "sticky",
  rowGap: 8,
  top: 80,
  zIndex: 100,

  "@media": {
    [devices.mobile]: {
      columnGap: 15,
    },

    [devices.tablet]: {
      gridAutoFlow: "column",
      rowGap: 0,
    },
  },
}));

export const titleClass = css(({ devices, fonts }) => ({
  fontSize: 22,
  fontWeight: fonts.bold,

  "@media": {
    [devices.desktop]: {
      fontSize: 26,
      minHeight: 42,
    },
  },
}));

export const layoutClass = css({
  alignContent: "center",
  alignItems: "center",
  columnGap: 20,
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "max-content",
});
