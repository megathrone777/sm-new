import { css } from "@/theme";

export const layoutClass = css({
  alignItems: "start",
  display: "grid",
  gridAutoFlow: "row",
  paddingTop: 5,
});

export const rowClass = css({
  marginBottom: 15,

  ":last-of-type": {
    marginBottom: 0,
  },
});

export const labelHolderClass = css({
  display: "grid",
  gridAutoFlow: "column",
});

export const labelImageClass = css(({ devices }) => ({
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

export const agreeClass = css({
  alignItems: "center",
  display: "grid",
  gridAutoFlow: "column",
  paddingBlock: 25,
  position: "relative",
});

export const agreeLabelClass = css(({ fonts }) => ({
  display: "block",
  fontSize: 14,
  fontWeight: fonts.normal,
  lineHeight: "normal",
  transform: "translateY(3px)",
}));

export const agreeLinkClass = css({
  color: "inherit",
  textDecoration: "underline",

  ":hover": {
    textDecoration: "none",
  },
});

export const changeClass = css(({ devices }) => ({
  columnGap: 12,
  display: "grid",
  gridAutoFlow: "column",
  justifyContent: "start",

  "@media": {
    [devices.tablet]: {
      columnGap: 20,
    },
  },
}));
