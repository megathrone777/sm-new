import { rgba, style } from "@/theme";

export const wrapperClass = style(({ colors, devices }) => ({
  backgroundImage: "url('/images/products_bg.jpg')",
  backgroundSize: "50% auto",
  borderTop: `3px solid ${colors.red}`,
  overflow: "hidden",
  paddingBlock: 40,
  position: "relative",
  textAlign: "center",

  "@media": {
    [devices.tablet]: {
      paddingBlock: 60,
    },
  },
}));

export const titleClass = style(({ devices }) => ({
  fontSize: 28,
  fontWeight: "700",
  letterSpacing: 1,
  marginBottom: 40,
  textAlign: "center",

  "@media": {
    [devices.tablet]: {
      fontSize: 40,
    },
  },
}));

export const listClass = style(({ devices }) => ({
  display: "grid",
  gridAutoFlow: "row",
  justifyContent: "stretch",
  justifyItems: "center",
  marginBottom: 40,
  rowGap: 20,

  "@media": {
    [devices.tablet]: {
      columnGap: 10,
      gridAutoFlow: "column",
      marginBottom: 60,
    },

    [devices.desktop]: {
      columnGap: 40,
    },

    [devices.desktopLg]: {
      columnGap: 75,
    },
  },
}));

export const itemClass = style(({ colors }) => ({
  backgroundColor: "white",
  borderRadius: 15,
  boxShadow: `0 0 10px 0 ${rgba(colors.black, 0.1)}`,
  maxWidth: 380,
  paddingBlock: "35px 30px",
  width: "100%",
}));

export const textClass = style({
  fontWeight: "500",
  marginBottom: 15,
  textAlign: "center",
});

export const countClass = style({
  fontWeight: "500",
  marginBottom: 5,
  textAlign: "center",
});

export const linkClass = style(({ colors }) => ({
  color: colors.red,
  fontSize: 18,
  fontWeight: "500",

  ":hover": {
    textDecoration: "underline",
  },
}));

export const buttonsClass = style({
  display: "flex",
  justifyContent: "center",
});

export const imageClass = style({
  marginBottom: 10,
  marginInline: "auto",
  maxHeight: 100,
});

export const starsHelperClass = style({
  backgroundImage: "url('/images/rating_img.jpg')",
  backgroundPositionX: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "auto 100%",
  display: "block",
  height: 21,
  margin: "0 auto 15px",
  maxWidth: 120,
  minHeight: 21,
});
