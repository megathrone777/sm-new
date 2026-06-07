import { rgba, style } from "@/theme";

export const layoutClass = style(({ devices }) => ({
  alignContent: "start",
  display: "grid",
  gridTemplateColumns: "1fr",
  height: "100%",
  justifyContent: "start",

  "@media": {
    [devices.tablet]: {
      columnGap: 20,
      gridTemplateColumns: "220px 1fr",
    },

    [devices.desktop]: {
      columnGap: 30,
    },
  },
}));

export const contentClass = style({
  paddingBottom: 20,
  position: "relative",
});

export const burgerWrapperClass = style(({ colors, devices }) => ({
  alignItems: "center",
  backgroundColor: colors.black,
  borderRadius: 8,
  display: "inline-flex",
  height: 44,
  justifyContent: "center",
  marginBottom: 16,
  width: 44,

  "@media": {
    [devices.mobile]: {
      marginBottom: 0,
    },

    [devices.tablet]: {
      display: "none",
    },
  },
}));

export const overlayClass = style(({ colors }) => ({
  backgroundColor: rgba(colors.black, 0.45),
  inset: 0,
  position: "fixed",
  zIndex: 101,
}));
