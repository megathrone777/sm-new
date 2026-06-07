import { style } from "@/theme";

export const wrapperClass = style(({ colors }) => ({
  alignContent: "center",
  alignItems: "center",
  backgroundColor: colors.black,
  display: "grid",
  gridAutoFlow: "column",
  height: 80,
  justifyContent: "space-between",
  padding: "4px 16px",
  position: "sticky",
  top: 0,
  zIndex: 105,
}));

export const layoutClass = style({
  alignContent: "center",
  alignItems: "center",
  columnGap: 30,
  display: "grid",
  gridAutoFlow: "column",
  justifyContent: "end",
});

export const logoLinkClass = style({
  display: "block",
  height: "90%",
  overflow: "hidden",
});

export const imageClass = style({
  display: "block",
  height: "100%",
});

export const buttonClass = style({
  boxShadow: "none",
});

export const buttonLabelClass = style(({ devices }) => ({
  display: "none",

  "@media": {
    [devices.tablet]: {
      display: "inline-grid",
    },
  },
}));

export const buttonIconClass = style(({ devices }) => ({
  display: "inline-block",
  height: 20,

  "@media": {
    [devices.tablet]: {
      display: "none",
    },
  },
}));
