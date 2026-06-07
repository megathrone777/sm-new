import { style } from "@/theme";

export const layoutClass = style({
  alignItems: "start",
  display: "grid",
  gridAutoFlow: "row",
  paddingTop: 5,
});

export const rowClass = style({
  marginBottom: 15,

  ":last-of-type": {
    marginBottom: 0,
  },
});

export const labelHolderClass = style({
  display: "grid",
  gridAutoFlow: "column",
  justifyContent: "start",
});

export const labelImageClass = style(({ devices }) => ({
  display: "inline-block",
  height: 25,
  marginRight: 2,
  marginTop: 5,
  width: "auto",

  "@media": {
    [devices.mobile]: {
      height: 35,
    },
  },
}));

export const agreeClass = style({
  alignItems: "center",
  display: "grid",
  gridAutoFlow: "column",
  paddingBlock: 25,
  position: "relative",
});

export const agreeLabelClass = style(({ fonts }) => ({
  display: "block",
  fontSize: 14,
  fontWeight: fonts.normal,
  lineHeight: "normal",
  transform: "translateY(3px)",
}));

export const agreeLinkClass = style({
  color: "inherit",
  textDecoration: "underline",

  ":hover": {
    textDecoration: "none",
  },
});

export const changeClass = style(({ devices }) => ({
  columnGap: 16,
  display: "grid",
  gridAutoFlow: "column",
  justifyContent: "start",

  "@media": {
    [devices.tablet]: {
      columnGap: 20,
    },
  },
}));
