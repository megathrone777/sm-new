import { style } from "@/theme";

export const wrapperClass = style(({ devices }) => ({
  padding: "20px 8px 30px",

  "@media": {
    [devices.mobile]: {
      paddingTop: 30,
    },
  },
}));

export const layoutClass = style(({ devices }) => ({
  alignItems: "start",
  display: "grid",
  gridAutoFlow: "row",
  justifyItems: "stretch",
  marginBottom: 25,
  rowGap: 10,

  "@media": {
    [devices.desktop]: {
      gridAutoFlow: "column",
      gridTemplateColumns: "repeat(3, 1fr)",
      justifyContent: "space-around",
    },
  },
}));

export const contentClass = style(({ devices }) => ({
  display: "grid",
  gridAutoFlow: "row",
  marginBottom: 15,

  selectors: {
    "&:first-of-type": {
      justifyItems: "start",
      justifySelf: "stretch",
      order: 1,
      width: "100%",
    },

    "&:last-of-type": {
      marginBottom: 0,
      order: 2,

      "@media": {
        [devices.tablet]: {
          order: 3,
        },
      },
    },

    "&:nth-of-type(2)": {
      order: 3,

      "@media": {
        [devices.tablet]: {
          order: 2,
        },
      },
    },
  },
  textAlign: "left",
}));

export const titleClass = style(({ devices, fonts }) => ({
  fontSize: 24,
  fontWeight: fonts.medium,
  lineHeight: 1.2,
  marginBottom: 15,
  textAlign: "center",
  textWrap: "balance",

  "@media": {
    [devices.tablet]: {
      fontSize: 36,
      marginBottom: 30,
    },
  },
}));

export const subtitleClass = style({
  textWrap: "balance",
  wordBreak: "break-word",
});

export const imageHolderClass = style({
  height: "auto",
  marginInline: "auto",
  maxWidth: 260,
  position: "relative",
  textAlign: "center",
  width: "100%",
});

export const linkClass = style({
  display: "block",
  height: "100%",
});

export const imageClass = style({
  height: "100%",
  marginInline: "auto",
  width: "auto",
});

export const itemClass = style({
  alignItems: "start",
  columnGap: 6,
  display: "inline-grid",
  fontSize: 18,
  gridAutoFlow: "column",
  marginBottom: 10,
});

export const itemLinkClass = style(({ colors, easing }) => ({
  color: colors.black,
  transition: `color .25s ${easing}`,

  ":hover": {
    color: colors.red,
  },
}));

export const labelClass = style(({ fonts }) => ({
  fontWeight: fonts.demi,
  lineHeight: "26px",
}));

export const valueClass = style(({ devices, fonts }) => ({
  fontWeight: fonts.normal,

  "@media": {
    [devices.desktopLg]: {
      whiteSpace: "nowrap",
    },
  },
}));

export const descriptionClass = style(({ devices }) => ({
  fontSize: 17,
  marginBottom: 15,
  maxWidth: 500,
  paddingLeft: 40,
  position: "relative",

  "@media": {
    [devices.mobile]: {
      fontSize: 18,
    },

    [devices.tablet]: {
      maxWidth: "none",
    },
  },
}));

export const iconClass = style({
  color: "lightgreen",
  display: "inline-block",
  height: 30,
  left: 0,
  maxWidth: 30,
  position: "absolute",
  top: -2,
});

export const subitemClass = style({
  alignItems: "center",
  columnGap: 6,
  display: "inline-grid",
  fontSize: 20,
  gridAutoFlow: "column",
  marginBottom: 10,
});

export const columnClass = style({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  rowGap: 20,
  textAlign: "center",
});
