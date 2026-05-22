import { css } from "@/theme";

export const wrapperClass = css(({ colors }) => ({
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
  zIndex: 100,
}));

export const layoutClass = css({
  alignContent: "center",
  alignItems: "center",
  columnGap: 30,
  display: "grid",
  gridAutoFlow: "column",
  justifyContent: "end",
});

export const logoLinkClass = css({
  display: "block",
  height: "90%",
  overflow: "hidden",
});

export const imageClass = css({
  display: "block",
  height: "100%",
});

export const buttonClass = css({
  boxShadow: "none",
});

export const buttonLabelClass = css(({ devices }) => ({
  display: "none",

  "@media": {
    [devices.tablet]: {
      display: "inline-grid",
    },
  },
}));

export const buttonIconClass = css(({ devices }) => ({
  display: "inline-block",
  height: 20,

  "@media": {
    [devices.tablet]: {
      display: "none",
    },
  },
}));
