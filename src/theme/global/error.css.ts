import { globalStyle } from "@/theme";

globalStyle(".error", ({ devices }) => ({
  alignContent: "center",
  alignItems: "center",
  display: "grid",
  gridAutoFlow: "row",
  gridTemplateRows: "auto 320px auto",
  height: "100%",
  justifyContent: "center",
  justifyItems: "center",
  paddingInline: 10,
  rowGap: 30,
  width: "100%",

  "@media": {
    [devices.desktopLg]: {
      marginInline: "auto",
      maxWidth: 1300,
      rowGap: 38,
    },

    [devices.desktopXl]: {
      maxWidth: 1400,
    },
  },
}));

globalStyle(".error__image", {
  display: "inline-block",
  height: "100%",
  width: "auto",
});

globalStyle(".error__title", ({ devices, fonts }) => ({
  fontSize: 34,
  fontWeight: fonts.bold,
  lineHeight: 1.2,
  textAlign: "center",

  "@media": {
    [devices.desktop]: {
      fontSize: 36,
    },

    [devices.desktopLg]: {
      fontSize: 42,
    },
  },
}));
