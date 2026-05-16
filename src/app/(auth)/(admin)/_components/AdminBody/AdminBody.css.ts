import { css } from "@/theme";

export const layoutClass = css(({ devices }) => ({
  alignContent: "start",
  display: "grid",
  gridTemplateColumns: "1fr",
  height: "100%",
  justifyContent: "start",

  "@media": {
    [devices.tablet]: {
      columnGap: 30,
      gridTemplateColumns: "220px 1fr",
    },
  },
}));

export const contentClass = css({
  paddingBottom: 20,
  position: "relative",
});

export const burgerWrapperClass = css(({ colors, devices }) => ({
  alignItems: "center",
  backgroundColor: colors.black,
  borderRadius: 8,
  display: "inline-flex",
  height: 44,
  justifyContent: "center",
  marginBottom: 16,
  width: 44,

  "@media": {
    [devices.tablet]: {
      display: "none",
    },
  },
}));

export const overlayClass = css({
  backgroundColor: "rgba(0,0,0,0.45)",
  bottom: 0,
  left: 0,
  position: "fixed",
  right: 0,
  top: 0,
  zIndex: 98,
});
